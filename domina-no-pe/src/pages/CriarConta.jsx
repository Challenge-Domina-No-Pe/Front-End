import logo from "../assets/Dominalogo.png";
import { useNavigate } from "react-router-dom";

export default function CriarConta() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <img 
  src={logo} 
  alt="Domina no Pé" 
  className="w-20 h-20 object-contain mb-6" 
/>
      {/* Card do formulário */}
      <div className="bg-purple-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Criar Conta
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Digite seu email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Crie um Usuário
            </label>
            <input
              type="text"
              placeholder="Crie um usuário"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Digite o Número
            </label>
            <input
              type="tel"
              placeholder="Ex: 11 99999-9999"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            onClick={goHome}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Criar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem conta?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Entre
          </a>
        </p>
      </div>
    </div>
  );
}
