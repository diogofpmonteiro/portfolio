"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, MapPin, Mail } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id='intro' className='min-h-[90vh] flex items-center justify-center pt-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='relative w-32 h-32 mx-auto mb-8'>
            <Image
              src='/picture.jpeg'
              alt='Profile'
              fill
              priority
              className='rounded-full object-cover border-4 border-primary/20'
            />
            <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent'></div>
          </div>

          {/* Main Heading */}
          <div className='space-y-4 mb-8'>
            <Badge variant='secondary' className='mb-4'>
              <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
              Open to work
            </Badge>

            <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
              Hey, I&apos;m{" "}
              <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>Diogo</span>
            </h1>

            <p className='text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto'>
              I&apos;m a <span className='text-foreground font-semibold'>Full Stack Developer</span>, inspired by
              turning your ideas into reality.
            </p>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-4 mb-8'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <MapPin className='w-4 h-4' />
              <span>Lisbon, Portugal</span>
            </div>

            <div className='flex items-center gap-4'>
              <Button variant='outline' size='sm' asChild>
                <a href='https://linkedin.com/in/diogopratasmonteiro' target='_blank' rel='noopener noreferrer'>
                  <Linkedin className='w-4 h-4 mr-2' />
                  LinkedIn
                </a>
              </Button>

              <Button variant='outline' size='sm' asChild>
                <a href='https://github.com/diogofpmonteiro' target='_blank' rel='noopener noreferrer'>
                  <Github className='w-4 h-4 mr-2' />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <Mail className='w-4 h-4 mr-2' />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
