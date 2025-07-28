import { ReactNode } from "react";
import Navbar from "../../components/sections/Navbar";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className='container mx-auto px-4 md:px-6 lg:px-0 mb-32'>{children}</main>
    </div>
  );
};

export default PublicLayout;
