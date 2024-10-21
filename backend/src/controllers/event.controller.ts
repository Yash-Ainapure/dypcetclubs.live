import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import { MESSAGES } from "../config/const";
import logger from "../config/logger";
import bcrypt from 'bcrypt'
// Add other club-related controller functions here
export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const clubId = Number(req.query.ClubID);

  try {
    const event = await prisma.event.findUnique({
      where: { EventID: eventId },
    });

    if (!event) {
      logger.warn(`Event not found for EventID: ${eventId}`);
      return res.status(404).json({ error: MESSAGES.EVENT.EVENT_NOT_FOUND });
    }

    if (event.ClubID !== clubId) {
      logger.warn(`Unauthorized attempt to delete event: ${eventId} by ClubID: ${clubId}`);
      return res.status(403).json({ error: MESSAGES.EVENT.NOT_AUTHORIZED });
    }

    await prisma.event.delete({
      where: { EventID: eventId },
    });

    logger.info(`Event deleted: ${eventId}`);
    res.status(204).end();
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_DELETING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_DELETING_EVENT });
  }
};

export const getClubEventData = async (req: Request, res: Response) => {
  const clubId = Number(req.query.ClubID);
  try {
    const events = await prisma.event.findMany({
      where: { ClubID: clubId },
    });
    logger.info(`Fetched events for ClubID: ${clubId}`);
    res.json(events);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const {
    EventID,
    EventName,
    Description,
    StartDateTime,
    EndDateTime,
    Location,
  } = req.body;
  const clubId = Number(req.query.ClubID);
  try {
    const updatedEvent = await prisma.event.update({
      where: { EventID },
      data: {
        EventName,
        Description,
        StartDateTime,
        EndDateTime,
        Location,
      },
    });
    logger.info(`Event updated: ${EventID} by ClubID: ${clubId}`);
    res.json(updatedEvent);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_UPDATING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_UPDATING_EVENT });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { EventName, Description, StartDateTime, EndDateTime, Location } = req.body;
  const clubId = Number(req.query.ClubID);

  try {
    const newEvent = await prisma.event.create({
      data: {
        EventName,
        Description,
        StartDateTime,
        EndDateTime,
        Location,
        ClubID: clubId,
      },
    });
    logger.info(`New event created: ${newEvent.EventName} for ClubID: ${clubId}`);
    res.status(201).json(newEvent);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_CREATING_EVENT}: ${error}`);
    res.status(500).json({
      error: MESSAGES.EVENT.ERROR_CREATING_EVENT,
      details: error,
    });
  }
};

export const getAllEventData = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.event.findMany();
    logger.info("Fetched all event data.");
    res.json(clubs);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENTS}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions, secretCode } = req.body;
  const clubId = Number(req.query.ClubID);
  if (!secretCode || typeof secretCode !== "string") {
    logger.warn("Invalid secret code provided.");
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
    logger.info(`Quiz created: ${title} for ClubID: ${clubId}`);
    res.status(201).json({ quizId: quiz.id });
  } catch (error) {
    logger.error(`${MESSAGES.QUIZ.ERROR_CREATING_QUIZ}: ${error}`);
    res.status(500).json({ error: MESSAGES.QUIZ.ERROR_CREATING_QUIZ });
  }
};

export const getSingleEventData = async (req: Request, res: Response) => {
  const eventId = Number(req.query.EventID);
  try {
    const event = await prisma.event.findUnique({
      where: { EventID: eventId },
    });
    if (!event) {
      logger.warn(`Event not found for EventID: ${eventId}`);
      return res.status(404).json({ error: MESSAGES.EVENT.EVENT_NOT_FOUND });
    }
    logger.info(`Fetched event data for EventID: ${eventId}`);
    res.json(event);
  } catch (error) {
    logger.error(`${MESSAGES.EVENT.ERROR_FETCHING_EVENT}: ${error}`);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENT });
  }
}