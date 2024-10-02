import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";
import { MESSAGES } from "../config/const";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
  }
  try {
    const club = await prisma.club.findUnique({
      where: { Email: email },
    });
    if (!club) {
      console.log(`MESSAGES.CLUB.CLUB_DATA_NOT_FOUND for ${email}`);
      return res.status(404).json({ error: MESSAGES.CLUB.CLUB_DATA_NOT_FOUND });
    }
    const passwordMatch = await bcrypt.compare(password, club.Password);
    if (!passwordMatch) {
      console.log(`MESSAGES.CLUB.PASSWORD_MISMATCH for email: ${email}`);
      return res.status(401).json({ error: MESSAGES.CLUB.PASSWORD_MISMATCH });
    }
    console.log(`MESSAGES.CLUB.LOGIN_SUCCESSFUL for email: ${email}`);
    club.Password = "encrypted";
    res.status(200).json({ message: MESSAGES.CLUB.LOGIN_SUCCESSFUL, club });
  } catch (error) {
    console.error(MESSAGES.GENERIC.INTERNAL_SERVER_ERROR, error);
    res.status(500).json({ error: MESSAGES.CLUB.ERROR_DURING_LOGIN });
  }
};

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
