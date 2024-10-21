import { Express } from "express";
import clubRoutes from "./club.routes";
import eventRoutes from "./event.routes";
import quizRoutes from "./quiz.routes";

export const setupRoutes = (app: Express) => {
  app.use("/api/clubs", clubRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/quizzes", quizRoutes);
  // app.use("/api/tables", table);
};
// TODO: Review the entire project for potential security concerns and data leaks to unauthorized users.
// 1. Ensure all routes are protected with authentication and authorization middleware.
// 2. Check if sensitive data like passwords are being hashed before storing in the database.
