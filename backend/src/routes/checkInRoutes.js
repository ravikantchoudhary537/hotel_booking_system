import express from "express";
import { checkIn } from "../controllers/checkInController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, checkIn);

export default router;
