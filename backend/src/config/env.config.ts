import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  GROQ_API_KEY: process.env.GROQ_API_KEY
};
