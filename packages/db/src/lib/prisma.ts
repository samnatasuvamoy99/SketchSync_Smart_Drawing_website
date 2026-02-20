import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";



 export const connectionString = process.env.DATABASE_URL;

  
if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

console.log("Database connection initialized");

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({
  adapter
});
