import { NextFunction, Router, Request, Response } from "express";

import {
  CreateHiringSession,
  DeleteHiringSession,
  AddHiringPosition,
  UpdateHiringSession,
  DeleteHiringPosition,
  UpdateHiringPosition,
  CreateApplicant,
  GetHiringSessions,
  GetPositionsBySession,
  GetAllHiringSessions,
  getApplicantsByPositionID,
} from "../controllers/hiring.controller";
// @ts-ignore
import jwt from "jsonwebtoken";
// @ts-ignore
import cookieParser from "cookie-parser";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() }).single("resume");

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
  const token =
    req.cookies?.auth_token ||
    req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token is ", token);
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

//routes
/*
   1.To create a hiring session *
   2.Delete a hiring session  *
   3. update  *

   4.Add hiring positions to a hiring session *
   5.Delete a hiring position *
   6.update a hiring position *

   7.apply for a position * 
*/

router.post("/createHiringSession", CreateHiringSession);
router.delete("/deleteHiringSession", DeleteHiringSession);
router.put("/updateHiringSession", UpdateHiringSession);
router.get("/hiringSessions", GetHiringSessions);
router.get("/hiringSessions/all", GetAllHiringSessions);

router.post("/addHiringPosition", AddHiringPosition);
router.delete("/DeleteHiringPosition", DeleteHiringPosition);
router.put("/updateHiringPosition", UpdateHiringPosition);
router.get("/getPositions", GetPositionsBySession);
router.post("/applyForPosition", upload, CreateApplicant);
router.get("/getApplicantsByPositionId", getApplicantsByPositionID);

export default router;
