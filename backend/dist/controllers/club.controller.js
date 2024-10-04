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
        res.json(data);
    }
    catch (error) {
        console.error(const_1.MESSAGES.CLUB.ERROR_FETCHING_DATA, error);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.ERROR_FETCHING_DATA });
    }
});
exports.getClubData = getClubData;
const addClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ClubName, Description, FoundedDate, Email, Password, LogoURL } = req.body;
        if (!ClubName || !Email || !Password) {
            return res
                .status(400)
                .json({ error: const_1.MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
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
        res.status(201).json(newClub);
    }
    catch (error) {
        console.error(const_1.MESSAGES.CLUB.ERROR_CREATING_CLUB, error);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.ERROR_CREATING_CLUB });
    }
});
exports.addClub = addClub;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: const_1.MESSAGES.CLUB.CLUB_NAME_EMAIL_PASSWORD_REQUIRED });
    }
    try {
        const club = yield database_config_1.prisma.club.findUnique({
            where: { Email: email },
        });
        if (!club) {
            console.log(const_1.MESSAGES.CLUB.CLUB_DATA_NOT_FOUND);
            return res.status(404).json({ error: const_1.MESSAGES.CLUB.CLUB_DATA_NOT_FOUND });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, club.Password);
        if (!passwordMatch) {
            console.log(`MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD for ${email}`);
            return res.status(401).json({ error: const_1.MESSAGES.CLUB.INVALID_EMAIL_OR_PASSWORD });
        }
        console.log(`Login successful for email: ${email}`);
        club.Password = "encrypted";
        res.status(200).json({ message: const_1.MESSAGES.CLUB.LOGIN_SUCCESSFUL, club });
    }
    catch (error) {
        console.error(const_1.MESSAGES.CLUB.LOGIN_ERROR, error);
        res.status(500).json({ error: const_1.MESSAGES.CLUB.LOGIN_ERROR });
    }
});
exports.login = login;
const getClubMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubId = Number(req.query.ClubID);
        if (isNaN(clubId)) {
            return res.status(400).json({ error: "ClubID is required." });
        }
        const clubMembers = yield database_config_1.prisma.club
            .findUnique({
            where: { ClubID: clubId },
        })
            .Members();
        res.json(clubMembers);
    }
    catch (error) {
        console.error("Error fetching club members:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching club members." });
    }
});
exports.getClubMembers = getClubMembers;
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
