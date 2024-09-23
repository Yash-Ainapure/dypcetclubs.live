import { Router } from "express";
import {
  deleteEvent,
  getClubEventData,
  updateEvent,
  createEvent,
  getAllEventData,
} from "../controllers/event.controller";

const router = Router();

router.delete("/deleteEvent", deleteEvent);

//get all events
router.get("/getAllEventData", getAllEventData);

//get all events for a club
router.get("/getClubEventData", getClubEventData);

router.put("/update-event", updateEvent);

router.post("/create-event", createEvent);

export default router;
