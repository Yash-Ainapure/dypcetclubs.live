import express from "express";
import { login } from "../controllers/authController";
import { createQuiz, getQuizById } from "../controllers/quizController";
import { createEvent, updateEvent } from "../controllers/eventController";
import rateLimiter from "../middlewares/rateLimiter";
import { verifyClubPassword } from "../middlewares/auth";

const router = express.Router();

// Authentication Routes
router.post("/login", rateLimiter, verifyClubPassword, login);

// Quiz Routes
router.post("/api/quizzes", createQuiz);
router.post("/api/quizzes/:id", getQuizById);

// Event Routes
router.post("/api/create-event", createEvent);
router.put("/api/update-event", updateEvent);

export default router;
