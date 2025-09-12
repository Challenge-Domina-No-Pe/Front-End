import { useNavigate } from "react-router-dom";

const GoBack = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left-icon lucide-arrow-big-left"><path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/></svg>
);

export default function RecuperarSenha() {
  const navigate = useNavigate();

  const goBack = () => navigate("/login");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return; // já está coberto pelo required
    // Aqui você poderia chamar sua API pra enviar o link de reset
    alert(`Link de recuperação enviado para: ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-purple-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Cabeçalho com ícone de voltar */}
        <div className="flex items-center mb-6">
          <button onClick={goBack} className="mr-3 p-1 hover:bg-purple-300 rounded-full">
            {/* Ícone de voltar */}
            <p className="w-6 h-6 text-purple-700"> <GoBack /> </p>
          </button>
          <h1 className="text-2xl font-bold text-purple-700">Recuperar Senha</h1>
        </div>

        <p className="text-gray-700 mb-4">
          Digite seu email para receber o link de recuperação de senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
