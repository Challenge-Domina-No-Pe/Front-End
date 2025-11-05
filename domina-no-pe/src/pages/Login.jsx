import logo from "../assets/Passalogo.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { useState } from "react"

export default function Login() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/"
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!username || !password) {
      setError("Preencha usuário e senha")
      return
    }
    const isAdmin = username === "Admin" && password === "Admin12#"
    signin({ role: isAdmin ? "admin" : "user", token: "jwt" })
    navigate(from, { replace: true })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src={logo} alt="Passa a Bola" className="w-24 h-24 object-contain mb-6" />

      <div className="bg-purple-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">Bem-vindo de Volta!</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuário</label>
            <input
              type="text"
              placeholder="Digite email ou nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="text-right mt-1">
            <a href="/recuperar-senha" className="text-sm text-purple-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta ainda?{" "}
          <button
            onClick={() => navigate("/criar-conta")}
            className="text-purple-600 font-bold hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}
