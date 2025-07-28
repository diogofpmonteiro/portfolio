import ProjectManager from "@/components/admin/project-manager";
import { requireAdmin } from "../data/require-admin";

export default async function AdminPage() {
  await requireAdmin();
  return <ProjectManager />;
}
