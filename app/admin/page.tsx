import ProjectManager from "@/components/admin/project-manager";
import { requireAdmin } from "../data/require-admin";
import { getAllProjects } from "../data/get-all-projects";

export default async function AdminPage() {
  await requireAdmin();
  const projects = await getAllProjects();

  return <ProjectManager projects={projects} />;
}
