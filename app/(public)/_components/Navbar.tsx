"use client";

import Link from "next/link";
import React from "react";

import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import UserDropdown from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/admin" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header
      className='sticky top-0 z-50 w-full border-b bg-background/95 
    backdrop-blur-[backdrop-filter]:bg-background/60'>
      <div className='container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8'>
        <Link href='/' className='flex items-center space-x-2 mr-4'>
          <span className='font-bold'>Diogo Monteiro</span>
        </Link>
        {/* Desktop navigation */}
        <nav className='hidden md:flex md:flex-1 md:items-center md:justify-between'>
          <div className='flex items-center space-x-2'>
            {navigationItems.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className='text-sm font-medium transition-colors 
              hover:text-primary'>
                {name}
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <ModeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={
                  session.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session.user.email.split("@")[0]
                }
                email={session.user.email}
                image={session.user.image ?? `https://avatar.vercel.sh/${session?.user.email}`}
              />
            ) : (
              <>
                <Link
                  href='/login'
                  className={buttonVariants({
                    variant: "secondary",
                  })}>
                  Login
                </Link>
                <Link href='/login' className={buttonVariants()}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
