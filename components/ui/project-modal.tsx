"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

const ProjectModal = ({ project, isOpen, onClose, isLoggedIn = false, onEdit, onDelete }: ProjectModalProps) => {
  if (!project) return null;

  const handleEdit = () => onEdit && onEdit(project);

  const handleDelete = () => {
    if (onDelete && confirm("Are you sure you want to delete this project?")) {
      onDelete(project.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='min-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <DialogTitle className='text-2xl font-bold mb-2'>{project.title}</DialogTitle>
              <div className='flex items-center gap-2 mb-4'>
                <Badge variant='outline'>{project.category}</Badge>
                {project.featured && <Badge>Featured</Badge>}
              </div>
            </div>
            {isLoggedIn && (
              <div className='flex gap-2 ml-4 mr-8'>
                <Button variant='outline' size='sm' onClick={handleEdit}>
                  <Edit className='w-4 h-4' />
                </Button>
                <Button variant='destructive' size='sm' onClick={handleDelete}>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Project Image */}
          <div className='relative h-64 md:h-80 rounded-lg overflow-hidden'>
            <Image src={project.image} alt={project.title} fill className='object-cover' />
          </div>

          {/* Project Description */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>About This Project</h3>
            <p className='text-muted-foreground leading-relaxed'>{project.longDescription}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className='text-lg font-semibold mb-3'>Technologies Used</h3>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((tech) => (
                <Badge key={tech} variant='secondary'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-3 pt-4 border-t'>
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='w-4 h-4 mr-2' />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant='outline' asChild>
                <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                  <Github className='w-4 h-4 mr-2' />
                  View Source Code
                </a>
              </Button>
            )}
          </div>

          {/* Admin Demo Notice */}
          {isLoggedIn && (
            <div className='bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
              <h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>🔧 Admin Demo Mode</h4>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                You're viewing this project as an admin. The edit and delete buttons above are for demonstration
                purposes, showcasing CRUD functionality.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
