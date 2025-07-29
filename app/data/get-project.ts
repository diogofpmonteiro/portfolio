import { prisma } from "@/lib/db";

export async function getProjectById(projectId: string) {
  return await prisma.project.findUnique({
    where: { id: projectId },
  });
}
