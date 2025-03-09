import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookHotel = async (req, res) => {
  const { hotelId } = req.body;
  console.log("id ", hotelId);
  const userId = req.user?.id;

  try {
    const booking = await prisma.booking.create({
      data: { userId, hotelId: Number(hotelId) },
    });
    res.json({ message: "Booking successful", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Booking failed" });
  }
};
