"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const club_controller_1 = require("../controllers/club.controller");
const rateLimiter_1 = __importDefault(require("../middlewares/rateLimiter"));
const router = (0, express_1.Router)();
router.get("/getClubData", club_controller_1.getClubData);
router.post("/addClub", club_controller_1.addClub);
router.post("/addMember", club_controller_1.addClubMember);
router.post("/login", rateLimiter_1.default, club_controller_1.login);
router.get("/getClubMembers", club_controller_1.getClubMembers);
router.get("/:clubId", club_controller_1.getClubById);
router.post("/findByEmail", club_controller_1.getClubByEmail);
exports.default = router;
