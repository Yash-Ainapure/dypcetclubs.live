import express from "express";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

app.use(cors());

// Route to get all tables in the database
app.get("/tables", async (req, res) => {
  try {
    // Query to get the table names from SQLite schema
    const tables =
      await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table';`;
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

    // Insert data into the Tags table
    const newTag = await prisma.tag.create({
      data: {
        TagName: "Science",
      },
    });

    console.log("Inserted new tag:", newTag);

    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "An error occurred while fetching tables." });
  }
});

// Route to get all data from UserTable
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

app.get("/getEventData", async (req, res) => {
  try {
    const clubs = await prisma.event.findMany(); // Fetch all clubs from the database
    res.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
});

app.post("/addClub", async (req, res) => {
  try {
    const { ClubName, Description, FoundedDate, Email, Password, LogoURL } =
      req.body;

    // Validate required fields
    if (!ClubName || !Email || !Password) {
      return res
        .status(400)
        .json({ error: "ClubName, Email, and Password are required." });
    }

    // Use Prisma to create a new club
    const newClub = await prisma.club.create({
      data: {
        ClubName,
        Description,
        FoundedDate,
        Email,
        Password, // Ensure to hash the password before saving in a production environment
        LogoURL,
      },
    });

    res.status(201).json(newClub);
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
