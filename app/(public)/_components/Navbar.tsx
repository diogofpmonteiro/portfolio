"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  // const [activeSection, setActiveSection] = useState("");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ["intro", "tech-stack", "experience", "projects", "contact"];
  //     const scrollPosition = window.scrollY + 100;

  //     for (const section of sections) {
  //       const element = document.getElementById(section);
  //       if (element) {
  //         const { offsetTop, offsetHeight } = element;
  //         if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
  //           setActiveSection(section);
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const navItems = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='text-xl font-bold'>Diogo Monteiro</div>

          <div className='hidden md:flex items-center space-x-1'>
            {navItems.map((item) => (
              <Button
                key={item.id}
                // variant={activeSection === item.id ? "default" : "ghost"}
                variant='ghost'
                // onClick={() => scrollToSection(item.id)}
                className='text-sm'>
                {item.label}
              </Button>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => {
              // TODO: Toggle mobile menu - implement this with state
            }}>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

// const Navbar = () => {
//   const { data: session, isPending } = authClient.useSession();

//   return (
//     <header
//       className='sticky top-0 z-50 w-full border-b bg-background/95
//     backdrop-blur-[backdrop-filter]:bg-background/60'>
//       <div className='container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8'>
//         <Link href='/' className='flex items-center space-x-2 mr-4'>
//           <span className='font-bold'>Diogo Monteiro</span>
//         </Link>
//         {/* Desktop navigation */}
//         <nav className='hidden md:flex md:flex-1 md:items-center md:justify-between'>
//           <div className='flex items-center space-x-2'>
//             {navigationItems.map(({ name, href }) => (
//               <Link
//                 key={name}
//                 href={href}
//                 className='text-sm font-medium transition-colors
//               hover:text-primary'>
//                 {name}
//               </Link>
//             ))}
//           </div>

//           <div className='flex items-center space-x-4'>
//             <ModeToggle />

//             {isPending ? null : session ? (
//               <UserDropdown
//                 name={
//                   session.user.name && session.user.name.length > 0
//                     ? session.user.name
//                     : session.user.email.split("@")[0]
//                 }
//                 email={session.user.email}
//                 image={session.user.image ?? `https://avatar.vercel.sh/${session?.user.email}`}
//               />
//             ) : (
//               <>
//                 <Link
//                   href='/login'
//                   className={buttonVariants({
//                     variant: "secondary",
//                   })}>
//                   Login
//                 </Link>
//                 <Link href='/login' className={buttonVariants()}>
//                   Get started
//                 </Link>
//               </>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

export default Navbar;
