import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request: NextRequest) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { id, approvalStatus, fundingAmount, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Research ID is required" },
        { status: 400 },
      );
    }

    // Update the research record
    const updatedResearch = await prisma.research.update({
      where: { id },
      data: {
        approvalStatus,
        fundingAmount,
        adminNotes,
      },
    });

    return NextResponse.json(
      {
        message: "Research updated successfully",
        data: updatedResearch,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating research:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update research" },
      { status: 500 },
    );
  }
}
