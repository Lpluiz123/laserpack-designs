import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Para feedback visual

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Limpa erro anterior

    const API_URL = "https://backend-laserpack-designs.onrender.com";

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);

        // DISPARA SUCESSO
        toast.success("Login realizado com sucesso!");

        // Pequeno delay para o usuário ver o toast antes de redirecionar
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 6000);

      } else {
        // DISPARA ERRO DE CREDENCIAIS
        toast.error("Usuário ou senha inválidos.");
        setError("Usuário ou senha inválidos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      // DISPARA ERRO DE SISTEMA
      toast.error("Ocorreu um erro no servidor. Tente novamente.");
      setError("Ocorreu um erro. Tente novamente mais tarde.");
    }
    finally {
    setIsLoading(false); // Libera o botão
  }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      // Container principal: centraliza na tela e usa a mesma cor de fundo da
      Home
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        {/* Card do formulário: branco, com sombra e borda arredondada */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          {/* Cabeçalho do Login */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-slate-950 mb-2">
              Bem-vindo!
            </h1>
            <p className="text-slate-600">
              Faça login para acessar o seu painel.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo Usuário */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Nome de Usuário
              </label>
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: admin"
                required
                // Estilos do input: foco bonito, borda suave
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition duration-150"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition duration-150"
              />
            </div>

            {/* Mensagem de Erro (aparece se o login falhar) */}
            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading} // DESABILITA o botão durante o loading
              className={`w-full text-white font-semibold py-4 px-6 rounded-xl transition duration-150 
                ${isLoading 
                  ? "bg-slate-600 cursor-not-allowed" 
                  : "bg-slate-950 hover:bg-slate-800 active:scale-[0.98]"
                }`}
            >
              {isLoading ? "Entrando..." : "Entrar no Painel"}
            </button>
          </form>

          {/* Rodapé do card (opcional) */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            Sistema de Gerenciamento - Dashboard - &copy;{" "}
            {new Date().getFullYear()}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
