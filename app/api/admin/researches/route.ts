import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in" },
        { status: 401 },
      );
    }

    // Verify admin status
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // Fetch all researches with researcher details and funding details
    const researches = await prisma.research.findMany({
      include: {
        researcher: {
          select: {
            fullName: true,
            email: true,
          },
        },
        fundingDetails: true,
      },
    });

    // Format the response to match the frontend interface expectations
    const formattedResearches = researches.map((research) => ({
      id: research.id,
      title: research.title,
      description: research.description,
      status: research.status,
      researcherId: research.researcherId,
      researcher: research.researcher,
      // Format funding details for frontend display
      fundingDetails: research.fundingDetails
        ? research.fundingDetails.description ||
          `${research.fundingDetails.amount}`
        : null,
    }));

    return NextResponse.json(formattedResearches);
  } catch (error) {
    console.error("Error fetching researches:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 },
    );
  }
}

