import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body
    if (!body.name || !body.desc || !body.id || !body.gstIn || !body.mantra) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
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
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating startup:", error);

    return NextResponse.json(
      { message: "Error while creating the record" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, url, name, description, type, domain, vision, mission } =
    await req.json();

  // Check if `id` and `url` are valid

  if (url) {
    if (!id || !url) {
      return NextResponse.json("Invalid input", { status: 400 });
    }
    try {
      const result = await prisma.startup.update({
        where: { id },
        data: { imageURL: url.public_id },
      });

      // Log the result for debugging
      console.log("Update result:", result);

      return NextResponse.json("Image Updated", { status: 200 });
    } catch (error) {
      console.error("Error while updating the image:", error);
      return NextResponse.json("Error while updating the image", {
        status: 500,
      });
    }
  } else {
    try {
      const result = await prisma.startup.update({
        where: { id },
        data: { name, description, type, domain, vision, mission },
      });

      console.log("Update result:", result);

      return NextResponse.json("Contents Updated", { status: 200 });
    } catch (error) {
      console.error("Error while updating the Contents:", error);
      return NextResponse.json("Error while updating the Contents", {
        status: 500,
      });
    }
  }
}
