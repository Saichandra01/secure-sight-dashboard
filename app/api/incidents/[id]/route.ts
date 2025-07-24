import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ Await here
  const body = await req.json();

  const updatedIncident = await prisma.incident.update({
    where: { id: Number(id) },
    data: body,
  });

  return Response.json(updatedIncident);
}
