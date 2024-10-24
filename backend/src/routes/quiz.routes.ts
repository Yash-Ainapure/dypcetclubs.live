import { Router } from "express";
import {
  createQuiz,
  getClubQuizzes,
  getQuizById,
  createQuizUser,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
  generateQuiz
} from "../controllers/quiz.controller";

const router = Router();

router.post("/createQuiz", createQuiz);

// Get quizzes list for a club
router.get("/getClubQuizzes", getClubQuizzes);

// Get quiz by ID (only if secret code is correct)
router.post("/getQuizById/:id", getQuizById);

router.post("/createUser", createQuizUser);

router.post("/:id/submit", submitQuiz);

//get results for a quiz only for that club admin access
router.get("/:id/results", getQuizResults);

router.delete("/:id", deleteQuiz);

router.post("/generateQuiz", generateQuiz)

export default router;
