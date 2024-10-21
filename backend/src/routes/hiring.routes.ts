import { Router } from "express";
import { CreateHiringSession } from "../controllers/hiring.controller";

const router = Router();

router.post("/createHiringSession", CreateHiringSession);

export default router;
