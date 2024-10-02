import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";
import { MESSAGES } from "../config/const";

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
    res.json(data);
  } catch (error) {
    console.error(MESSAGES.CLUB.ERROR_FETCHING_DATA, error);
    res.status(500).json({ error: MESSAGES.CLUB.ERROR_FETCHING_DATA });
  }
};

export const addClub = async (req: Request, res: Response) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } =
      req.body;

    if (!ClubName || !Email || !Password) {
      return res
      .status(400)
      .json({ error: MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newClub = await prisma.club.create({
      data: {
        ClubName,
        Description,
        FoundedDate,
        Email,
        Password: hashedPassword,
        LogoURL,
      },
    });

    res.status(201).json(newClub);
  } catch (error) {
    console.error(MESSAGES.CLUB.ERROR_CREATING_CLUB, error);
    res.status(500).json({ error: MESSAGES.CLUB.ERROR_CREATING_CLUB });
  }
};

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
      console.log(MESSAGES.CLUB.CLUB_DATA_NOT_FOUND);
      return res.status(404).json({ error: MESSAGES.CLUB.CLUB_DATA_NOT_FOUND });
    }
    const passwordMatch = await bcrypt.compare(password, club.Password);
    if (!passwordMatch) {
      console.log(`MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD for ${email}`)
      return res.status(401).json({ error: MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD });
      
    }
    console.log(`Login successful for email: ${email}`);
    club.Password = "encrypted";
    res.status(200).json({ message: MESSAGES.CLUB.LOGIN_SUCCESSFUL, club });
  } catch (error) {
    console.error(MESSAGES.CLUB.LOGIN_ERROR, error);
    res.status(500).json({ error: MESSAGES.CLUB.LOGIN_ERROR});
  }
};

export const getClubMembers = async (req: Request, res: Response) => {
  try {
    const clubId = Number(req.query.ClubID);
    if (isNaN(clubId)) {
      return res.status(400).json({ error: "ClubID is required." });
    }
    const clubMembers = await prisma.club
      .findUnique({
        where: { ClubID: clubId },
      })
      .Members();
    res.json(clubMembers);
  } catch (error) {
    console.error("Error fetching club members:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching club members." });
  }
};

// export const addClubMember = async (req: Request, res: Response) => {
//   try {
//     const { ClubID, MemberID } = req.body;
//     if (!ClubID || !MemberID) {
//       return res
//         .status(400)
//         .json({ error: "ClubID and MemberID are required." });
//     }
//     const newClubMember = await prisma.clubMember.create({
//       data: {
//         MemberID,
//         ClubID,
//       },
//     });
//     res.status(201).json;
//   } catch (error) {
//     console.error("Error adding club member:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while adding club member." });
//   }
// };

// Add other club-related controller functions here
