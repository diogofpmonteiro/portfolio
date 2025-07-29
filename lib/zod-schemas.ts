import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  image: z.string().min(1),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  liveUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  category: z.enum(["full-stack", "frontend", "backend"]),
  featured: z.boolean(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ProjectSchemaType = z.infer<typeof projectSchema>;
