import { NextFunction, Router, Request, Response } from "express";

import {
  createQuiz,
  getClubQuizzes,
  getQuizById,
  createQuizUser,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
  generateQuiz,
} from "../controllers/quiz.controller";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

interface AuthenticatedRequest extends Request {
  cookies: { [key: string]: string };
  user?: any;
}

const checkAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, "yash123");
    req.user = decoded;
    console.log("decoded", decoded);
    console.log("authenticated user success");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/createQuiz", checkAuth, createQuiz);
// Get quizzes list for a club
router.get("/getClubQuizzes", getClubQuizzes);
// Get quiz by ID (only if secret code is correct)
router.post("/getQuizById/:id", getQuizById);
router.post("/createUser", createQuizUser);
router.post("/:id/submit", submitQuiz);
//get results for a quiz only for that club admin access
router.get("/:id/results", checkAuth, getQuizResults);
router.delete("/:id", checkAuth, deleteQuiz);
router.post("/generateQuiz", checkAuth, generateQuiz);

export default router;
