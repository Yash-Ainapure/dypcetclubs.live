import { Request, Response } from "express";
import { prisma } from "../config/database.config";
import bcrypt from "bcrypt";

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
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

export const addClub = async (req: Request, res: Response) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } =
      req.body;

    if (!ClubName || !Email || !Password) {
      return res
        .status(400)
        .json({ error: "ClubName, Email, and Password are required." });
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
    console.error("Error creating club:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
