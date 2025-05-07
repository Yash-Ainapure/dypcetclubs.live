import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { config } from "./env.config";

console.log("detailesss...")
console.log(config.TURSO_AUTH_TOKEN)
console.log(config.TURSO_DATABASE_URL)

// const libsql = createClient({
//   url: `${config.TURSO_DATABASE_URL}`,
//   authToken: `${config.TURSO_AUTH_TOKEN}`,
// });

const adapter = new PrismaLibSQL({
  url: `${config.TURSO_DATABASE_URL}`,
  authToken: `${config.TURSO_AUTH_TOKEN}`,
});
export const prisma = new PrismaClient({ adapter });

// Function to test the database connection
export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// Function to close the database connection 
export async function closeDatabaseConnection() {
  await prisma.$disconnect();
  console.log("Database connection closed");
}
