"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @ts-ignore
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const event_controller_1 = require("../controllers/event.controller");
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
router.delete("/deleteEvent", event_controller_1.deleteEvent);
//get all events
router.get("/getAllEventData", event_controller_1.getAllEventData);
router.get("/getSingleEventData", event_controller_1.getSingleEventData);
//get all events for a club
router.get("/getClubEventData", event_controller_1.getClubEventData);
router.put("/update-event", event_controller_1.updateEvent);
router.post("/create-event", event_controller_1.createEvent);
exports.default = router;
