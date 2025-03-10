import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkIn = async (req, res) => {
  const { bookingId, aadhaar } = req.body;

  if (!bookingId) {
    return res.status(400).json({ error: "bookingId is required" });
  }

  if (!aadhaar || !Array.isArray(aadhaar) || aadhaar.length === 0) {
    return res.status(400).json({ error: "aadhaar must be an array of 12-digit numbers" });
  }

  try {
    const bookingExists = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!bookingExists) {
      return res.status(400).json({ error: "Invalid bookingId: No such booking exists" });
    }

    const checkIns = await Promise.all(
      aadhaar.map((aadhaarNumber) =>
        prisma.checkIn.create({
          data: { bookingId, aadhaar: aadhaarNumber },
        })
      )
    );

    res.json({ message: "Check-in successful", checkIns });
  } catch (error) {
    console.error("Check-in failed:", error);
    res.status(500).json({ error: "Check-in failed" });
  }
};
