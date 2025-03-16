import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { title, description, userId } = await req.json();
    if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

    const innovation = await prisma.innovation.create({
      data: {
        title,
        description,
        innovatorId: userId,
      },
    });

    return NextResponse.json("Innovation Created Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating innovation:", error);
    return NextResponse.json("Error While creating the Innovation", {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, detailedDesc } = await req.json();

    if (!id) {
      return NextResponse.json("Innovation ID is required", { status: 400 });
    }

    // Check if innovation exists
    const existingInnovation = await prisma.innovation.findUnique({
      where: { id },
    });

    if (!existingInnovation) {
      return NextResponse.json("Innovation not found", { status: 404 });
    }

    // Update the innovation
    const updatedInnovation = await prisma.innovation.update({
      where: { id },
      data: {
        title,
        description,
        detailedDesc,
        updatedAt: new Date(), // This will be handled automatically by @updatedAt
      },
    });

    return NextResponse.json("Innovation Updated Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating innovation:", error);
    return NextResponse.json("Error while updating the Innovation", {
      status: 500,
    });
  }
}
