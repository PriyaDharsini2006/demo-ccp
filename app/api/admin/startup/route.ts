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
        { error: "Startup ID is required" },
        { status: 400 },
      );
    }

    // Update the startup record
    const updatedStartup = await prisma.startup.update({
      where: { id },
      data: {
        approvalStatus,
        fundingAmount,
        adminNotes,
      },
    });

    return NextResponse.json(
      {
        message: "Startup updated successfully",
        data: updatedStartup,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating startup:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update startup" },
      { status: 500 },
    );
  }
}
