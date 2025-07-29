"use server";
import { requireAdmin } from "@/app/data/require-admin";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// Create a new project
export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  try {
    const body = await request.json();

    const { title, description, longDescription, image, technologies, liveUrl, githubUrl, category, featured } = body;

    // Validate required fields
    if (!title || !description || !longDescription || !image || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title,
        description,
        longDescription,
        image,
        technologies: technologies || [],
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        category,
        featured: featured || false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
