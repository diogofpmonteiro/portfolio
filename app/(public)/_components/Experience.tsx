"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Building } from "lucide-react";

interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  description: string;
  technologies?: string[];
  current?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    id: "1",
    period: "2023 - Present",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    current: true,
    description:
      "Leading the development of scalable web applications using modern technologies. Architected and implemented microservices infrastructure, mentored junior developers, and collaborated with cross-functional teams to deliver high-quality products.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
  },
  {
    id: "2",
    period: "2021 - 2023",
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Developed and maintained multiple client projects ranging from e-commerce platforms to SaaS applications. Implemented responsive designs, optimized application performance, and integrated third-party APIs.",
    technologies: ["React", "Python", "Django", "PostgreSQL", "Redis", "Stripe API"],
  },
  {
    id: "3",
    period: "2020 - 2021",
    title: "Frontend Developer",
    company: "Creative Agency Co.",
    location: "Los Angeles, CA",
    type: "Full-time",
    description:
      "Focused on creating engaging user interfaces and experiences for various client projects. Collaborated closely with designers to implement pixel-perfect designs and ensure cross-browser compatibility.",
    technologies: ["React", "Vue.js", "SCSS", "JavaScript", "Figma", "Adobe Creative Suite"],
  },
  {
    id: "4",
    period: "2019 - 2020",
    title: "Junior Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Full-time",
    description:
      "Started my professional journey working on various features for a growing startup. Gained experience in full-stack development, learned best practices, and contributed to the company's rapid growth.",
    technologies: ["JavaScript", "Node.js", "MongoDB", "Express.js", "HTML", "CSS"],
  },
];

const ExperienceSection = () => {
  return (
    <section id='experience' className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Work Experience</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              My professional journey and the experiences that shaped my career
            </p>
          </div>

          <div className='relative'>
            {/* Timeline line */}
            <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5'></div>

            <div className='space-y-8'>
              {experienceData.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Timeline dot */}
                  <div className='absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-1.5 z-10'>
                    {experience.current && (
                      <div className='absolute inset-0 bg-primary rounded-full animate-ping'></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className='hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6'>
                        <div className='space-y-4'>
                          {/* Header */}
                          <div className='space-y-2'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <CalendarDays className='w-4 h-4' />
                              <span>{experience.period}</span>
                              {experience.current && (
                                <Badge variant='secondary' className='text-xs'>
                                  Current
                                </Badge>
                              )}
                            </div>

                            <h3 className='text-xl font-semibold'>{experience.title}</h3>

                            <div className='flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground'>
                              <div className='flex items-center gap-1'>
                                <Building className='w-4 h-4' />
                                <span>{experience.company}</span>
                              </div>
                              <span className='hidden sm:inline'>•</span>
                              <div className='flex items-center gap-1'>
                                <MapPin className='w-4 h-4' />
                                <span>{experience.location}</span>
                              </div>
                              <span className='hidden sm:inline'>•</span>
                              <Badge variant='outline' className='w-fit'>
                                {experience.type}
                              </Badge>
                            </div>
                          </div>

                          {/* Description */}
                          <p className='text-muted-foreground leading-relaxed'>{experience.description}</p>

                          {/* Technologies */}
                          {experience.technologies && (
                            <div className='space-y-2'>
                              <p className='text-sm font-medium'>Technologies used:</p>
                              <div className='flex flex-wrap gap-2'>
                                {experience.technologies.map((tech) => (
                                  <Badge key={tech} variant='secondary' className='text-xs'>
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
