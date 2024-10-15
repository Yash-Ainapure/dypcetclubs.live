"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const router = (0, express_1.Router)();
router.delete("/deleteEvent", event_controller_1.deleteEvent);
//get all events
router.get("/getAllEventData", event_controller_1.getAllEventData);
router.get("/getSingleEventData", event_controller_1.getSingleEventData);
//get all events for a club
router.get("/getClubEventData", event_controller_1.getClubEventData);
router.put("/update-event", event_controller_1.updateEvent);
router.post("/create-event", event_controller_1.createEvent);
exports.default = router;
