import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import logger from "../config/logger";

export const CreateHiringSession = async (req: Request, res: Response) => {
  const { ClubID } = req.query;
  if (!ClubID || isNaN(parseInt(ClubID as string))) {
    return res.status(400).json({ error: "Invalid or missing ClubID" });
  }
  const { title, description, startDate, endDate } = req.body;
  // Create date strings in ISO-8601 format
  const startDateISO = `${startDate}T00:00:00Z`;
  const endDateISO = `${endDate}T00:00:00Z`;

  try {
    const club = await prisma.club.findUnique({
      where: {
        ClubID: parseInt(ClubID as string),
      },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    // Create hiring session
    const hiringSession = await prisma.hiringSession.create({
      data: {
        Club: {
          connect: {
            ClubID: parseInt(ClubID as string),
          },
        },
        Title: title,
        Description: description,
        StartDate: startDateISO,
        EndDate: endDateISO,
      },
    });
    logger.info(`Hiring session created id: ${hiringSession.SessionID}`);
    res.status(201).json(hiringSession);
  } catch (error) {
    logger.error(`Error creating hiring session: ${error}`);
    res.status(500).json({ error: "Error creating hiring session" });
  }
};
