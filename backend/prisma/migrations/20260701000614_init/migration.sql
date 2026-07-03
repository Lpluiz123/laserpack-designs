-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "produtoId" TEXT,
    "afiliadoId" TEXT,
    "pedidoId" TEXT,
    "valor" DECIMAL(65,30),
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);
