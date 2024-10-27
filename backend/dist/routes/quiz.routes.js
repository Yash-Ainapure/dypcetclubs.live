"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @ts-ignore
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = (0, express_1.Router)();
router.use((0, cookie_parser_1.default)());
const checkAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
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
router.post("/createQuiz", checkAuth, quiz_controller_1.createQuiz);
// Get quizzes list for a club
router.get("/getClubQuizzes", quiz_controller_1.getClubQuizzes);
// Get quiz by ID (only if secret code is correct)
router.post("/getQuizById/:id", quiz_controller_1.getQuizById);
router.post("/createUser", quiz_controller_1.createQuizUser);
router.post("/:id/submit", quiz_controller_1.submitQuiz);
//get results for a quiz only for that club admin access
router.get("/:id/results", checkAuth, quiz_controller_1.getQuizResults);
router.delete("/:id", checkAuth, quiz_controller_1.deleteQuiz);
router.post("/generateQuiz", checkAuth, quiz_controller_1.generateQuiz);
exports.default = router;
