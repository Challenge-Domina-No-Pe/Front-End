import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
        <p className="text-gray-700 mb-4">
          Desculpe, a página que você está procurando não existe.
        </p>
        <button
            type="button"
            onClick={goHome}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Voltar a home
          </button>
      </div>
    </div>
  );
}