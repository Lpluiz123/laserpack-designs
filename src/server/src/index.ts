import { prisma } from "./lib/prisma.js";

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function registrarClick(data: any) {
  try {
    return await prisma.evento.create({
      data: {
        sessionId: data.sessionId || "SEM_SESSAO",
        tipo: data.tipo || "CLICK",
        // Campos opcionais removidos ou com valores padrão para não travar o Prisma
        pedidoId: data.pedidoId || null,
      },
    });
  } catch (e) {
    console.error("Erro no Prisma:", e);
    throw e; // Isso vai aparecer nos logs do Render
  }
}

async function registrarConversao(data: any) {
  // Traduzimos os dados que vêm da Digistore para o que o seu banco espera
  return await prisma.evento.create({
    data: {
      tipo: "VENDA", // Pode ser fixo para conversões
      valor: parseFloat(data.amount_brutto) || 0, // Converte para número
      status: data.event || "COMPLETO",
      pedidoId: data.order_id || "SEM_ID",
      sessionId: data.custom || "SEM_SESSAO", // O 'custom' é onde o sessionId costuma ficar
    },
  });
}

/*------------------------------------------------------ */
//ROTAS

app.post("/api/evento", async (req, res) => {
  // 1. Log de segurança: Essencial para você ver no Render exatamente o que chegou
  console.log("Dados brutos recebidos na rota:", req.body);

  try {
    // Criamos um objeto vazio que vai guardar os dados convertidos
    // Definimos uma interface ou apenas anotamos o tipo
    let dadosPadronizados: {
      sessionId: string;
      tipo: string;
      valor: number;
      pedidoId: any;
      status: any;
    } = {
      sessionId: "",
      tipo: "",
      valor: 0,
      pedidoId: null,
      status: null,
    };

    // Cenário A: Os dados vieram da DIGISTORE (identificado pela presença de 'tracking_id')
    if (req.body.tracking_id) {
      dadosPadronizados = {
        sessionId: req.body.tracking_id, // O tracking_id da Digistore vira seu sessionId
        tipo: "CONVERCAO", // Nós definimos manualmente que é uma conversão
        valor: parseFloat(req.body.amount) || 0,
        pedidoId: req.body.order_id,
        status: req.body.status || "PAID",
      };
    }
    // Cenário B: Os dados vieram do seu FRONT-END (identificado pelo clique do botão)
    else {
      dadosPadronizados = {
        sessionId: req.body.sessionId || "ID_NAO_ENVIADO",
        // Garantimos que tanto 'CLICK' quanto 'click_checkout' caiam na mesma categoria
        tipo: "CLICK",
        valor: req.body.valor || 0,
        pedidoId: req.body.pedidoId || null,
        status: null,
      };
    }

    console.log("Dados traduzidos e padronizados:", dadosPadronizados);

    // 2. O Roteador de Funções: Agora o banco recebe tudo mastigado
    if (dadosPadronizados.tipo === "CLICK") {
      await registrarClick(dadosPadronizados);
      return res.status(200).json({ status: "Clique registrado" });
    }

    if (dadosPadronizados.tipo === "CONVERCAO") {
      await registrarConversao(dadosPadronizados);
      return res.status(200).json({ status: "Conversão registrada" });
    }

    return res
      .status(400)
      .json({ error: "Tipo de evento desconhecido após tradução" });
  } catch (error) {
    console.error("ERRO NO PROCESSAMENTO:", error);
    return res
      .status(500)
      .json({ error: "Erro ao registrar evento no banco de dados" });
  }
});



app.get("/api/dashboard", async(req, res) => {
  try {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const eventos = await prisma.evento.findMany({
      where: {
        createdAt: {
          gte: hoje,
        },
        tipo: {
          in: ["CLICK", "CONVERSAO"]
        }
      }
    })

    const listaClicks = eventos.filter((evento => evento.tipo === "CLICK"))
    const listaConversao = eventos.filter(evento => evento.tipo === "CONVERSAO")

    console.log(eventos)
    res.json({clicks: listaClicks.length, conversoes: listaConversao.length})
  } catch (error) {
    console.log("ERRO NA BUSCA", error)
    res.status(500).json({error: "Erro ao buscar"})
  }
})

/*----------------------------------------------------- */

// --- SERVIDOR ---
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});


/*------------------------------------------*/

import { Client } from "pg";

async function testarConexao() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
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
