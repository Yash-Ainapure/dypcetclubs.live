import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

// Route to get all tables in the database
app.get("/tables", async (req, res) => {
  try {
    const tables =
      await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table';`;
    res.json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "An error occurred while fetching tables." });
  }
});

//Route to get all club data
app.get("/getClubData", async (req, res) => {
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
});

//Route to get all event data
app.get("/getEventData", async (req, res) => {
  try {
    const clubs = await prisma.event.findMany(); // Fetch all clubs from the database
    res.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
});

//add club
app.post("/addClub", async (req, res) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } =
      req.body;

    if (!ClubName || !Email || !Password) {
      return res
        .status(400)
        .json({ error: "ClubName, Email, and Password are required." });
    }

    // Store password in plain text for testing purposes
    const newClub = await prisma.club.create({
      data: {
        ClubName,
        Description,
        FoundedDate,
        Email,
        Password, // Store the plain text password
        LogoURL,
      },
    });

    res.status(201).json(newClub);
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const rateLimmiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts, please try again later.",
});

// Login endpoint comparing plain text passwords
app.post("/login", async (req, res) => {
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

    // Compare the entered password with the stored plain text password
    const passwordMatch = password === club.Password;

    // Debugging logs
    console.log("Entered password:", password);
    console.log("Stored plain text password:", club.Password);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      console.log(`Password mismatch for email: ${email}`);
      return res.status(401).json({ error: "Invalid email or password." });
    }

    console.log(`Login successful for email: ${email}`);
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
