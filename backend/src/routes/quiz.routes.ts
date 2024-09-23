import { Router } from "express";
import {
  createQuiz,
  getClubQuizzes,
  getQuizById,
  createQuizUser,
  submitQuiz,
  getQuizResults,
} from "../controllers/quiz.controller";

const router = Router();

router.post("/createQuiz", createQuiz);

// Get quizzes for a club
router.get("/getClubQuizzes", getClubQuizzes);

// Get quiz by ID (only if secret code is correct)
router.post("/getQuizById/:id", getQuizById);

router.post("/createUser", createQuizUser);

router.post("/:id/submit", submitQuiz);

//get results for a quiz only for that club admin access
router.get("/:id/results", getQuizResults);

export default router;
