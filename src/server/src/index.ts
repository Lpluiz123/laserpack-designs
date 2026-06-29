import { prisma } from "./lib/prisma.js";

import express from "express";
import { randomUUID } from "node:crypto";
import { criarLinkAfiliado } from "./services/GeradorDeLink.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const logsDeCliques: any[] = [];

//Rota que vai gerar o link
app.post("/gerar-link", (req, res) => {
  const { nome, urlBase, meuIdAfiliado } = req.body;

  const produto = {
    id: randomUUID(),
    nome,
    urlBase,
    meuIdAfiliado,
  };

  const link = criarLinkAfiliado(produto);

  res.json({
    mensagem: "Link gerado com sucesso!",
    link: link,
  });
});

// 1 - Registro de Click (TOPO) - Onde tudo começa
app.post("/api/registrar-click", async (req, res) => {
  const { produtoId, meuIdAfiliado, sessionId } = req.body;

  try {
    await prisma.evento.create({
      data: {
        sessionId,
        tipo: "CLICK",
        produtoId,
        afiliadoId: meuIdAfiliado,
      },
    });
    res.status(200).json({ status: "click registrado no banco" });
  } catch (error: any) {
    console.error("ERRO DETALHADO DO PRISMA:", error); // Isso vai aparecer no LOG do painel do Render
    res.status(500).json({
      error: "Erro ao registrar Click",
      mensagemReal: error.message, // Isso vai aparecer no seu terminal ao rodar o curl
    });
  }
});

//2 Registro de Visualização (MEIO) - O usuário chegou na página de vendas ?
// app.post("/api/registrar-visualizacao", async(req, res) => {
//   const {sessionId, paginaOrigem} = req.body;

//   try {
//     await prisma.evento.create({
//       data: {
//         sessionId,
//         tipo: "VISUALIZACAO",
//         status: paginaOrigem
//       }
//     });
//     res.status(200).json({ status: "Visualização registrada no banco"})
//   } catch (error) {
//     res.status(500).json({error: "Erro ao registrar visualização"});
//   }

// })

// 3 - Registro de Conversão (FUNDO) - O usuário comprou ?
app.post("/api/registrar-conversao", async (req, res) => {
  const { sessionId, valor, status, pedidoId } = req.body;

  try {
    await prisma.evento.create({
      data: {
        sessionId,
        tipo: "CONVERCAO",
        valor: parseFloat(valor),
        status,
      },
    });
    res.status(200).json({ status: "Conversão registrada no banco" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar conversão" });
  }
});

app.get("/teste", (req, res) => {
  return res.json({ mensagem: "O servidor está online e funcionando!" });
});

// --- SERVIDOR ---
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
