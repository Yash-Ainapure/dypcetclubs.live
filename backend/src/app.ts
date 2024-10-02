import express from "express";
import cors from "cors";
import { config } from "./config/env.config";
import { setupRoutes } from "./routes/index";
import {
  testDatabaseConnection,
  closeDatabaseConnection,
} from "./config/database.config";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true}));
setupRoutes(app);

const PORT = config.PORT || 4000;

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

// export default app;
// module.exports = app;
module.exports = (req:any, res:any) => {
  app(req, res);
};
