// src/routes/AppRoutes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../pages/layout/MainLayout";
import CopaPabLayout from "../pages/layout/CopaPabLayout";

// Páginas principais
import Home from "../pages/Home";
import Login from "../pages/Login";
import RecuperarSenha from "../pages/RecuperarSenha";
import CriarConta from "../pages/CriarConta";
import Noticias from "../pages/Noticias";
import Peneiras from "../pages/Peneiras";
import Escolinhas from "../pages/Escolinhas";
import SobreNos from "../pages/Sobrenos";        // atenção ao nome do arquivo
import Contato from "../pages/Contato";

// Copa PAB (nível 1)
import CopaPabHome from "../pages/CopaPAB/CopaPabHome";
import Jogos from "../pages/CopaPAB/jogos";      // arquivo é 'jogos.jsx' (minúsculo)
import Estatisticas from "../pages/CopaPAB/Estatisticas";
import Fotos from "../pages/CopaPAB/Fotos";

// Competição 1
import TabelaCompeticao1 from "../pages/CopaPAB/Competicao1/Tabela";
import TimesCompeticao1 from "../pages/CopaPAB/Competicao1/Times";
import EstatisticasCompeticao1 from "../pages/CopaPAB/Competicao1/Estatisticas";
import FotosCompeticao1 from "../pages/CopaPAB/Competicao1/Fotos";

// Competição 2
import TabelaCompeticao2 from "../pages/CopaPAB/Competicao2/Tabela";
import TimesCompeticao2 from "../pages/CopaPAB/Competicao2/Times";
import EstatisticasCompeticao2 from "../pages/CopaPAB/Competicao2/Estatisticas";
import FotosCompeticao2 from "../pages/CopaPAB/Competicao2/Fotos";

import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter([
  // Rotas públicas fora do layout principal
  { path: "/login", element: <Login /> },
  { path: "/criar-conta", element: <CriarConta /> },
  { path: "/recuperar-senha", element: <RecuperarSenha /> },

  // App com layout principal
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "noticias", element: <Noticias /> },
      { path: "peneiras", element: <Peneiras /> },
      { path: "escolinhas", element: <Escolinhas /> },
      { path: "sobre-nos", element: <SobreNos /> },
      { path: "contato", element: <Contato /> },

      // Copa PAB
      {
        path: "copa-pab",
        element: <CopaPabLayout />,
        children: [
          { index: true, element: <CopaPabHome /> },
          { path: "jogos", element: <Jogos /> },
          { path: "estatisticas", element: <Estatisticas /> },
          { path: "fotos", element: <Fotos /> },

          // Competição 1
          {
            path: "competicao1",
            children: [
              // Alias para links antigos: /copa-pab/competicao1/tabela/grupos
              { path: "tabela/grupos", element: <Navigate to="../tabela" replace /> },

              // Tabela sem fase na URL
              { path: "tabela", element: <TabelaCompeticao1 /> },

              { path: "times", element: <TimesCompeticao1 /> },
              { path: "estatisticas", element: <EstatisticasCompeticao1 /> },
              { path: "fotos", element: <FotosCompeticao1 /> },
            ],
          },

          // Competição 2
          {
            path: "competicao2",
            children: [
              // Alias semelhante para manter compatibilidade
              { path: "tabela/grupos", element: <Navigate to="../tabela" replace /> },

              // Tabela sem fase na URL
              { path: "tabela", element: <TabelaCompeticao2 /> },

              { path: "times", element: <TimesCompeticao2 /> },
              { path: "estatisticas", element: <EstatisticasCompeticao2 /> },
              { path: "fotos", element: <FotosCompeticao2 /> },
            ],
          },
        ],
      },
    ],
  },

  // Fallback final (qualquer rota fora das acima)
  { path: "*", element: <PageNotFound /> },
]);
