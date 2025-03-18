import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";
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
    // Parse request body
    const body = await req.json();
    const { status, fundingDetails } = body;

    console.log("Received fundingDetails:", fundingDetails);

    // Validate the status value
    if (status && !["ACCEPTED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    // Update status if needed
    if (status) {
      await prisma.research.update({
        where: { id },
        data: { status, updatedAt: new Date() },
      });
    }

    // Handle funding details if provided and not empty
    if (fundingDetails && fundingDetails.trim() !== "") {
      try {
        // Try to parse fundingDetails as a number if it looks like one
        let fundingAmount = 0;
        const numericValue = parseFloat(fundingDetails);

        if (!isNaN(numericValue)) {
          fundingAmount = numericValue;
        }

        // Check if funding details already exist
        const existingFunding = await prisma.fundingDetails.findUnique({
          where: { researchId: id },
        });

        if (existingFunding) {
          // Update existing funding details
          await prisma.fundingDetails.update({
            where: { id: existingFunding.id },
            data: {
              amount: fundingAmount,
              description: isNaN(numericValue)
                ? fundingDetails
                : `Funding of ${fundingAmount} approved`,
              notes: isNaN(numericValue) ? fundingDetails : undefined,
            },
          });
          console.log("Updated existing funding details:", existingFunding.id);
        } else {
          // Create new funding details
          const newFunding = await prisma.fundingDetails.create({
            data: {
              amount: fundingAmount,
              description: isNaN(numericValue)
                ? fundingDetails
                : `Funding of ${fundingAmount} approved`,
              notes: isNaN(numericValue) ? fundingDetails : undefined,
              research: { connect: { id } },
            },
          });
          console.log("Created new funding details:", newFunding.id);
        }
      } catch (fundingError) {
        console.error("Error processing funding details:", fundingError);
        // Continue execution even if funding update fails
      }
    }

    // Get updated research with funding details
    const updatedResearch = await prisma.research.findUnique({
      where: { id },
      include: { fundingDetails: true },
    });

    return NextResponse.json({
      success: true,
      message: "Research updated successfully",
      data: updatedResearch,
    });
  } catch (error) {
    console.error("Error updating research:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 },
    );
  }
}
