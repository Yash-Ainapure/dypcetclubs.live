import { NextFunction, Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import {
  deleteEvent,
  getClubEventData,
  updateEvent,
  createEvent,
  getAllEventData,
  getSingleEventData,
} from "../controllers/event.controller";

const router = Router();
router.use(cookieParser());

interface AuthenticatedRequest extends Request {
  cookies: { [key: string]: string };
  user?: any;
}
const checkAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, "yash123");
    req.user = decoded;
    console.log("decoded", decoded);
    console.log("authenticated user success");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.delete("/deleteEvent", checkAuth, deleteEvent);

//get all events
router.get("/getAllEventData", getAllEventData);

router.get("/getSingleEventData", getSingleEventData);

//get all events for a club
router.get("/getClubEventData", getClubEventData);

router.put("/update-event", checkAuth, updateEvent);

router.post("/create-event", checkAuth, createEvent);

export default router;
