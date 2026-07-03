import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashBoard() {
  const [metricas, setMetricas] = useState({
    clicks: 0,
    conversoes: 0,
    historico: [],
  });
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const resposta = await fetch("https://backend-laserpack-designs.onrender.com/api/dashboard?dias=7", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);

      const dados = await resposta.json();
      console.log("DEBUG - Dados recebidos:", dados); // Se não aparecer o gráfico, olhe este log no F12
      setMetricas(dados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const taxaConversao = metricas.clicks > 0 
    ? ((metricas.conversoes / metricas.clicks) * 100).toFixed(1) 
    : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-10 border border-gray-200">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Painel de Diagnóstico</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded text-center border border-blue-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Cliques</p>
          <p className="text-2xl font-bold text-blue-700">{metricas.clicks}</p>
        </div>
        <div className="p-3 bg-green-50 rounded text-center border border-green-100">
          <p className="text-xs text-gray-500 uppercase font-semibold">Conversão</p>
          <p className="text-2xl font-bold text-green-700">{taxaConversao}%</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Evolução Diária</h2>
        
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : metricas.historico && metricas.historico.length > 0 ? (
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={metricas.historico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="data" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="conversoes" 
                  stroke="#15803d" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded text-gray-400">
            Nenhum dado encontrado
          </div>
        )}
      </div>

      <button
        onClick={carregarDados}
        className="mt-6 w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition-colors font-medium"
      >
        Atualizar Agora
      </button>
    </div>
  );
}