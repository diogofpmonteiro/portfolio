import { prisma } from "@/lib/db";

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return projects;
}
