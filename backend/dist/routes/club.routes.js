"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const club_controller_1 = require("../controllers/club.controller");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @ts-ignore
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = (0, express_1.Router)();
router.use((0, cookie_parser_1.default)());
const checkAuth = (req, res, next) => {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.auth_token) ||
        ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    console.log(token);
    if (!token) {
        return res
            .status(403)
            .json({ message: "Access denied, no token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "yash123");
        req.user = decoded;
        console.log("decoded", decoded);
        console.log("authenticated user success");
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
router.get("/getcron", club_controller_1.getCronJob);
router.get("/getClubData", club_controller_1.getClubData);
router.post("/addClub", club_controller_1.addClub);
router.post("/addMember", club_controller_1.addClubMember);
router.post("/login", club_controller_1.login);
router.get("/getClubMembers", club_controller_1.getClubMembers);
router.get("/:clubId", club_controller_1.getClubById);
router.post("/findByEmail", club_controller_1.getClubByEmail);
exports.default = router;
