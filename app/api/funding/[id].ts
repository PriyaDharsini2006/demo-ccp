// pages/api/funding/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid innovation ID" });
  }

  try {
    // First check if funding details are directly related to this innovation
    const fundingDetails = await prisma.fundingDetails.findUnique({
      where: {
        innovationId: id,
      },
    });

    if (fundingDetails) {
      return res.status(200).json(fundingDetails);
    }

    // If no funding details found, return empty object
    return res.status(200).json({});
  } catch (error) {
    console.error("Error fetching funding details:", error);
    return res.status(500).json({ error: "Failed to fetch funding details" });
  }
}
