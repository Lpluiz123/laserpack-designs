import { prisma } from "./lib/prisma.js";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_PASSWORD = "Teste123";

// 1. Sua função de validação (ajustada para retornar true/false)
const isPasswordValid = (password: string) => password === ADMIN_PASSWORD;

// 2. O Middleware (o porteiro)
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  // 1. Se não tem token, bloqueia imediatamente!
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // 2. Se tem token, verifica se é válido
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido ou expirado" });
    }
    
    // 3. Se chegou aqui, o token é bom! Pode seguir.
    next();
  });
};

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
        status: status || "OK",
      },
    });
    return res.status(200).json({ status: "Sucesso", id: evento.id });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return res.status(500).json({ error: "Falha interna" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  // 1. Transformar a senha em Hash(10 é o "custo" da criptografia)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 2. Salvar no banco
  try {
    const usuario = await prisma.usuario.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    res.json({ message: "Usuário cadastrado com sucesso!", id: usuario.id });
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Erro ao cadastrar usuário (talvez o username já exista.)",
      });
  }
});

const JWT_SECRET = process.env.JWT_SECRET || "minha-chave-super-secreta";

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // 1.Buscar o usuário no banco
  const usuario = await prisma.usuario.findUnique({
    where: { username: username },
  });

  if (!usuario) {
    return res.status(401).json({ error: "Usuário ou senha invválidos" });
  }

  // 2. Compara a senha enviada com o hash guardado
  const senhaValida = await bcrypt.compare(password, usuario.password);

  if (!senhaValida) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }

  // GERAÇÃO DO TOKEN (o "crachá")
  const token = jwt.sign({ userId: usuario.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  //3. Login bem-sucedido!
  res.json({ message: "Login realizado com sucesso!", token });
});

// Rota de Dashboard otimizada
app.get("/api/dashboard", checkAuth, async (req, res) => {
  const dias = parseInt(req.query.dias as string) || 7;

  // Data de corte: hoje menos o número de dias
  const dataCorte = new Date();
  dataCorte.setDate(dataCorte.getDate() - dias);


  try {
    const eventos = await prisma.evento.findMany({
      where: {
        createdAt: {
          gte: dataCorte // 'gte' significa "greater than or equal" (maior ou igual)
        }
      }
    });

    // Agrupa por data (formato DD/MM/AAAA)
    const historicoMap = eventos.reduce((acc: any, e: any) => {
      const data = new Date(e.createdAt).toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit' 
});
      if (!acc[data]) acc[data] = { data, clicks: 0, conversoes: 0 };
      
      if (e.tipo === "CLICK") acc[data].clicks++;
      if (e.tipo === "CONVERSAO") acc[data].conversoes++;
      return acc;
    }, {});

    res.json({
      clicks: eventos.filter((e) => e.tipo === "CLICK").length,
      conversoes: eventos.filter((e) => e.tipo === "CONVERSAO").length,
      historico: Object.values(historicoMap) // O gráfico usará isso!
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.listen(3000, () => console.log("Servidor ativo!"));
