import { Router } from "express";
import {
  CreateHiringSession,
  DeleteHiringSession,
  AddHiringPosition,
  UpdateHiringSession,
  DeleteHiringPosition,
  UpdateHiringPosition,
  CreateApplicant,
  GetHiringSessions,
  GetPositionsBySession
} from "../controllers/hiring.controller";

const router = Router();

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
router.get("/hiringSessions",GetHiringSessions);

router.post("/addHiringPosition", AddHiringPosition);
router.delete("/DeleteHiringPosition", DeleteHiringPosition);
router.put("/updateHiringPosition", UpdateHiringPosition);
router.get("/getPositions",GetPositionsBySession)
router.post("/applyForPosition", CreateApplicant);

export default router;
