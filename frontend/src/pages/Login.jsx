import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para feedback visual

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erro anterior

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Salva o token!
        window.location.href = "/dashboard"; // Redireciona para o painel
      } else {
        // Erro genérico para segurança (401, 404)
        setError("Usuário ou senha inválidos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };

  return (
    // Container principal: centraliza na tela e usa a mesma cor de fundo da Home
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      
      {/* Card do formulário: branco, com sombra e borda arredondada */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Cabeçalho do Login */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-950 mb-2">Bem-vindo!</h1>
          <p className="text-slate-600">Faça login para acessar o seu painel.</p>
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

          {/* Botão de Entrar */}
          <button 
            type="submit"
            // Estilos do botão: cor escura, hover suave, transição
            className="w-full bg-slate-950 text-white font-semibold py-4 px-6 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 transition duration-150 active:scale-[0.98]"
          >
            Entrar no Painel
          </button>
        </form>

        {/* Rodapé do card (opcional) */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          Sistema de Gestão de Arquivos de Corte - &copy; {new Date().getFullYear()}
        </div>

      </div>
    </main>
  );
};

export default Login;