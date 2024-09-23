import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
};
