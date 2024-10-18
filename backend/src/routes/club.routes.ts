import { Router } from "express";
import {
  getClubData,
  addClub,
  login,
  getClubMembers,
  addClubMember,
  getClubById,
  getClubByEmail,
} from "../controllers/club.controller";
import rateLimiter from "../middlewares/rateLimiter";

const router = Router();

router.get("/getClubData", getClubData);
router.post("/addClub", addClub);
router.post("/addMember", addClubMember);
router.post("/login", rateLimiter, login);
router.get("/getClubMembers", getClubMembers);
router.get("/:clubId", getClubById);
router.post("/findByEmail", getClubByEmail);
export default router;
