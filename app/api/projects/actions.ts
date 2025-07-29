"use server";
import { requireAdmin } from "@/app/data/require-admin";
import { prisma } from "@/lib/db";
import { projectSchema, ProjectSchemaType } from "@/lib/zod-schemas";
import { revalidatePath } from "next/cache";

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export async function createProject(data: ProjectSchemaType): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const validation = projectSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.project.create({
      data: {
        ...validation.data,
        userId: user.id,
      },
    });

    revalidatePath("/admin");

    return {
      status: "success",
      message: "Project created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create project",
    };
  }
}

export async function deleteProject(projectId: string): Promise<ApiResponse> {
  await requireAdmin();

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath(`/admin`);

    return {
      status: "success",
      message: "Project deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete project",
    };
  }
}
