import express from "express";
import cors from "cors";
// @ts-ignore
import cookieParser from "cookie-parser";
import { config } from "./config/env.config";
import { setupRoutes } from "./routes/index";
import {
  testDatabaseConnection,
  closeDatabaseConnection,
} from "./config/database.config";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dypcetclubs-live.vercel.app",
];

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: string) => void
  ) => void;
  credentials: boolean;
}

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: string) => void
  ) => {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, origin); 
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
setupRoutes(app);

const PORT = 4000;

async function startServer() {
  try {
    await testDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("groq api key: ", config.GROQ_API_KEY);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully");
  await closeDatabaseConnection();
  process.exit(0);
});

// export default app;
// module.exports = app;
module.exports = (req: any, res: any) => {
  app(req, res);
};
