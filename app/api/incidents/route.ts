import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const incidents = await prisma.incident.findMany({
    include: { camera: true },
  });
  return NextResponse.json(incidents);
}
