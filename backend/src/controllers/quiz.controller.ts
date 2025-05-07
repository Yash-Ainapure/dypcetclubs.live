import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";
import { MESSAGES } from "../config/const";
import logger from "../config/logger"; // Import Winston logger
import { config } from "../config/env.config";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions, secretCode } = req.body;
  const clubId = Number(req.query.ClubID);

  if (!secretCode || typeof secretCode !== "string") {
    logger.warn("Invalid or missing secret code during quiz creation.");
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
        })
      )
    );

    logger.info(`Quiz created successfully: ${title} for ClubID: ${clubId}`);
    res.status(201).json({ quizId: quiz.id });
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_CREATING_QUIZ}: ${error}`);
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

    logger.info(`Fetched quizzes for ClubID: ${clubId}`);
    res.json(quizzes);
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_FETCHING_QUIZZES}: ${error}`);
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
      logger.warn(`Quiz not found for ID: ${id}`);
      return res.status(404).json({ error: MESSAGES.QUIZ.QUIZ_NOT_FOUND });
    }

    const isSecretCodeValid = await bcrypt.compare(secretCode, quiz.secretCode);

    if (!isSecretCodeValid) {
      logger.warn(`Invalid secret code for quiz ID: ${id}`);
      return res.status(403).json({ error: MESSAGES.QUIZ.INVALID_SECRET_CODE });
    }

    logger.info(`Fetched quiz by ID: ${id}`);
    res.json(quiz);
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_FETCHING_QUIZ}: ${error}`);
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

    logger.info(`Created quiz user: ${name}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`${MESSAGES.USER.ERROR_CREATING_USER}: ${error}`);
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

    logger.info(
      `Quiz result submitted for quiz ID: ${id} by user ID: ${userId}`
    );
    res.status(201).json(result);
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_SUBMITTING_QUIZ_RESULT}: ${error}`);
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
      logger.warn(
        `Unauthorized access to quiz results for quiz ID: ${id} by ClubID: ${clubId}`
      );
      return res.status(403).json({ error: MESSAGES.QUIZ.ACCESS_DENIED });
    }

    const results = await prisma.result.findMany({
      where: { quizId: parseInt(id) },
      include: { user: true },
    });

    logger.info(`Fetched quiz results for quiz ID: ${id}`);
    res.json(results);
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_FETCHING_QUIZ_RESULTS}: ${error}`);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_FETCHING_QUIZ_RESULTS });
  }
};

// Delete quiz by ID
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.result.deleteMany({ where: { quizId: parseInt(id) } });
    await prisma.question.deleteMany({ where: { quizId: parseInt(id) } });
    await prisma.quiz.delete({ where: { id: parseInt(id) } });

    //also delete the users who have taken the quiz
    //not done yet

    logger.info(`Quiz deleted successfully for ID: ${id}`);
    res.json({ message: MESSAGES.QUIZ.QUIZ_DELETED });
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_DELETING_QUIZ}: ${error}`);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_DELETING_QUIZ });
  }
};

// generate quiz
export const generateQuiz = async (req: Request, res: Response) => {
  // const GROQ_API_KEY = "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";
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  const API_url = "https://api.groq.com/openai/v1/chat/completions";

  const { topic, level, numberOfQuestions } = req.body;
  try {
    const response = await fetch(API_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },

      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: `give me ${numberOfQuestions} MCQ questions about topic: ${topic} ,level:${level} in json format.
it should include question,options(array of string),answer.
Do not return any extra text,only the json object 
example of json is below:
{
  questions: [
    {
      question: "What is GitHub?",
      options: [
        "A version control system",
        "A social networking platform for developers",
        "A code hosting platform",
        "All of the above",
      ],
      answer: "All of the above",
    },
  ],
};
`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    res.status(200).json({ data: data });

    const messageContent = data?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Error :", error);
  }
};
