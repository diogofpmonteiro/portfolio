"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, Github, Play } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  category: "full-stack" | "frontend" | "backend";
  featured?: boolean;
}

// TODO: update project properties and data
const projectsData: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with modern UI/UX and robust backend.",
    longDescription:
      "Built a comprehensive e-commerce platform with user authentication, product management, shopping cart functionality, payment integration, and admin dashboard. Features include real-time inventory updates, order tracking, and responsive design.",
    image: "/project-ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    category: "full-stack",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    longDescription:
      "Developed a team collaboration tool with features like task assignment, progress tracking, real-time notifications, and team chat. Includes drag-and-drop kanban boards, time tracking, and detailed analytics.",
    image: "/project-taskmanager.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    videoUrl: "https://youtube.com/watch?v=demo",
    category: "full-stack",
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A beautiful weather application with detailed forecasts and maps.",
    longDescription:
      "Created a responsive weather dashboard that provides current conditions, 7-day forecasts, weather maps, and location-based alerts. Features include geolocation support, favorite locations, and weather data visualization.",
    image: "/project-weather.jpg",
    technologies: ["Vue.js", "JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
    liveUrl: "https://weather-dashboard-demo.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    category: "frontend",
  },
  {
    id: "4",
    title: "Social Media API",
    description: "RESTful API for a social media platform with authentication and real-time features.",
    longDescription:
      "Built a scalable REST API for a social media application with user authentication, post creation, commenting, following system, and real-time notifications. Includes rate limiting, data validation, and comprehensive testing.",
    image: "/project-api.jpg",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io", "Jest"],
    githubUrl: "https://github.com/yourusername/social-api",
    category: "backend",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website with animations and dark mode.",
    longDescription:
      "Designed and developed a personal portfolio website featuring smooth animations, dark/light mode toggle, responsive design, and optimized performance. Built with modern web technologies and best practices.",
    image: "/project-portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://portfolio-demo.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    category: "frontend",
  },
  {
    id: "6",
    title: "Chat Application",
    description: "Real-time chat application with rooms, file sharing, and emoji support.",
    longDescription:
      "Developed a real-time chat application with features like private messaging, group chats, file sharing, emoji reactions, and user presence indicators. Includes message encryption and moderation tools.",
    image: "/project-chat.jpg",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Cloudinary"],
    liveUrl: "https://chat-demo.com",
    githubUrl: "https://github.com/yourusername/chat-app",
    category: "full-stack",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === "all" ? projectsData : projectsData.filter((project) => project.category === selectedCategory);

  const featuredProjects = projectsData.filter((project) => project.featured);

  return (
    <section id='projects' className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Projects</h2>
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
                  <Card key={project.id} className='overflow-hidden hover:shadow-xl transition-all duration-300 group'>
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
                        {/* // TODO: decide if we display category */}
                        <Badge variant='outline' className='text-xs'>
                          {project.category}
                        </Badge>
                      </div>
                      <p className='text-muted-foreground'>
                        {expandedProject === project.id ? project.longDescription : project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant='outline' className='text-xs'>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className='flex flex-wrap gap-2'>
                      {project.liveUrl && (
                        <Button size='sm' asChild>
                          <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                            <ExternalLink className='w-4 h-4 mr-2' />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant='outline' size='sm' asChild>
                          <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                            <Github className='w-4 h-4 mr-2' />
                            Source Code
                          </a>
                        </Button>
                      )}
                      {project.videoUrl && (
                        <Button variant='outline' size='sm' asChild>
                          <a href={project.videoUrl} target='_blank' rel='noopener noreferrer'>
                            <Play className='w-4 h-4 mr-2' />
                            Watch Video
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
          </div>

          {/* All Projects Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProjects.map((project) => (
              <Card key={project.id} className='overflow-hidden hover:shadow-lg transition-all duration-300 group'>
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
                    <Badge variant='secondary' className='text-xs'>
                      {/* // TODO: decide if we display category */}
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
  );
};

export default ProjectsSection;
