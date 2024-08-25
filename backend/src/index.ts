import express from "express";
import dotenv from "dotenv";

import mysql from "mysql2/promise";
import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

async function testConnection() {
  try {
    await prisma.$connect();

    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.PORT),
      ssl: {
        ca: fs.readFileSync(process.env.CA as string), // Read the certificate from the provided path
      },
    });

    console.log("Connected to MySQL database successfully!");

    // Test the connection by executing a simple query
    const [rows] = await connection.execute("SELECT * from demo");
    console.log("The solution is: ", rows);

    // Remember to close the connection when done
    await connection.end();
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}



// Route to get all tables in the database
app.get('/tables', async (req, res) => {
  try {
    // Query to get the table names from SQLite schema
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table';`;
    res.json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "An error occurred while fetching tables." });
  }
});


// Route to get all data from UserTable
app.get('/getData', async (req, res) => {
  try {
    const data = await prisma.userTable.findMany();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
