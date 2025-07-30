"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react";
import Image from "next/image";

import { toast } from "sonner";
import ProjectForm from "./project-form";
import { Project } from "@/lib/types";
import { tryCatch } from "@/lib/try-catch";
import { createProject, deleteProject, editProject } from "@/app/api/projects/actions";
import { ProjectSchemaType } from "@/lib/zod-schemas";

const ProjectManager = ({ projects }: { projects: Project[] }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProject = async (projectId: string) => {
    setIsLoading(true);

    if (!confirm("Are you sure you want to delete this project?")) {
      setIsLoading(false);
      return;
    }

    const { result, error } = await tryCatch(deleteProject(projectId));

    if (error) {
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    if (result.status === "success") {
      toast.success(result.message);
    } else if (result.status === "error") {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const handleFormSubmit = async (project: ProjectSchemaType) => {
    setIsLoading(true);

    const { result, error } = await tryCatch(
      editingProject ? editProject(project, editingProject.id) : createProject(project)
    );

    if (error) {
      toast.error(`Failed to ${editingProject ? "update" : "create"} project`);
      setIsLoading(false);
      return;
    }

    if (result.status === "success") {
      toast.success(result.message);
      setIsFormOpen(false);
      setEditingProject(null);
    } else if (result.status === "error") {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Project Management</h2>
          <p className='text-muted-foreground'>Manage the portfolio projects - create, edit, and delete projects.</p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            setIsFormOpen(true);
          }}>
          <Plus className='w-4 h-4' />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects?.map((project) => (
          <Card key={project.id} className='overflow-hidden'>
            <div className='relative h-40'>
              <Image src={project.image} alt={project.title} fill className='object-cover' />
              {project.featured && <Badge className='absolute top-2 right-2 text-xs'>Featured</Badge>}
            </div>
            <CardHeader className='pb-2'>
              <div className='flex items-start justify-between'>
                <CardTitle className='text-lg'>{project.title}</CardTitle>
                <Badge variant='outline' className='text-xs'>
                  {project.category}
                </Badge>
              </div>
              <p className='text-sm text-muted-foreground line-clamp-2'>{project.description}</p>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex flex-wrap gap-1'>
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant='secondary' className='text-xs'>
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant='secondary' className='text-xs'>
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className='flex gap-2'>
                {project.liveUrl && (
                  <Button size='sm' variant='outline' asChild className='flex-1'>
                    <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                      <ExternalLink className='w-3 h-3 mr-1' />
                      Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size='sm' variant='outline' asChild className='flex-1'>
                    <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                      <Github className='w-3 h-3 mr-1' />
                      Code
                    </a>
                  </Button>
                )}
              </div>

              <div className='flex gap-2 pt-2 border-t'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => {
                    setEditingProject(project);
                    setIsFormOpen(true);
                  }}
                  className='flex-1'
                  disabled={isLoading}>
                  <Edit className='w-3 h-3 mr-1' />
                  Edit
                </Button>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={() => handleDeleteProject(project.id)}
                  className='flex-1'
                  disabled={isLoading}>
                  <Trash2 className='w-3 h-3 mr-1' />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects?.length === 0 && (
        <Card>
          <CardContent className='text-center py-12'>
            <div className='text-muted-foreground mb-4'>
              <Plus className='w-12 h-12 mx-auto mb-4 opacity-50' />
              <h3 className='text-lg font-semibold mb-2'>No projects yet</h3>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Form Modal */}
      <ProjectForm
        project={editingProject}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectManager;
