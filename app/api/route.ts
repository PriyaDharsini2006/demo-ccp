// app/api/check-admin/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Query the Admin table to check if the email exists
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    // Return whether the user is an admin or not
    return NextResponse.json({ isAdmin: !!admin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      { isAdmin: false, error: "Failed to check admin status" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
