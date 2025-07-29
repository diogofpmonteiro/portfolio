"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/lib/types";
import { ProjectSchemaType, projectSchema } from "@/lib/zod-schemas";

interface ProjectFormProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectSchemaType) => void;
  isLoading?: boolean;
}

const ProjectForm = ({ project, isOpen, onClose, onSubmit, isLoading = false }: ProjectFormProps) => {
  const defaultValues = {
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    category: undefined,
    featured: false,
  };

  const [newTechnology, setNewTechnology] = useState("");

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const setupForm = useCallback(() => {
    if (isOpen && project) {
      form.reset({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        image: project.image,
        technologies: project.technologies,
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        category: project.category as "full-stack" | "frontend" | "backend",
        featured: project.featured,
      });
    }
  }, [isOpen, project, form]);

  const technologies = form.watch("technologies");

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology.trim())) {
      form.setValue("technologies", [...technologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    form.setValue(
      "technologies",
      technologies.filter((tech) => tech !== techToRemove)
    );
  };

  const handleSubmit = async (data: ProjectSchemaType) => {
    // Clean up empty URLs
    const cleanedData = {
      ...data,
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
    };

    onSubmit(cleanedData);
    form.reset(defaultValues);
    onClose();
  };

  const handleClose = () => {
    form.reset(defaultValues);
    setNewTechnology("");
    onClose();
  };

  useEffect(() => {
    setupForm();
  }, [setupForm]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='min-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder='My Awesome Project' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='full-stack'>Full Stack</SelectItem>
                        <SelectItem value='frontend'>Frontend</SelectItem>
                        <SelectItem value='backend'>Backend</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='A brief description of your project...' rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='longDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='A detailed description of your project, its features, and implementation...'
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://example.com/project-image.jpg' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies */}
            <div className='space-y-3'>
              <FormLabel>Technologies</FormLabel>
              <div className='flex gap-2'>
                <Input
                  placeholder='Add technology (e.g., React, Node.js)'
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTechnology();
                    }
                  }}
                />
                <Button type='button' variant='outline' onClick={handleAddTechnology}>
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {technologies.map((tech) => (
                  <Badge key={tech} variant='secondary' className='flex items-center gap-1'>
                    {tech}
                    <button
                      type='button'
                      onClick={() => handleRemoveTechnology(tech)}
                      className='ml-1 hover:text-destructive'>
                      <X className='w-3 h-3' />
                    </button>
                  </Badge>
                ))}
              </div>
              {form.formState.errors.technologies && (
                <p className='text-sm text-destructive'>{form.formState.errors.technologies.message}</p>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='liveUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Live Demo URL <span className='text-xs text-muted-foreground'>(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='https://myproject.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='githubUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      GitHub URL <span className='text-xs text-muted-foreground'>(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='https://github.com/user/repo' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='featured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured Project</FormLabel>
                    <p className='text-sm text-muted-foreground'>
                      Featured projects will be displayed prominently on the portfolio
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-6 border-t'>
              <Button type='button' variant='outline' onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
