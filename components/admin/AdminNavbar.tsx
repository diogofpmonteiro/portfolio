"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useSignOut } from "@/hooks/use-signout";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const AdminNavbar = () => {
  const { data: session } = authClient.useSession();
  const { signOut } = useSignOut();

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-end'>
          <div className='hidden md:flex items-center space-x-3'>
            <Link
              href={"/"}
              className={buttonVariants({
                className: "text-sm",
                variant: "ghost",
              })}>
              Home
            </Link>

            <ModeToggle />

            {session && <Button onClick={signOut}>Sign out</Button>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
