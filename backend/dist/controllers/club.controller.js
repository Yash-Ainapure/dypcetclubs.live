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
exports.getClubMembers = exports.login = exports.addClub = exports.getClubData = void 0;
const database_config_1 = require("../config/database.config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const const_1 = require("../config/const");
const logger_1 = __importDefault(require("../config/logger"));
const getClubData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_config_1.prisma.club.findMany({
            include: {
                Members: true,
                Events: true,
                Announcements: true,
                ClubImages: true,
            },
        });
        logger_1.default.info("Fetched club data successfully.");
        res.json(data);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.CLUB.ERROR_FETCHING_DATA}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.ERROR_FETCHING_DATA });
    }
});
exports.getClubData = getClubData;
const addClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ClubName, Description, FoundedDate, Email, Password, LogoURL } = req.body;
        if (!ClubName || !Email || !Password) {
            logger_1.default.warn("Attempted to add a club with missing required fields.");
            return res.status(400).json({ error: const_1.MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
        }
        const hashedPassword = yield bcrypt_1.default.hash(Password, 10);
        const newClub = yield database_config_1.prisma.club.create({
            data: {
                ClubName,
                Description,
                FoundedDate,
                Email,
                Password: hashedPassword,
                LogoURL: 'https://img.icons8.com/ios-filled/50/test-account.png',
            },
        });
        logger_1.default.info(`New club added: ${ClubName}`);
        res.status(201).json(newClub);
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.CLUB.ERROR_CREATING_CLUB}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.ERROR_CREATING_CLUB });
    }
});
exports.addClub = addClub;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        logger_1.default.warn("Login attempt with missing email or password.");
        return res.status(400).json({ error: const_1.MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
    }
    try {
        const club = yield database_config_1.prisma.club.findUnique({
            where: { Email: email },
        });
        if (!club) {
            logger_1.default.warn(`Login attempt with non-existing email: ${email}`);
            return res.status(404).json({ error: const_1.MESSAGES.CLUB.CLUB_DATA_NOT_FOUND });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, club.Password);
        if (!passwordMatch) {
            logger_1.default.warn(`Invalid login attempt for email: ${email}`);
            return res.status(401).json({ error: const_1.MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD });
        }
        logger_1.default.info(`Login successful for email: ${email}`);
        club.Password = "encrypted";
        res.status(200).json({ message: const_1.MESSAGES.CLUB.LOGIN_SUCCESSFUL, club });
    }
    catch (error) {
        logger_1.default.error(`${const_1.MESSAGES.CLUB.LOGIN_ERROR}: ${error}`);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.LOGIN_ERROR });
    }
});
exports.login = login;
const getClubMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubId = Number(req.query.ClubID);
        if (isNaN(clubId)) {
            logger_1.default.warn("Invalid ClubID provided in getClubMembers.");
            return res.status(400).json({ error: "ClubID is required." });
        }
        const clubMembers = yield database_config_1.prisma.club
            .findUnique({
            where: { ClubID: clubId },
        })
            .Members();
        logger_1.default.info(`Fetched members for ClubID: ${clubId}`);
        res.json(clubMembers);
    }
    catch (error) {
        logger_1.default.error(`Error fetching club members: ${error}`);
        res.status(500).json({ error: "An error occurred while fetching club members." });
    }
});
exports.getClubMembers = getClubMembers;