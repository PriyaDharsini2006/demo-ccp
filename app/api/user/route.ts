import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { email, url, name, pass } = await req.json();
  if (url) {
    await prisma.user
      .update({
        where: { email },
        data: { image: url?.public_id },
      })
      .catch(() => NextResponse.json("Issue in image upload", { status: 500 }));
    return NextResponse.json("Image Updates", { status: 201 });
  } else {
    await prisma.user
      .update({
        where: { email: email },
        data: { fullName: name, password: pass },
      })
      .catch(() =>
        NextResponse.json("Issue with updating User Details", { status: 500 })
      );
    return NextResponse.json("User updated", { status: 201 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email! },
  });
  return NextResponse.json(user, { status: 200 });
}
