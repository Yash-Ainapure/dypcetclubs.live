import { Router } from "express";
import {
  deleteEvent,
  getClubEventData,
  updateEvent,
  createEvent,
  getAllEventData,
  getSingleEventData,
} from "../controllers/event.controller";

const router = Router();

router.delete("/deleteEvent", deleteEvent);

//get all events
router.get("/getAllEventData", getAllEventData);

router.get("/getSingleEventData", getSingleEventData);

//get all events for a club
router.get("/getClubEventData", getClubEventData);

router.put("/update-event", updateEvent);

router.post("/create-event", createEvent);

export default router;
