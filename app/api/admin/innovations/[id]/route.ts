// File: /app/api/admin/innovations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
    
    // Parse request body
    const body = await req.json();
    const { status, fundingDetails } = body;
    
    // Validate the status value
    if (status && !['ACCEPTED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }
    
    // Find and update the innovation
    const updatedInnovation = await prisma.innovation.update({
      where: { id },
      data: {
        status,
        // Handle fundingDetails as a relation, not a string
        fundingDetails: fundingDetails ? {
          upsert: {
            create: { details: fundingDetails },
            update: { details: fundingDetails }
          }
        } : undefined,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Innovation updated successfully",
      data: updatedInnovation
    });
  } catch (error) {
    console.error("Error updating innovation:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}