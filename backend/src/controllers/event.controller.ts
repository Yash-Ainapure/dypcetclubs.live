import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const club = await prisma.club.findUnique({
      where: { Email: email },
    });
    if (!club) {
      console.log(`Club not found for email: ${email}`);
      return res.status(404).json({ error: "Club data not found." });
    }
    const passwordMatch = await bcrypt.compare(password, club.Password);
    if (!passwordMatch) {
      console.log(`Password mismatch for email: ${email}`);
      return res.status(401).json({ error: "Invalid email or password." });
    }
    console.log(`Login successful for email: ${email}`);
    club.Password = "encrypted";
    res.status(200).json({ message: "Login successful.", club: club });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
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
      return res.status(404).json({ error: "Event not found." });
    }

    if (event.ClubID !== clubId) {
      console.log("clubid1: " + event.ClubID);
      console.log("clubid2: " + clubId);
      return res.status(403).json({
        error: "You are not authorized to delete this event.",
      });
    }

    await prisma.event.delete({
      where: { EventID: eventId },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "An error occurred while deleting event." });
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
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "An error occurred while fetching events." });
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
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    console.error("Error creating event:", error);
    res.status(500).json({
      error: "An error occurred while creating the event",
      details: error,
    });
  }
};

export const getAllEventData = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.event.findMany(); // Fetch all clubs from the database
    res.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};
