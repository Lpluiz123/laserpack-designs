import { prisma } from "./lib/prisma.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Rota única para eventos
app.post("/api/evento", async (req, res) => {
  const { sessionId, tipo, valor, pedidoId, status } = req.body;

  try {
    const evento = await prisma.evento.create({
      data: {
        sessionId: sessionId || "SEM_SESSAO",
        tipo: tipo || "CLICK", // Garante um valor padrão caso falhe
        valor: parseFloat(valor) || 0,
        pedidoId: pedidoId || null,
        status: status || "OK"
      },
    });
    return res.status(200).json({ status: "Sucesso", id: evento.id });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return res.status(500).json({ error: "Falha interna" });
  }
});

// Rota de Dashboard otimizada
app.get("/api/dashboard", async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany();
    res.json({
      clicks: eventos.filter(e => e.tipo === "CLICK").length,
      conversoes: eventos.filter(e => e.tipo === "CONVERSAO").length
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar" });
  }
});

app.listen(3000, () => console.log("Servidor ativo!"));