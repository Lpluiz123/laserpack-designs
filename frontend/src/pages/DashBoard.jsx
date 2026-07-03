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
      const resposta = await fetch(
        "https://backend-laserpack-designs.onrender.com/api/dashboard?dias=7",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

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

  const taxaConversao =
    metricas.clicks > 0
      ? ((metricas.conversoes / metricas.clicks) * 100).toFixed(1)
      : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-10 border border-gray-200">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Painel de Diagnóstico
      </h1>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {/* Card 1: Cliques */}
        <div className="p-2 bg-blue-50 rounded text-center border border-blue-100">
          <p className="text-[10px] text-gray-500 uppercase font-bold">
            Cliques
          </p>
          <p className="text-xl font-bold text-blue-700">{metricas.clicks}</p>
        </div>

        {/* Card 2: Conversões (número absoluto) */}
        <div className="p-2 bg-purple-50 rounded text-center border border-purple-100">
          <p className="text-[10px] text-gray-500 uppercase font-bold">Conv.</p>
          <p className="text-xl font-bold text-purple-700">
            {metricas.conversoes}
          </p>
        </div>

        {/* Card 3: Taxa de Conversão (%) */}
        <div className="p-2 bg-green-50 rounded text-center border border-green-100">
          <p className="text-[10px] text-gray-500 uppercase font-bold">Taxa</p>
          <p className="text-xl font-bold text-green-700">
            {metricas.clicks > 0
              ? ((metricas.conversoes / metricas.clicks) * 100).toFixed(0)
              : 0}
            %
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Evolução Diária
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : metricas.historico && metricas.historico.length > 0 ? (
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metricas.historico}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis dataKey="data" fontSize={10} tickMargin={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                {/* A propriedade 'connectNulls' ajuda a desenhar a linha mesmo se houver falhas */}
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  connectNulls={true}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="conversoes"
                  stroke="#9333ea"
                  strokeWidth={3}
                  connectNulls={true}
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
