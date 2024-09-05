import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";
import cors from "cors";

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
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table';`;
    res.json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "An error occurred while fetching tables." });
  }
});

app.get("/addClubData", async (req, res) => {
  try {
    const newEvent = await prisma.event.create({
      data: {
        ClubID: 2,
        EventName: "Annual Science Fair",
        Description: "An event showcasing scientific projects",
        StartDateTime: "2024-09-01T10:00:00.000Z",
        EndDateTime: "2024-09-01T16:00:00.000Z",
        Location: "Main Hall",
      },
    });

    console.log("Inserted new event:", newEvent);

    const newTag = await prisma.tag.create({
      data: {
        TagName: "Science",
      },
    });

    console.log("Inserted new tag:", newTag);

    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "An error occurred while adding data." });
  }
});

//add club
app.post("/addClub", async (req, res) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } = req.body;

    if (!ClubName || !Email || !Password) {
      return res.status(400).json({ error: "ClubName, Email, and Password are required." });
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
    const passwordMatch = (password === club.Password);

    // Debugging logs
    console.log('Entered password:', password);
    console.log('Stored plain text password:', club.Password);
    console.log('Password match result:', passwordMatch);

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