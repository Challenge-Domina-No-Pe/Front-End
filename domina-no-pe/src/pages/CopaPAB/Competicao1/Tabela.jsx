// src/pages/CopaPAB/Competicao1/Tabela.jsx
import { useEffect, useMemo, useRef, useState, forwardRef } from "react";

/* ---------------- Tabs ---------------- */
function Tabs({ tab, setTab }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-semibold border transition-colors";
  const active = "bg-black text-white border-black";
  const off = "bg-white text-black border-black hover:bg-black/10";
  return (
    <div className="flex gap-2 mb-6">
      <button className={`${base} ${tab === "grupos" ? active : off}`} onClick={() => setTab("grupos")}>
        Grupos
      </button>
      <button className={`${base} ${tab === "chave" ? active : off}`} onClick={() => setTab("chave")}>
        Chaveamento
      </button>
    </div>
  );
}

/* ---------------- Card do Jogo (chaveamento) ---------------- */
const MatchCard = forwardRef(function MatchCard({ value, onChange, disabled }, ref) {
  const set = (k, v) => onChange({ ...value, [k]: v === "" ? "" : Number(v) });
  const done = value.golsA !== "" && value.golsB !== "";
  const winA = done && value.golsA > value.golsB;
  const winB = done && value.golsB > value.golsA;
  const inputCls =
    "w-14 rounded-md text-center " + (disabled ? "bg-white/70 text-black/60" : "text-black");
  return (
    <div ref={ref} className="w-64 bg-gradient-to-b from-violet-600 to-purple-700 text-white rounded-2xl shadow-md p-4">
      <div className="flex items-center justify-between gap-3">
        <span className={`truncate ${winA ? "font-bold" : ""}`}>{value.timeA}</span>
        <input
          type="number"
          value={value.golsA}
          readOnly={disabled}
          onChange={(e) => set("golsA", e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="flex items-center justify-between gap-3 mt-3">
        <span className={`truncate ${winB ? "font-bold" : ""}`}>{value.timeB}</span>
        <input
          type="number"
          value={value.golsB}
          readOnly={disabled}
          onChange={(e) => set("golsB", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>
  );
});

/* ---------------- Util: tabela a partir de partidas ---------------- */
function emptyTeamRow(name) {
  return { time: name, pts: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
}
function calcTable(teams, matches) {
  const rows = teams.map((n) => emptyTeamRow(n));
  for (const m of matches) {
    if (m.ga === "" || m.gb === "") continue;
    const ga = Number(m.ga), gb = Number(m.gb);
    const A = rows[m.a], B = rows[m.b];
    A.gp += ga; A.gc += gb; A.sg = A.gp - A.gc;
    B.gp += gb; B.gc += ga; B.sg = B.gp - B.gc;
    if (ga > gb) { A.v++; A.pts += 3; B.d++; }
    else if (gb > ga) { B.v++; B.pts += 3; A.d++; }
    else { A.e++; B.e++; A.pts++; B.pts++; }
  }
  return rows;
}
function rank(rows) {
  return [...rows].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.v   !== a.v)   return b.v   - a.v;       // vitórias
    if (b.sg  !== a.sg)  return b.sg  - a.sg;      // saldo
    return a.time.localeCompare(b.time);
  });
}

/* ---------------- Partidas round-robin para 4 times ---------------- */
function fixtures4() {
  // todos se enfrentam 1x: 6 jogos
  return [
    { id: 1, a: 0, b: 1, ga: "", gb: "" },
    { id: 2, a: 2, b: 3, ga: "", gb: "" },
    { id: 3, a: 0, b: 2, ga: "", gb: "" },
    { id: 4, a: 1, b: 3, ga: "", gb: "" },
    { id: 5, a: 0, b: 3, ga: "", gb: "" },
    { id: 6, a: 1, b: 2, ga: "", gb: "" },
  ];
}

/* =========================================================
   P Á G I N A
========================================================= */
export default function TabelaCompeticao1() {
  const [tab, setTab] = useState("grupos");

  /* ----- modo edição (sempre disponível) ----- */
  const [isEdit, setIsEdit] = useState(false);

  /* Times por grupo (editáveis) */
  const teamsInit = useMemo(
    () => ({
      A: ["Time 1", "Time 2", "Time 3", "Time 4"],
      B: ["Time 5", "Time 6", "Time 7", "Time 8"],
      C: ["Time 9", "Time 10", "Time 11", "Time 12"],
      D: ["Time 13", "Time 14", "Time 15", "Time 16"],
    }),
    []
  );

  /* Carrega/Persiste */
  const load = (k, def) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; }
  };
  const [teams, setTeams]     = useState(() => load("c1-teams", teamsInit));
  const [matches, setMatches] = useState(() =>
    load("c1-matches", { A: fixtures4(), B: fixtures4(), C: fixtures4(), D: fixtures4() })
  );

  const [draftTeams, setDraftTeams]     = useState(teams);
  const [draftMatches, setDraftMatches] = useState(matches);

  useEffect(() => { setDraftTeams(teams); setDraftMatches(matches); }, [teams, matches]);

  const saveAll = () => {
    setTeams(draftTeams);
    setMatches(draftMatches);
    localStorage.setItem("c1-teams",   JSON.stringify(draftTeams));
    localStorage.setItem("c1-matches", JSON.stringify(draftMatches));
    setIsEdit(false);
  };
  const cancelAll = () => {
    setDraftTeams(teams);
    setDraftMatches(matches);
    setIsEdit(false);
  };

  /* Tabelas calculadas (sempre calculando sobre *draft* quando editando) */
  const effTeams   = isEdit ? draftTeams   : teams;
  const effMatches = isEdit ? draftMatches : matches;

  const tables = useMemo(() => ({
    A: calcTable(effTeams.A, effMatches.A),
    B: calcTable(effTeams.B, effMatches.B),
    C: calcTable(effTeams.C, effMatches.C),
    D: calcTable(effTeams.D, effMatches.D),
  }), [effTeams, effMatches]);

  /* Classificação (top2) → quartas */
  const ranked = useMemo(() => ({
    A: rank(tables.A), B: rank(tables.B), C: rank(tables.C), D: rank(tables.D)
  }), [tables]);

  /* ------ Chaveamento ------ */
  const [quartasLeft, setQuartasLeft] = useState([
    { id: 1, timeA: "—", timeB: "—", golsA: "", golsB: "" },
    { id: 2, timeA: "—", timeB: "—", golsA: "", golsB: "" },
  ]);
  const [quartasRight, setQuartasRight] = useState([
    { id: 3, timeA: "—", timeB: "—", golsA: "", golsB: "" },
    { id: 4, timeA: "—", timeB: "—", golsA: "", golsB: "" },
  ]);
  const [semiLeft, setSemiLeft]   = useState([{ id: 5, timeA: "—", timeB: "—", golsA: "", golsB: "" }]);
  const [semiRight, setSemiRight] = useState([{ id: 6, timeA: "—", timeB: "—", golsA: "", golsB: "" }]);
  const [finale, setFinale]       = useState([{ id: 7, timeA: "—", timeB: "—", golsA: "", golsB: "" }]);

  // monta quartas sempre que ranking mudar
  useEffect(() => {
    const a1 = ranked.A[0]?.time ?? "—", a2 = ranked.A[1]?.time ?? "—";
    const b1 = ranked.B[0]?.time ?? "—", b2 = ranked.B[1]?.time ?? "—";
    const c1 = ranked.C[0]?.time ?? "—", c2 = ranked.C[1]?.time ?? "—";
    const d1 = ranked.D[0]?.time ?? "—", d2 = ranked.D[1]?.time ?? "—";
    setQuartasLeft((p)  => [{ ...p[0], timeA: a1, timeB: b2 }, { ...p[1], timeA: b1, timeB: a2 }]);
    setQuartasRight((p) => [{ ...p[0], timeA: c1, timeB: d2 }, { ...p[1], timeA: d1, timeB: c2 }]);
  }, [ranked]);

  // winners fluindo
  useEffect(() => {
    const wTop =  quartasLeft[0].golsA !== "" && quartasLeft[0].golsB !== "" ? (quartasLeft[0].golsA > quartasLeft[0].golsB ? quartasLeft[0].timeA : quartasLeft[0].timeB) : "—";
    const wBot =  quartasLeft[1].golsA !== "" && quartasLeft[1].golsB !== "" ? (quartasLeft[1].golsA > quartasLeft[1].golsB ? quartasLeft[1].timeA : quartasLeft[1].timeB) : "—";
    setSemiLeft((prev) => prev.map((s) => ({ ...s, timeA: wTop, timeB: wBot })));
  }, [quartasLeft]);
  useEffect(() => {
    const wTop =  quartasRight[0].golsA !== "" && quartasRight[0].golsB !== "" ? (quartasRight[0].golsA > quartasRight[0].golsB ? quartasRight[0].timeA : quartasRight[0].timeB) : "—";
    const wBot =  quartasRight[1].golsA !== "" && quartasRight[1].golsB !== "" ? (quartasRight[1].golsA > quartasRight[1].golsB ? quartasRight[1].timeA : quartasRight[1].timeB) : "—";
    setSemiRight((prev) => prev.map((s) => ({ ...s, timeA: wTop, timeB: wBot })));
  }, [quartasRight]);
  useEffect(() => {
    const wl = semiLeft[0].golsA  !== "" && semiLeft[0].golsB  !== "" ? (semiLeft[0].golsA  > semiLeft[0].golsB  ? semiLeft[0].timeA  : semiLeft[0].timeB ) : "—";
    const wr = semiRight[0].golsA !== "" && semiRight[0].golsB !== "" ? (semiRight[0].golsA > semiRight[0].golsB ? semiRight[0].timeA : semiRight[0].timeB) : "—";
    setFinale((prev) => prev.map((f) => ({ ...f, timeA: wl, timeB: wr })));
  }, [semiLeft, semiRight]);

  /* ------ refs/linhas (redesenho robusto) ------ */
  const containerRef = useRef(null);
  const qlRefs  = [useRef(null), useRef(null)];
  const slRef   = useRef(null);
  const finalRef= useRef(null);
  const srRef   = useRef(null);
  const qrRefs  = [useRef(null), useRef(null)];

  const getCenterRight = (ref) => {
    const c = containerRef.current;
    if (!c || !ref?.current) return null;
    const r  = ref.current.getBoundingClientRect();
    const rc = c.getBoundingClientRect();
    return { x: r.right - rc.left, y: r.top + r.height / 2 - rc.top };
  };
  const getCenterLeft = (ref) => {
    const c = containerRef.current;
    if (!c || !ref?.current) return null;
    const r  = ref.current.getBoundingClientRect();
    const rc = c.getBoundingClientRect();
    return { x: r.left - rc.left, y: r.top + r.height / 2 - rc.top };
  };
  const makePath = (p1, p2) => {
    if (!p1 || !p2) return "";
    const mid = (p1.x + p2.x) / 2;
    return `M ${p1.x},${p1.y} H ${mid} V ${p2.y} H ${p2.x}`;
  };

  // força redesenho
  const [tick, force] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => force((t) => t + 1));
    ro.observe(containerRef.current);
    const onScroll = () => force((t) => t + 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // desenho inicial ao abrir/entrar na aba
    const kick = () => requestAnimationFrame(() => force((t) => t + 1));
    kick();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // sempre que abrir a aba "chave" ou mudar algum card, redesenha
  useEffect(() => {
    if (tab !== "chave") return;
    // dois frames para garantir refs posicionadas
    requestAnimationFrame(() => force((t) => t + 1));
    setTimeout(() => force((t) => t + 1), 0);
  }, [tab, quartasLeft, quartasRight, semiLeft, semiRight, finale]);

  /* ------ helpers de edição ------ */
  const setTeamName = (g, idx, name) =>
    setDraftTeams((t) => ({ ...t, [g]: t[g].map((n, i) => (i === idx ? name : n)) }));
  const setMatchScore = (g, id, side, value) =>
    setDraftMatches((mm) => ({
      ...mm,
      [g]: mm[g].map((m) =>
        m.id === id ? { ...m, [side]: value === "" ? "" : Number(value) } : m
      ),
    }));

  /* ===================== UI ===================== */
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-black">Competição 1 • Tabela</h1>

        {/* Botões de edição SEMPRE visíveis */}
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Editar
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={saveAll}
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              Salvar
            </button>
            <button
              onClick={cancelAll}
              className="px-4 py-2 rounded-lg bg-gray-300 text-black"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <Tabs tab={tab} setTab={setTab} />

      {/* ======== GRUPOS ======== */}
      {tab === "grupos" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {(["A","B","C","D"]).map((g) => (
            <div key={g} className="bg-purple-700 rounded-xl p-4 shadow-lg text-white">
              <h2 className="text-xl font-semibold mb-3">Grupo {g}</h2>

              {/* Nomes dos times */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                {(isEdit ? draftTeams : teams)[g].map((n, i) => (
                  <input
                    key={i}
                    className={"rounded px-2 py-1 " + (isEdit ? "text-black" : "bg-white/70 text-black/70")}
                    readOnly={!isEdit}
                    value={n}
                    onChange={(e) => setTeamName(g, i, e.target.value)}
                  />
                ))}
              </div>

              {/* Tabela calculada */}
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-sm">
                  <thead className="text-left">
                    <tr>
                      <th className="py-2">Time</th>
                      <th className="py-2 text-center">Pts</th>
                      <th className="py-2 text-center">V</th>
                      <th className="py-2 text-center">E</th>
                      <th className="py-2 text-center">D</th>
                      <th className="py-2 text-center">GP</th>
                      <th className="py-2 text-center">GC</th>
                      <th className="py-2 text-center">SG</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr]:bg-purple-900/60 [&_tr]:rounded-lg">
                    {rank(tables[g]).map((row, i) => (
                      <tr key={row.time + i} className="rounded-lg">
                        <td className="p-2">{row.time}</td>
                        <td className="p-2 text-center">{row.pts}</td>
                        <td className="p-2 text-center">{row.v}</td>
                        <td className="p-2 text-center">{row.e}</td>
                        <td className="p-2 text-center">{row.d}</td>
                        <td className="p-2 text-center">{row.gp}</td>
                        <td className="p-2 text-center">{row.gc}</td>
                        <td className="p-2 text-center">{row.sg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Partidas (6 jogos) */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {(isEdit ? draftMatches : matches)[g].map((m) => (
                  <div key={m.id} className="bg-purple-800/70 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex-1 truncate">{(isEdit ? draftTeams : teams)[g][m.a]}</span>
                      <input
                        type="number"
                        className={"w-12 text-center rounded " + (isEdit ? "text-black" : "bg-white/70 text-black/60")}
                        readOnly={!isEdit}
                        value={m.ga}
                        onChange={(e) => setMatchScore(g, m.id, "ga", e.target.value)}
                      />
                      <span className="mx-1 text-white/80">x</span>
                      <input
                        type="number"
                        className={"w-12 text-center rounded " + (isEdit ? "text-black" : "bg-white/70 text-black/60")}
                        readOnly={!isEdit}
                        value={m.gb}
                        onChange={(e) => setMatchScore(g, m.id, "gb", e.target.value)}
                      />
                      <span className="flex-1 text-right truncate">{(isEdit ? draftTeams : teams)[g][m.b]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======== CHAVEAMENTO ======== */}
      {tab === "chave" && (
        <div className="min-h-[70vh] flex items-center mt-2">
          <div ref={containerRef} className="relative w-full overflow-x-auto px-6 md:px-12">
            <div className="mx-auto flex items-center justify-center gap-16 md:gap-24 min-w-[1000px]">
              {/* Quartas - ESQ */}
              <div className="flex flex-col gap-24 pl-2 md:pl-6">
                <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wide mb-1">Quartas</div>
                {quartasLeft.map((m, i) => (
                  <MatchCard
                    key={m.id}
                    ref={qlRefs[i]}
                    value={m}
                    onChange={(v) => setQuartasLeft((arr) => arr.map((x) => (x.id === m.id ? v : x)))}
                    disabled={!isEdit}
                  />
                ))}
              </div>

              {/* Semi ESQ */}
              <div className="flex flex-col gap-24">
                <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wide mb-1">Semi-Final</div>
                {semiLeft.map((m) => (
                  <MatchCard
                    key={m.id}
                    ref={slRef}
                    value={m}
                    onChange={(v) => setSemiLeft((arr) => arr.map((x) => (x.id === m.id ? v : x)))}
                    disabled={!isEdit}
                  />
                ))}
              </div>

              {/* Final */}
              <div className="flex flex-col gap-24">
                <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wide mb-1">Final</div>
                {finale.map((m) => (
                  <MatchCard
                    key={m.id}
                    ref={finalRef}
                    value={m}
                    onChange={(v) => setFinale((arr) => arr.map((x) => (x.id === m.id ? v : x)))}
                    disabled={!isEdit}
                  />
                ))}
              </div>

              {/* Semi DIR */}
              <div className="flex flex-col gap-24">
                <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wide mb-1">Semi-Final</div>
                {semiRight.map((m) => (
                  <MatchCard
                    key={m.id}
                    ref={srRef}
                    value={m}
                    onChange={(v) => setSemiRight((arr) => arr.map((x) => (x.id === m.id ? v : x)))}
                    disabled={!isEdit}
                  />
                ))}
              </div>

              {/* Quartas - DIR */}
              <div className="flex flex-col gap-24 pr-2 md:pr-6">
                <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wide mb-1 text-right">Quartas</div>
                {quartasRight.map((m, i) => (
                  <MatchCard
                    key={m.id}
                    ref={qrRefs[i]}
                    value={m}
                    onChange={(v) => setQuartasRight((arr) => arr.map((x) => (x.id === m.id ? v : x)))}
                    disabled={!isEdit}
                  />
                ))}
              </div>
            </div>

            {/* Linhas pretas conectando */}
            <svg
              key={tick} // força re-render do SVG quando tick muda
              className="pointer-events-none absolute inset-0"
              width={containerRef.current?.scrollWidth ?? 1200}
              height={containerRef.current?.scrollHeight ?? 500}
            >
              <path d={makePath(getCenterRight(qlRefs[0]), getCenterLeft(slRef))} stroke="#111827" strokeWidth="4" fill="none" />
              <path d={makePath(getCenterRight(qlRefs[1]), getCenterLeft(slRef))} stroke="#111827" strokeWidth="4" fill="none" />
              <path d={makePath(getCenterRight(slRef), getCenterLeft(finalRef))}  stroke="#111827" strokeWidth="4" fill="none" />
              <path d={makePath(getCenterRight(finalRef), getCenterLeft(srRef))} stroke="#111827" strokeWidth="4" fill="none" />
              <path d={makePath(getCenterRight(srRef), getCenterLeft(qrRefs[0]))} stroke="#111827" strokeWidth="4" fill="none" />
              <path d={makePath(getCenterRight(srRef), getCenterLeft(qrRefs[1]))} stroke="#111827" strokeWidth="4" fill="none" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
