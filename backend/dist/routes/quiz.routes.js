"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = (0, express_1.Router)();
router.post("/createQuiz", quiz_controller_1.createQuiz);
// Get quizzes for a club
router.get("/getClubQuizzes", quiz_controller_1.getClubQuizzes);
// Get quiz by ID (only if secret code is correct)
router.post("/getQuizById/:id", quiz_controller_1.getQuizById);
router.post("/createUser", quiz_controller_1.createQuizUser);
router.post("/:id/submit", quiz_controller_1.submitQuiz);
//get results for a quiz only for that club admin access
router.get("/:id/results", quiz_controller_1.getQuizResults);
exports.default = router;
