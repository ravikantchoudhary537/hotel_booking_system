import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkIn = async (req, res) => {
  const { bookingId, aadhaar } = req.body;

  try {
    const checkIn = await prisma.checkIn.create({
      data: { bookingId, aadhaar },
    });
    res.json({ message: "Check-in successful", checkIn });
  } catch (error) {
    res.status(500).json({ error: "Check-in failed" });
  }
};
    