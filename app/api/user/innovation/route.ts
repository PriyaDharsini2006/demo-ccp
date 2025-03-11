import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next"; // Make sure the import path is correct

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
