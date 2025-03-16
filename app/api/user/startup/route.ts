import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate the request body
    if (!body.name || !body.desc || !body.id || !body.gstIn || !body.mantra) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    // Create the startup record
    const startup = await prisma.startup.create({
      data: {
        name: body.name,
        description: body.desc,
        userId: body.id,
        gstin: body.gstIn,
        mantra: body.mantra,
      },
    });
    return NextResponse.json(
      { message: "Startup Created Successfully", startup },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating startup:", error);
    return NextResponse.json(
      { message: "Error while creating the record" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, url, name, description, type, domain, vision, mission } =
      await req.json();
    // Check if startup exists
    const existingStartup = await prisma.startup.findUnique({
      where: { id },
    });
    if (!existingStartup) {
      return NextResponse.json("Startup not found", { status: 404 });
    }
    // Handle image update separately
    if (url) {
      if (!id) {
        return NextResponse.json("Invalid input: missing id", { status: 400 });
      }
      try {
        const result = await prisma.startup.update({
          where: { id },
          data: { imageURL: url.public_id || url },
        });
        // Log the result for debugging
        console.log("Image update result:", result);
        return NextResponse.json("Image Updated", { status: 200 });
      } catch (error) {
        console.error("Error while updating the image:", error);
        return NextResponse.json("Error while updating the image", {
          status: 500,
        });
      }
    }
    // Handle content update
    else {
      // Create update object with only provided fields
      const updateData: any = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (type) updateData.type = type;
      if (domain) updateData.domain = domain;
      if (vision) updateData.vision = vision;
      if (mission) updateData.mission = mission;
      // Only update if there are fields to update
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json("No data provided for update", {
          status: 400,
        });
      }
      try {
        const result = await prisma.startup.update({
          where: { id },
          data: updateData,
        });
        console.log("Content update result:", result);
        return NextResponse.json("Contents Updated", { status: 200 });
      } catch (error) {
        console.error("Error while updating the Contents:", error);
        return NextResponse.json("Error while updating the Contents", {
          status: 500,
        });
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json("Server error", { status: 500 });
  }
}
