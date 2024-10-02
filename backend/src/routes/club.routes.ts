import { Router } from "express";
import {
  getClubData,
  addClub,
  login,
  getClubMembers,
} from "../controllers/club.controller";
import rateLimiter from "../middlewares/rateLimiter";

const router = Router();

router.get("/getClubData", getClubData);
router.post("/addClub", addClub);
router.post("/login", rateLimiter, login);
router.get("/getClubMembers", getClubMembers);

export default router;
