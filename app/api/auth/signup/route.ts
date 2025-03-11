import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, mail, pass, userType } = await req.json();

    // Validate required fields
    if (!name || !mail || !pass || !userType) {
      return NextResponse.json("All fields are required", { status: 400 });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName: name,
        email: mail,
        password: pass,
        userType,
      },
    });

    return NextResponse.json("User Created", { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
