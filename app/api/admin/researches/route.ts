// File: /app/api/admin/researches/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";

// GET all researches for admin
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
    
    // Fetch all researches with researcher info
    const researches = await prisma.research.findMany({
      include: {
        researcher: {
          select: {
            fullName: true,
            email: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    
    return NextResponse.json(researches);
    
  } catch (error) {
    console.error("Error fetching researches:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}