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

interface TechItem {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

// TODO: add icons instead of colors
const initialTechStack: TechItem[] = [
  { id: "1", name: "React", color: "bg-blue-500" },
  { id: "2", name: "Next.js", color: "bg-black" },
  { id: "3", name: "TypeScript", color: "bg-blue-600" },
  { id: "4", name: "Node.js", color: "bg-green-600" },
  { id: "5", name: "Java", color: "bg-yellow-500" },
  { id: "6", name: "PostgreSQL", color: "bg-blue-700" },
  { id: "7", name: "Tailwind CSS", color: "bg-cyan-500" },
  { id: "8", name: "Docker", color: "bg-blue-400" },
  { id: "9", name: "GraphQL", color: "bg-orange-500" },
  { id: "10", name: "MongoDB", color: "bg-green-500" },
  { id: "11", name: "Jest", color: "bg-gray-600" }, // TODO: update
  { id: "12", name: "Git", color: "bg-red-500" },
];

interface SortableTechCardProps {
  tech: TechItem;
}

const SortableTechCard = ({ tech }: SortableTechCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tech.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "z-50" : ""}`}>
      <Card className={`p-4 hover:shadow-lg transition-all duration-200 ${isDragging ? "shadow-2xl scale-105" : ""}`}>
        <div className='flex items-center space-x-3'>
          <div className={`w-3 h-3 rounded-full ${tech.color}`}></div>
          <span className='font-medium text-sm'>{tech.name}</span>
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
