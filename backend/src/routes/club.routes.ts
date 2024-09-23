import { Router } from "express";
import { getClubData, addClub, login } from "../controllers/club.controller";
import rateLimiter from "../middlewares/rateLimiter";

const router = Router();

router.get("/getClubData", getClubData);
router.post("/addClub", addClub);
router.post("/login", rateLimiter, login);

export default router;
