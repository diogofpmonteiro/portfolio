"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaReact, FaJava, FaDocker, FaGitAlt } from "react-icons/fa";
import { RiNextjsLine, RiNodejsLine, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiGraphql, SiMongodb, SiCypress } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { IconType } from "react-icons/lib";

interface TechItem {
  id: string;
  name: string;
  icon: { name: IconType; color: string };
}

const initialTechStack: TechItem[] = [
  { id: "1", name: "React", icon: { name: FaReact, color: "#82D7F7" } },
  { id: "2", name: "Next.js", icon: { name: RiNextjsLine, color: "dark:white" } },
  { id: "3", name: "TypeScript", icon: { name: SiTypescript, color: "#3178C6" } },
  { id: "4", name: "Node.js", icon: { name: RiNodejsLine, color: "#339933" } },
  { id: "5", name: "Java", icon: { name: FaJava, color: "#007396" } },
  { id: "6", name: "PostgreSQL", icon: { name: BiLogoPostgresql, color: "#336791" } },
  { id: "7", name: "Tailwind CSS", icon: { name: RiTailwindCssFill, color: "62BAF3" } },
  { id: "8", name: "Docker", icon: { name: FaDocker, color: "#1D63ED" } },
  { id: "9", name: "GraphQL", icon: { name: SiGraphql, color: "#E10098" } },
  { id: "10", name: "MongoDB", icon: { name: SiMongodb, color: "#00684A" } },
  { id: "11", name: "Cypress", icon: { name: SiCypress, color: "#568A74" } },
  { id: "12", name: "Git", icon: { name: FaGitAlt, color: "#DE5C40" } },
];

interface SortableTechCardProps {
  tech: TechItem;
}

const SortableTechCard = ({ tech }: SortableTechCardProps) => {
  const { id, icon, name } = tech;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      suppressHydrationWarning
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "z-50" : ""}`}>
      <Card className={`p-4 hover:shadow-lg transition-all duration-200 ${isDragging ? "shadow-2xl scale-105" : ""}`}>
        <div className='flex items-center space-x-3'>
          <icon.name color={icon.color} />
          <span className='font-medium text-sm'>{name}</span>
        </div>
      </Card>
    </div>
  );
};

const TechStackSection = () => {
  const [techStack, setTechStack] = useState<TechItem[]>(initialTechStack);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTechStack((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section id='tech-stack' className='py-20 bg-muted/30 rounded-2xl'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Tech Stack</h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto mb-6'>
              Some of the technologies I work with..
            </p>
            <Badge variant='secondary' className='text-xs'>
              💡 Try dragging the cards around
            </Badge>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={techStack} strategy={rectSortingStrategy}>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {techStack.map((tech) => (
                  <SortableTechCard key={tech.id} tech={tech} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
