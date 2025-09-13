import { NavLink } from "react-router-dom";

export default function CopaPabHome() {
  return (
    <div className="p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Copa PAB</h1>
        <p className="text-white/80 mb-8">Selecione a competição e a seção desejada.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-purple-700 rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Competição 1</h2>
            <div className="grid grid-cols-2 gap-3">
              <NavLink
                to="/copa-pab/competicao1/tabela"
                className="bg-white text-purple-700 font-semibold rounded-xl px-4 py-3 text-center hover:bg-purple-100"
              >
                Tabela
              </NavLink>
              <NavLink
                to="/copa-pab/competicao1/times"
                className="bg-white text-purple-700 font-semibold rounded-xl px-4 py-3 text-center hover:bg-purple-100"
              >
                Times
              </NavLink>
              <NavLink
                to="/copa-pab/competicao1/estatisticas"
                className="bg-white text-purple-700 font-semibold rounded-xl px-4 py-3 text-center hover:bg-purple-100"
              >
                Estatísticas
              </NavLink>
              <NavLink
                to="/copa-pab/competicao1/fotos"
                className="bg-white text-purple-700 font-semibold rounded-xl px-4 py-3 text-center hover:bg-purple-100"
              >
                Fotos
              </NavLink>
            </div>
          </div>

          <div className="bg-purple-700/60 rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Competição 2</h2>
            <p className="text-white/70">Em breve</p>
          </div>

          <div className="bg-purple-700/60 rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Competição 3</h2>
            <p className="text-white/70">Em breve</p>
          </div>
        </div>
      </div>
    </div>
  );
}
