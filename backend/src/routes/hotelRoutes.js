import express from "express";
import { getHotels } from "../controllers/hotelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware, getHotels);

export default router;
