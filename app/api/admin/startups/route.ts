// File: /app/api/admin/startups/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";

// GET all startups for admin
export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    // Check if user is an admin
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in" },
        { status: 401 }
      );
    }
    
    // Verify admin status
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email }
    });
    
    if (!admin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }
    
    // Fetch all startups with entrepreneur info
    const startups = await prisma.startup.findMany({
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(startups);
    
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}