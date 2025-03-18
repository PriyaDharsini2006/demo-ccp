// File: /app/api/admin/startups/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if user is an admin
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

    // Parse request body
    const body = await req.json();
    const { status, fundingDetails } = body;

    // Validate the status value
    if (status && !["ACCEPTED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    // Update status first if needed
    if (status) {
      await prisma.startup.update({
        where: { id },
        data: { status },
      });
    }

    // Handle funding details if provided
    if (fundingDetails) {
      // Parse fundingDetails as it might be a string from the frontend
      const fundingAmount = parseFloat(fundingDetails);

      if (isNaN(fundingAmount)) {
        return NextResponse.json(
          { error: "Invalid funding amount" },
          { status: 400 },
        );
      }

      // Check if funding details already exist
      const existingFunding = await prisma.fundingDetails.findUnique({
        where: { startupId: id },
      });

      if (existingFunding) {
        // Update existing funding details
        await prisma.fundingDetails.update({
          where: { id: existingFunding.id },
          data: {
            amount: fundingAmount,
            description: `Funding of ${fundingAmount} approved`,
          },
        });
      } else {
        // Create new funding details
        await prisma.fundingDetails.create({
          data: {
            amount: fundingAmount,
            description: `Funding of ${fundingAmount} approved`,
            startup: { connect: { id } },
          },
        });
      }
    }

    // Get updated startup with funding details
    const updatedStartup = await prisma.startup.findUnique({
      where: { id },
      include: { fundingDetails: true },
    });

    return NextResponse.json({
      success: true,
      message: "Startup updated successfully",
      data: updatedStartup,
    });
  } catch (error) {
    console.error("Error updating startup:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 },
    );
  }
}

