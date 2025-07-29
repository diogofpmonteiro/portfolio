import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Building } from "lucide-react";

interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  client?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  description: string;
  technologies?: string[];
  current?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    id: "1",
    period: "Jan 2025 - Present",
    title: "Full Stack Developer",
    company: "Self-Employed",
    location: "Lisbon, PT",
    type: "Full-time",
    current: true,
    description:
      "Created a Telegram bot for Solana blockchain interactions, featuring token trading, withdrawals, position management, a cashback system, and more.",
    technologies: [
      "Node.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "quicknode",
      "Redis",
      "@solana/web3.js",
      "node-telegram-bot-api",
      "Render",
      "i18n",
    ],
  },
  {
    id: "2",
    period: "Aug 2022 - Aug 2024",
    title: "Frontend Developer",
    company: "DEPT®",
    client: "Vereniging Eigen Huis",
    location: "Amsterdam, NL",
    type: "Full-time",
    description:
      "Developed a Next.js application for a major non-profit, integrating diverse client and internal APIs. Transformed Figma designs into functional, responsive, and accessible web components. Managed weekly deployments via Azure DevOps CI/CD pipelines.",
    technologies: [
      "TypeScript",
      "React.js",
      "Next.js",
      "GraphQL",
      "Chakra UI",
      "Redis",
      "REST",
      "Kontent.AI",
      "zustand",
      "Azure DevOps",
      "Figma",
    ],
  },
  {
    id: "3",
    period: "Feb 2024 - Aug 2024",
    title: "Frontend Developer",
    company: "DEPT®",
    client: "Via Outlets",
    location: "Amsterdam, NL",
    type: "Full-time",
    description:
      "Served as the sole frontend developer for a 16-week release phase, successfully delivering project milestones on schedule. Integrated third-party services and CMS while developing a custom REST API. Collaborated directly with clients to align project objectives with business goals, ensuring high satisfaction rates.",
    technologies: ["React.js", "Next.js", "Chakra UI", "JavaScript", "Figma", "MappedIn", "zustand", "Contentstack"],
  },
  {
    id: "4",
    period: "July 2023 - Dec 2023",
    title: "Junior Frontend Developer",
    company: "DEPT®",
    client: "Bol.com",
    location: "Amsterdam, NL",
    type: "Full-time",
    description:
      "Contributed to enhancing the user experience by resolving UI and data-related bugs. Successfully implemented a comprehensive redesign of the user onboarding flow, translating intricate Figma designs into a seamless and functional in-app experience.",
    technologies: [
      "TypeScript",
      "BitBucket",
      "Next.js",
      "axios",
      "react-hook-form",
      "zod",
      "zustand",
      "React.js",
      "i18n",
    ],
  },
  {
    id: "5",
    period: "Feb 2023 - May 2023",
    title: "Junior Frontend Developer",
    company: "DEPT®",
    location: "Amsterdam, NL",
    type: "Full-time",
    description:
      "Maintained an internal Next.js applications focused on AI-driven marketing solutions. Integrated custom APIs and collaborated with cross-functional teams to enhance existing features. Took on design responsibilities, creating cohesive interfaces that aligned with established themes without dedicated design support.",
    technologies: ["TypeScript", "BitBucket", "Next.js", "axios", "react-hook-form", "zod", "zustand", "React.js"],
  },
];

const ExperienceSection = () => {
  return (
    <section id='experience' className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto flex flex-col items-center'>
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
                  <div className='absolute left-2.75 md:left-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-1.75 z-10'>
                    {experience.current && (
                      <div className='absolute inset-0 bg-primary rounded-full animate-ping'></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className='hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6'>
                        {/* Header */}
                        <div className='space-y-3'>
                          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <CalendarDays className='w-4 h-4' />
                            <span>{experience.period}</span>
                            <Badge variant='outline' className='w-fit'>
                              {experience.type}
                            </Badge>
                            {experience.current && (
                              <Badge variant='outline' className='text-xs'>
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
                            {experience.client && (
                              <>
                                <span className='hidden sm:inline'>•</span>
                                <div className='flex items-center gap-1'>
                                  <span>{experience.client}</span>
                                </div>
                              </>
                            )}
                            <span className='hidden sm:inline'>•</span>
                            <div className='flex items-center gap-1'>
                              <MapPin className='w-4 h-4' />
                              <span>{experience.location}</span>
                            </div>
                          </div>

                          <p className='text-muted-foreground leading-relaxed'>{experience.description}</p>

                          {experience.technologies && (
                            <div className='space-y-2'>
                              <p className='text-sm font-medium'>Technologies used:</p>
                              <div className='flex flex-wrap gap-2'>
                                {experience.technologies.map((tech) => (
                                  <Badge key={tech} className='text-xs'>
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
          <p className='text-[10px] mt-12 text-muted-foreground text-center max-w-xl'>
            Note: As a developer at a design agency, I worked on multiple projects at once, which led to overlapping
            timelines in my experiences. This might help clear up any questions about project schedules. 🙂
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
