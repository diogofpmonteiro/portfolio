export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  category: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
