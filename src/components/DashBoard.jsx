import { useEffect, useState } from "react";

export default function DashBoard() {
  const [metricas, setMetricas] = useState({ clicks: 0, conversoes: 0 });
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const resposta = await fetch("https://backend-laserpack-designs.onrender.com/api/dashboard");
      const dados = await resposta.json();
      setMetricas(dados);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };
  
const simularConversaoTeste = async () => {
    try {
      const resposta = await fetch("https://backend-laserpack-designs.onrender.com/api/evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sessionId: "TESTE_FRONTEND_123", 
          tipo: "CONVERSAO",
          valor: 100.50, // ENVIE UM NÚMERO, NÃO UM TEXTO!
          pedidoId: "PEDIDO_TESTE_999"
        })
      });
      
      if (resposta.ok) {
        alert("Conversão simulada com sucesso!");
        carregarDados();
      } else {
        const erro = await resposta.json();
        console.error("Erro do servidor:", erro);
      }
    } catch (error) {
      console.error("Erro ao simular:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-10 border border-gray-200">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Painel de Diagnóstico</h1>
      
      {loading ? (
        <p className="text-gray-500">Carregando dados...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-center">
            <h3 className="text-sm font-semibold text-blue-800">Clicks</h3>
            <p className="text-2xl font-bold text-blue-900">{metricas.clicks}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md border border-green-100 text-center">
            <h3 className="text-sm font-semibold text-green-800">Conversões</h3>
            <p className="text-2xl font-bold text-green-900">{metricas.conversoes}</p>
          </div>
        </div>
      )}
      
      <button 
        onClick={carregarDados}
        className="mt-6 w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition-colors"
      >
        Atualizar Agora
      </button>
      <button 
  onClick={simularConversaoTeste}
  className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
>
  Simular Conversão (Teste)
</button>
    </div>
        )
    }
