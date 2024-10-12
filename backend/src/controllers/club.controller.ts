import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";
import { MESSAGES } from "../config/const";
import { uploadClubLogo, uploadImageToCloudinary, uploads } from "../services/cloudnary";
import logger from "../config/logger"
export const getClubData = async (req: Request, res: Response) => {
  try {
    const data = await prisma.club.findMany({
      include: {
        Members: true,
        Events: true,
        Announcements: true,
        ClubImages: true,
      },
    });
    logger.info("Fetched club data successfully.");
    res.json(data);
  } catch (error) {
    logger.error(`${MESSAGES.CLUB.ERROR_FETCHING_DATA}: ${error}`);
    res.status(500).json({ error: MESSAGES.CLUB.ERROR_FETCHING_DATA });
  }
};

export const addClub = async (req: Request, res: Response) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } = req.body;

    if (!ClubName || !Email || !Password) {
      logger.warn("Attempted to add a club with missing required fields.");
      return res.status(400).json({ error: MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newClub = await prisma.club.create({
      data: {
        ClubName,
        Description,
        FoundedDate,
        Email,
        Password: hashedPassword,
        LogoURL: 'https://img.icons8.com/ios-filled/50/test-account.png',
      },
    });

    logger.info(`New club added: ${ClubName}`);
    res.status(201).json(newClub);
  } catch (error) {
    logger.error(`${MESSAGES.CLUB.ERROR_CREATING_CLUB}: ${error}`);
    res.status(500).json({ error: MESSAGES.CLUB.ERROR_CREATING_CLUB });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    logger.warn("Login attempt with missing email or password.");
    return res.status(400).json({ error: MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
  }
  try {
    const club = await prisma.club.findUnique({
      where: { Email: email },
    });
    if (!club) {
      logger.warn(`Login attempt with non-existing email: ${email}`);
      return res.status(404).json({ error: MESSAGES.CLUB.CLUB_DATA_NOT_FOUND });
    }

    const passwordMatch = await bcrypt.compare(password, club.Password);
    if (!passwordMatch) {
      logger.warn(`Invalid login attempt for email: ${email}`);
      return res.status(401).json({ error: MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD });
    }

    logger.info(`Login successful for email: ${email}`);
    club.Password = "encrypted";
    res.status(200).json({ message: MESSAGES.CLUB.LOGIN_SUCCESSFUL, club });
  } catch (error) {
    logger.error(`${MESSAGES.CLUB.LOGIN_ERROR}: ${error}`);
    res.status(500).json({ error: MESSAGES.CLUB.LOGIN_ERROR });
  }
};

export const getClubMembers = async (req: Request, res: Response) => {
  try {
    const clubId = Number(req.query.ClubID);
    if (isNaN(clubId)) {
      logger.warn("Invalid ClubID provided in getClubMembers.");
      return res.status(400).json({ error: "ClubID is required." });
    }

    const clubMembers = await prisma.club
      .findUnique({
        where: { ClubID: clubId },
      })
      .Members();

    logger.info(`Fetched members for ClubID: ${clubId}`);
    res.json(clubMembers);
  } catch (error) {
    logger.error(`Error fetching club members: ${error}`);
    res.status(500).json({ error: "An error occurred while fetching club members." });
  }
};