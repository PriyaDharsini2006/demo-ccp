import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"; // Update the path based on your file structure
import prisma from "@/prisma/client";

export async function PUT(req: NextRequest) {
  try {
    // Get the session using your authOptions
    const session = await getServerSession(authOptions);

    // Debug session data
    console.log("Session in API route:", JSON.stringify(session, null, 2));

    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in" },
        { status: 401 },
      );
    }

    const userId = String(session.user.id);

    // Parse request body
    const body = await req.json();
    const { id, title, description, detailedDesc } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing innovation ID" },
        { status: 400 },
      );
    }

    // Find the innovation
    const innovation = await prisma.innovation.findUnique({
      where: { id },
    });

    if (!innovation) {
      return NextResponse.json(
        { error: "Innovation not found" },
        { status: 404 },
      );
    }

    // Verify ownership by comparing stringified IDs
    const innovatorId = String(innovation.innovatorId);
    console.log(`Comparing user ID ${userId} with innovator ID ${innovatorId}`);

    if (innovatorId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized: You are not the owner of this innovation" },
        { status: 403 },
      );
    }

    // Update the innovation
    const updatedInnovation = await prisma.innovation.update({
      where: { id },
      data: {
        title,
        description,
        detailedDesc,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Innovation updated successfully",
      data: updatedInnovation,
    });
  } catch (error) {
    console.error("Error updating innovation:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 },
    );
  }
}
