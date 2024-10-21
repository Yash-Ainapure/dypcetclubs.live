"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client_1 = require("@prisma/client");
const adapter_libsql_1 = require("@prisma/adapter-libsql");
const client_2 = require("@libsql/client");
const libsql = (0, client_2.createClient)({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});
const adapter = new adapter_libsql_1.PrismaLibSQL(libsql);
const prisma = new client_1.PrismaClient({ adapter });
app.use(cors());
// Route to get all tables in the database
app.get("/tables", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query to get the table names from SQLite schema
        const tables = yield prisma.$queryRaw `SELECT name FROM sqlite_master WHERE type='table';`;
        res.json(tables);
    }
    catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).json({ error: "An error occurred while fetching tables." });
    }
}));
app.get("/addClubData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = yield prisma.event.create({
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
        const newTag = yield prisma.tag.create({
            data: {
                TagName: "Science",
            },
        });
        console.log("Inserted new tag:", newTag);
        res.json({ message: "Data added successfully" });
    }
    catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).json({ error: "An error occurred while fetching tables." });
    }
}));
// Route to get all data from UserTable
app.get("/getClubData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.club.findMany({
            include: {
                Members: true,
                Events: true,
                Announcements: true,
                ClubImages: true,
            },
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
}));
app.get("/getEventData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield prisma.event.findMany(); // Fetch all clubs from the database
        res.json(clubs);
    }
    catch (error) {
        console.error("Error fetching clubs:", error);
        res.status(500).json({ error: "Failed to fetch clubs" });
    }
}));
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
