import { ReactNode } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='px-4 md:px-32'>
      <AdminNavbar />
      <main className='container mx-auto px-4 md:px-6 lg:px-0 my-32'>{children}</main>
    </div>
  );
};

export default AdminLayout;
