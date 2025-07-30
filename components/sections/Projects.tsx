"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, Plus } from "lucide-react";
import Image from "next/image";
import ProjectModal from "@/components/ui/project-modal";
import { Project } from "@/lib/types";
import { toast } from "sonner";
import ProjectForm from "../admin/project-form";
import { authClient } from "@/lib/auth-client";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const { data: session } = authClient.useSession();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id='projects' className='py-20 bg-muted/30 rounded-2xl'>
        {/* Admin Demo Notice */}
        {session?.user.id && (
          <div className='container max-w-1/2 px-4 mx-auto mb-8'>
            <div className='bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
              <h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>🔧 Admin Demo Mode</h4>
              <p className='text-sm text-blue-700 dark:text-blue-300'>
                <span className='font-bold underline'>Nice!</span> You authenticated and are now viewing this section as
                an admin. The &quot;Add Project&quot; button besides the categories and the &quot;edit&quot; and
                &quot;delete&quot; buttons at the top of each project details card are for demonstration purposes,
                showcasing CRUD functionality. You won&apos;t be able to update the projects.
              </p>
            </div>
          </div>
        )}
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <div className='flex items-center justify-center gap-4 mb-4'>
                <h2 className='text-3xl md:text-4xl font-bold'>Projects</h2>
              </div>
              <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                A showcase of my recent work and personal projects
              </p>
            </div>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className='mb-12'>
                <h3 className='text-2xl font-semibold mb-6 flex items-center gap-2'>⭐ Featured Projects</h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  {featuredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className='overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer'
                      onClick={() => handleProjectClick(project)}>
                      <div className='relative h-48 overflow-hidden'>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                      </div>
                      <CardHeader>
                        <div className='flex items-start justify-between'>
                          <h4 className='text-xl font-semibold'>{project.title}</h4>
                          <Badge variant='outline' className='text-xs'>
                            {project.category}
                          </Badge>
                        </div>
                        <p className='text-muted-foreground line-clamp-3'>{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant='outline' className='text-xs'>
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant='outline' className='text-xs'>
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className='flex flex-wrap gap-2'>
                        <Button
                          size='sm'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}>
                          View Details
                        </Button>
                        {project.liveUrl && (
                          <Button variant='outline' size='sm' asChild onClick={(e) => e.stopPropagation()}>
                            <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                              <ExternalLink className='w-4 h-4 mr-2' />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className='flex flex-wrap justify-center gap-2 mb-8'>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size='sm'
                  onClick={() => setSelectedCategory(category.id)}>
                  {category.label}
                </Button>
              ))}

              {session && (
                <Button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsFormOpen(true);
                    setIsModalOpen(false);
                  }}
                  size='sm'
                  className='ml-4'>
                  <Plus className='size-4' />
                  Add Project
                </Button>
              )}
            </div>

            {/* All Projects Grid */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className='overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer'
                  onClick={() => handleProjectClick(project)}>
                  <div className='relative h-40 overflow-hidden'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                    {project.featured && <Badge className='absolute top-2 right-2 text-xs'>Featured</Badge>}
                  </div>
                  <CardHeader className='pb-2'>
                    <div className='flex items-start justify-between'>
                      <h4 className='font-semibold'>{project.title}</h4>
                      <Badge variant='outline' className='text-xs'>
                        {project.category}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>{project.description}</p>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='flex flex-wrap gap-1'>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant='outline' className='text-xs'>
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant='outline' className='text-xs'>
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className='pt-0 flex gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}>
                      View Details
                    </Button>
                    {project.liveUrl && (
                      <Button
                        size='sm'
                        variant='outline'
                        asChild
                        className='flex-1'
                        onClick={(e) => e.stopPropagation()}>
                        <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                          <ExternalLink className='w-3 h-3 mr-1' />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Info Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedProject(null);
          setIsModalOpen(false);
        }}
        isLoggedIn={!!session?.user.id}
        onEdit={() => {
          setIsFormOpen(true);
          setIsModalOpen(false);
        }}
        onDelete={() => {
          toast.success("Project deleted!");
          setIsModalOpen(false);
        }}
      />

      {/* Project Form Modal */}
      <ProjectForm
        project={selectedProject}
        isOpen={isFormOpen}
        onClose={() => {
          setSelectedProject(null);
          setIsFormOpen(false);
        }}
        onSubmit={() => {
          setIsFormOpen(false);
          setSelectedProject(null);
          toast.success("Edited the project!");
        }}
        isLoading={false}
      />
    </>
  );
};

export default ProjectsSection;
