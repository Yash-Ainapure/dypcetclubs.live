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
