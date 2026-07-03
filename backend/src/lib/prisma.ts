import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

// Desabilita a verificação estrita de SSL para certificados auto-assinados
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não está definida!");
}

const pool = new Pool({
  connectionString: connectionString.split('?')[0]
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter } as any);