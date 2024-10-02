import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";
import { MESSAGES } from "../config/const";

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions, secretCode } = req.body;
  const clubId = Number(req.query.ClubID);
  if (!secretCode || typeof secretCode !== "string") {
    return res.status(400).json({ error: MESSAGES.QUIZ.INVALID_SECRET_CODE });
  }
  try {
    const hashedSecretCode = await bcrypt.hash(secretCode, 10);
    const quiz = await prisma.quiz.create({
      data: {
        title,
        secretCode: hashedSecretCode,
        clubId: clubId,
      },
    });
    await Promise.all(
      questions.map((q: any) =>
        prisma.question.create({
          data: {
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            quizId: quiz.id,
          },
        }),
      ),
    );
    res.status(201).json({ quizId: quiz.id });
  } catch (error) {
    console.error(MESSAGES.QUIZ.ERROR_CREATING_QUIZ, error);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_CREATING_QUIZ });
  }
};

export const getClubQuizzes = async (req: Request, res: Response) => {
  const clubId = Number(req.query.ClubID);
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { clubId: clubId },
      select: { id: true, title: true, createdAt: true },
    });
    res.json(quizzes);
  } catch (error) {
    console.error(MESSAGES.QUIZ.ERROR_FETCHING_QUIZZES, error);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_FETCHING_QUIZZES });
  }
};

// Get quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { secretCode } = req.body;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: { questions: true },
    });
    if (!quiz) {
      return res.status(404).json({ error: MESSAGES.QUIZ.QUIZ_NOT_FOUND });
    }
    const isSecretCodeValid = await bcrypt.compare(secretCode, quiz.secretCode);
    if (!isSecretCodeValid) {
      return res.status(403).json({ error: MESSAGES.QUIZ.INVALID_SECRET_CODE });
    }
    res.json(quiz);
  } catch (error) {
    console.error(MESSAGES.QUIZ.ERROR_FETCHING_QUIZ, error);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_FETCHING_QUIZ });
  }
};

// Create a quiz user
export const createQuizUser = async (req: Request, res: Response) => {
  const { name, rollNo, year } = req.body;
  const parsedYear = parseInt(year);
  try {
    const user = await prisma.user.create({
      data: { name, rollNo, year: parsedYear },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(MESSAGES.USER.ERROR_CREATING_USER, error);
    res.status(500).json({ error: MESSAGES.USER.ERROR_CREATING_USER });
  }
};

// Submit quiz result
export const submitQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, answers, score } = req.body;
  try {
    const result = await prisma.result.create({
      data: {
        score,
        answers: JSON.stringify(answers),
        quiz: { connect: { id: parseInt(id) } },
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.error(MESSAGES.QUIZ.ERROR_SUBMITTING_QUIZ_RESULT, error);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_SUBMITTING_QUIZ_RESULT });
  }
};

// Get quiz results by quiz ID
export const getQuizResults = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clubId = Number(req.query.ClubID);
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: { club: true },
    });
    if (!quiz || quiz.clubId !== clubId) {
      return res.status(403).json({ error: MESSAGES.QUIZ.ACCESS_DENIED });
    }
    const results = await prisma.result.findMany({
      where: { quizId: parseInt(id) },
      include: { user: true },
    });
    res.json(results);
  } catch (error) {
    console.error(MESSAGES.QUIZ.ERROR_FETCHING_QUIZ_RESULTS, error);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_FETCHING_QUIZ_RESULTS });
  }
};
