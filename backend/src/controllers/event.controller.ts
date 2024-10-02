import { Request, Response } from "express";
import { prisma } from "../config/database.config";

// Add other club-related controller functions here
export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const clubId = Number(req.query.ClubID);

  try {
    const event = await prisma.event.findUnique({
      where: { EventID: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: MESSAGES.EVENT.EVENT_NOT_FOUND });
    }

    if (event.ClubID !== clubId) {
      return res.status(403).json({ error: MESSAGES.EVENT.NOT_AUTHORIZED });
    }

    await prisma.event.delete({
      where: { EventID: eventId },
    });

    res.status(204).end();
  } catch (error) {
    console.error(MESSAGES.EVENT.ERROR_DELETING_EVENT, error);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_DELETING_EVENT });
  }
};

export const getClubEventData = async (req: Request, res: Response) => {
  const clubId = Number(req.query.ClubID);
  try {
    const events = await prisma.event.findMany({
      where: { ClubID: clubId },
    });
    res.json(events);
  } catch (error) {
    console.error(MESSAGES.EVENT.ERROR_FETCHING_EVENTS, error);
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
    res.json(updatedEvent);
  } catch (error) {
    console.error(MESSAGES.EVENT.ERROR_UPDATING_EVENT, error);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_UPDATING_EVENT });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { EventName, Description, StartDateTime, EndDateTime, Location } =
    req.body;
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
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(MESSAGES.EVENT.ERROR_CREATING_EVENT, error);
    res.status(500).json({
      error: MESSAGES.EVENT.ERROR_CREATING_EVENT,
      details: error,
     });
  }
};

export const getAllEventData = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.event.findMany(); // Fetch all clubs from the database
    res.json(clubs);
  } catch (error) {
    console.error(MESSAGES.EVENT.ERROR_FETCHING_EVENTS, error);
    res.status(500).json({ error: MESSAGES.EVENT.ERROR_FETCHING_EVENTS });
  }
};
