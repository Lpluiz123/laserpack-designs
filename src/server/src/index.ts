import { prisma } from "./lib/prisma.js";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mantive sua função original
async function registrarClick(data: any) {
  try {
    return await prisma.evento.create({
      data: {
        sessionId: data.sessionId || "SEM_SESSAO",
        tipo: "CLICK", // Forçado para CLICK conforme sua estrutura
        pedidoId: data.pedidoId || null,
      },
    });
  } catch (e) {
    console.error("Erro no Prisma:", e);
    throw e;
  }
}

// Mantive sua função original
async function registrarConversao(data: any) {
  // Garantimos que o valor seja um número, senão usa 0
  const valorNumerico = typeof data.valor === 'number' ? data.valor : 0;
  
  return await prisma.evento.create({
    data: {
      tipo: "CONVERSAO",
      valor: valorNumerico,
      status: data.status || "COMPLETO",
      pedidoId: data.pedidoId || "SEM_ID",
      sessionId: data.sessionId || "SEM_SESSAO",
    },
  });
}

/*------------------------------------------------------ */
//ROTAS
app.post("/api/evento", async (req, res) => {
  console.log("DADOS CHEGANDO NO SERVIDOR:", req.body);

  try {
    // Se o seu botão de teste enviou algo, o servidor vai pegar aqui.
    // Se o frontend enviou 'tipo: "CLICK"', ele registra como clique.
    // Se você quiser forçar uma conversão no seu teste, 
    // basta alterar o seu fetch no frontend para enviar tipo: "CONVERSAO".
    
    const { sessionId, valor, tipo, pedidoId } = req.body;

    if (tipo === "CONVERSAO") {
      await registrarConversao({ sessionId, valor, pedidoId });
      return res.status(200).json({ status: "Conversão registrada" });
    } 
    
    // Se não for conversão, ele registra como clique, sem erro.
    await registrarClick({ sessionId, pedidoId });
    return res.status(200).json({ status: "Clique registrado" });

  } catch (error) {
    console.error("ERRO NO SERVIDOR:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const eventos = await prisma.evento.findMany({
      where: {
        createdAt: { gte: hoje },
        tipo: { in: ["CLICK", "CONVERSAO"] }
      }
    });

    res.json({
      clicks: eventos.filter(e => e.tipo === "CLICK").length,
      conversoes: eventos.filter(e => e.tipo === "CONVERSAO").length
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});