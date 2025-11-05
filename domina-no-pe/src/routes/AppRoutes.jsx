// src/routes/AppRoutes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom"

import MainLayout from "../pages/layout/MainLayout"
import CopaPabLayout from "../pages/layout/CopaPabLayout"

import Home from "../pages/Home"
import Login from "../pages/Login"
import RecuperarSenha from "../pages/RecuperarSenha"
import CriarConta from "../pages/CriarConta"
import Noticias from "../pages/Noticias"
import Peneiras from "../pages/Peneiras"
import Escolinhas from "../pages/Escolinhas"
import SobreNos from "../pages/SobreNos"
import Contato from "../pages/Contato"

import CopaPabHome from "../pages/CopaPAB/CopaPabHome"

import TabelaCompeticao1 from "../pages/CopaPAB/Competicao1/Tabela";
import TimesCompeticao1 from "../pages/CopaPAB/Competicao1/Times";
import EstatisticasCompeticao1 from "../pages/CopaPAB/Competicao1/Estatisticas";
import FotosCompeticao1 from "../pages/CopaPAB/Competicao1/Fotos";

import ProtectedRoute from "../auth/ProtectedRoute"
import AdminRoute from "../auth/AdminRoute"

import AdminDashboard from "../pages/admin/Dashboard"
import AdminTabelaCompeticao1 from "../pages/admin/Competicao1/Tabela"
import AdminTimesCompeticao1 from "../pages/admin/Competicao1/Times"
import AdminEstatisticasCompeticao1 from "../pages/admin/Competicao1/Estatisticas"
import AdminFotosCompeticao1 from "../pages/admin/Competicao1/Fotos"

import PageNotFound from "../pages/PageNotFound"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/criar-conta", element: <CriarConta /> },
  { path: "/recuperar-senha", element: <RecuperarSenha /> },

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

      {
        path: "copa-pab",
        element: <CopaPabLayout />,
        children: [
          { index: true, element: <CopaPabHome /> },
          {
            path: "competicao1",
            children: [
              { path: "tabela/grupos", element: <Navigate to="../tabela" replace /> },
              { path: "tabela", element: <TabelaCompeticao1 /> },
              { path: "times", element: <TimesCompeticao1 /> },
              { path: "estatisticas", element: <EstatisticasCompeticao1 /> },
              { path: "fotos", element: <FotosCompeticao1 /> },
            ],
          },
        ],
      },

      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <AdminRoute><AdminDashboard /></AdminRoute> },
          {
            path: "competicao1",
            children: [
              { path: "tabela", element: <AdminRoute><AdminTabelaCompeticao1 /></AdminRoute> },
              { path: "times", element: <AdminRoute><AdminTimesCompeticao1 /></AdminRoute> },
              { path: "estatisticas", element: <AdminRoute><AdminEstatisticasCompeticao1 /></AdminRoute> },
              { path: "fotos", element: <AdminRoute><AdminFotosCompeticao1 /></AdminRoute> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <PageNotFound /> },
])
