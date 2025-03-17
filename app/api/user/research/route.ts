import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"; // Update the path based on your file structure
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    // Get the session using your authOptions
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json("Unauthorized: You must be logged in", { status: 401 });
    }
    
    // Parse request body
    const body = await req.json();
    const { title, description, researcherId } = body;
    
    if (!title || !description) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }
    
    // Create new research
    await prisma.research.create({
      data: {
        title,
        description,
        researcher: {
          connect: {
            id: researcherId || session.user.id
          }
        }
      }
    });
    
    // Return a string message instead of an object
    return NextResponse.json("Research created successfully", { status: 201 });
    
  } catch (error) {
    console.error("Error creating research:", error);
    return NextResponse.json("Server error occurred", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const researcherId = searchParams.get("researcherId");
    
    let research;
    
    if (researcherId) {
      research = await prisma.research.findMany({
        where: {
          researcherId
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } else {
      research = await prisma.research.findMany({
        orderBy: {
          createdAt: "desc"
        }
      });
    }
    
    // Return the research data directly
    return NextResponse.json(research);
    
  } catch (error) {
    console.error("Error fetching research:", error);
    return NextResponse.json("Server error occurred", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Get the session using your authOptions
    const session = await getServerSession(authOptions);
    
    // Debug session data
    console.log("Session in API route:", JSON.stringify(session, null, 2));
    
    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json("Unauthorized: You must be logged in", { status: 401 });
    }
    
    const userId = String(session.user.id);
    
    // Parse request body
    const body = await req.json();
    const { id, title, description, detailedDesc } = body;
    
    if (!id) {
      return NextResponse.json("Missing research ID", { status: 400 });
    }
    
    // Find the research
    const research = await prisma.research.findUnique({
      where: { id },
    });
    
    if (!research) {
      return NextResponse.json("Research not found", { status: 404 });
    }
    
    // Verify ownership by comparing stringified IDs
    const researcherId = String(research.researcherId);
    console.log(`Comparing user ID ${userId} with researcher ID ${researcherId}`);
    
    if (researcherId !== userId) {
      return NextResponse.json("Unauthorized: You are not the owner of this research", { status: 403 });
    }
    
    // Update the research
    await prisma.research.update({
      where: { id },
      data: {
        title,
        description,
        detailedDesc,
        updatedAt: new Date(),
      },
    });
    
    // Return a string message instead of an object
    return NextResponse.json("Research updated successfully");
    
  } catch (error) {
    console.error("Error updating research:", error);
    return NextResponse.json("Server error occurred", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the session using your authOptions
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json("Unauthorized: You must be logged in", { status: 401 });
    }
    
    const userId = String(session.user.id);
    
    // Get research ID from query parameters
    const { searchParams } = new URL(req.url);
    const researchId = searchParams.get("id");
    
    if (!researchId) {
      return NextResponse.json("Research ID required", { status: 400 });
    }
    
    // Find the research
    const research = await prisma.research.findUnique({
      where: { id: researchId },
    });
    
    if (!research) {
      return NextResponse.json("Research not found", { status: 404 });
    }
    
    // Verify ownership
    const researcherId = String(research.researcherId);
    
    if (researcherId !== userId) {
      return NextResponse.json("Unauthorized: You are not the owner of this research", { status: 403 });
    }
    
    // Delete the research
    await prisma.research.delete({
      where: { id: researchId }
    });
    
    // Return a string message instead of an object
    return NextResponse.json("Research deleted successfully");
    
  } catch (error) {
    console.error("Error deleting research:", error);
    return NextResponse.json("Server error occurred", { status: 500 });
  }
}