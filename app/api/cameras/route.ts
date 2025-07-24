import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cameras = await prisma.camera.findMany({
    include: { incidents: true },
  });
  return NextResponse.json(cameras);
}
