import { NextFunction, Router, Request, Response } from "express";
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
// @ts-ignore
import jwt from "jsonwebtoken";
// @ts-ignore
import cookieParser from "cookie-parser";
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
    console.log("authenticated user success")

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/getClubData", getClubData);
router.post("/addClub", addClub);
router.post("/addMember", checkAuth, addClubMember);
router.post("/login", login);
router.get("/getClubMembers", getClubMembers);
router.get("/:clubId", getClubById);
router.post("/findByEmail", getClubByEmail);
export default router;
