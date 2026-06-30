import { prisma } from './lib/prisma.js';

import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

async function registrarClick(data:any) {
  return await prisma.evento.create({
    data: {
      sessionId: data.sessionId,
      tipo: data.tipo,
      produtoId: data.produtoId,
      afiliadoId: data.meuIdAfiliado,
      pedidoId: data.pedidoId

    },
  });
}

async function registrarConversao(data: any) {
  return await prisma.evento.create({
    data: {
      sessionId: data.sessionId,
      tipo: data.tipo,
      valor: parseFloat(data.valor),
      status: data.status,
      pedidoId: data.pedidoId,
    },
  });
}

/*------------------------------------------------------ */

app.post("/api/evento", async (req, res) => {
  // Apenas garantindo que o tipo está sendo extraído
  const { tipo } = req.body;

  try {
    if (tipo === "CLICK") {
      // Como a função registrarClick já acessa data.pedidoId 
      // (conforme vimos na outra imagem), passar o req.body inteiro é suficiente
      await registrarClick(req.body);
      return res.status(200).json({ status: "Clique registrado" });
    }

    if (tipo === "CONVERCAO") {
      await registrarConversao(req.body);
      return res.status(200).json({ status: "Conversão registrada" });
    }

    return res.status(400).json({ error: "Tipo de evento desconhecido" });
  } catch (error: any) {
    console.error("ERRO NO PROCESSAMENTO:", error);
    return res.status(500).json({ error: "Erro ao registrar evento" });
  }
});


 /*----------------------------------------------------- */

// --- SERVIDOR ---
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});


/*------------------------------------------*/

import { Client } from 'pg';

async function testarConexao() {

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
  
  try {
    await client.connect();
    console.log("CONEXÃO COM O BANCO BEM SUCEDIDA!");
    await client.end();
  } catch (err) {
    console.error("ERRO CRÍTICO NA CONEXÃO:", err);
  }
}
testarConexao();