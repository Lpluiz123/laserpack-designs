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
  historico: [] // Adicione isso aqui!
});
  const [loading, setLoading] = useState(true);
  const [dias, setDias] = useState(7);

const carregarDados = async () => {
  setLoading(true);
  try {
    const resposta = await fetch(
      `https://backend-laserpack-designs.onrender.com/api/dashboard?dias=${dias}`,
    );
    if (!resposta.ok) throw new Error("Erro na rede");

    const dados = await resposta.json();
    
    // ADICIONE ESTE LOG ABAIXO:
    console.log("DEBUG - Dados recebidos:", dados);
    console.log("DEBUG - Historico recebido:", dados.historico);
    
    setMetricas(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  } finally {
    setLoading(false);
  }
};

  // Supondo que 'metricas' é o objeto que vem do seu backend
const taxaConversao = metricas.clicks > 0 
  ? ((metricas.conversoes / metricas.clicks) * 100).toFixed(1) 
  : 0;


  useEffect(() => {
    carregarDados();
  }, [dias]);

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


{!loading && (
  <div className="mt-8">
    <h2 className="text-lg font-bold mb-4 text-gray-800">Evolução Diária</h2>
    
    {metricas.historico && metricas.historico.length > 0 ? (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metricas.historico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="conversoes" stroke="#15803d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded text-gray-400">
        Nenhum dado no período
      </div>
    )}
  </div>
)}

      <button
        onClick={carregarDados}
        className="mt-6 w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition-colors"
      >
        Atualizar Agora
      </button>
    </div>
  );
}
