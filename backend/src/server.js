import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import checkInRoutes from "./routes/checkInRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/checkin", checkInRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
