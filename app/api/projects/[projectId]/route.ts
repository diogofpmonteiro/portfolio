import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get a specific project
export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// Update a specific project
export async function PUT(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const body = await request.json();

    const { title, description, longDescription, image, technologies, liveUrl, githubUrl, category, featured } = body;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: params.projectId },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: title || existingProject.title,
        description: description || existingProject.description,
        longDescription: longDescription || existingProject.longDescription,
        image: image || existingProject.image,
        technologies: technologies || existingProject.technologies,
        liveUrl: liveUrl !== undefined ? liveUrl : existingProject.liveUrl,
        githubUrl: githubUrl !== undefined ? githubUrl : existingProject.githubUrl,
        category: category || existingProject.category,
        featured: featured !== undefined ? featured : existingProject.featured,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// Delete a specific project
export async function DELETE(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: params.projectId },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
