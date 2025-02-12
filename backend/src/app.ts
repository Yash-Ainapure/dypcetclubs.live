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
import { google } from "googleapis";
import * as path from 'path';

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dypcetclubs-live.vercel.app",
  "*"
];

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: string) => void
  ) => void;
  credentials: boolean;
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
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
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: [
    "Content-Length",
    "X-Content-Type-Options",
    "X-RateLimit-Limit",
    "X-RateLimit-Remaining",
  ],
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

module.exports = (req: any, res: any) => {
  app(req, res);
};









// the Below code is used to generate refresh token
// please don't uncomment it

// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URL
// );

// const scopes = [
//   'https://www.googleapis.com/auth/forms.body',
//   'https://www.googleapis.com/auth/forms.responses.readonly'
// ];

// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: scopes,
// });

// console.log('Visit this URL:', authUrl);

// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('Enter the new code: ', async (code:any) => {
//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     console.log('Refresh Token:', tokens.refresh_token);
//     console.log('Access Token:', tokens);
//   } catch (error) {
//     console.error('Error getting token:', error);
//   } finally {
//     rl.close();
//   }
// });