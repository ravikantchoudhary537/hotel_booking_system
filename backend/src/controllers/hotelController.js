import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHotels = async (req, res) => {
  const hotels = await prisma.hotel.findMany();
  res.json(hotels);
};
