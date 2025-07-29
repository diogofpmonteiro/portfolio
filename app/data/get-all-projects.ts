import { prisma } from "@/lib/db";

export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}
