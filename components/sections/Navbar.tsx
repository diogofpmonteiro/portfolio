"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useSignOut } from "@/hooks/use-signout";
import { Menu } from "@/components/ui/menu";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const { signOut } = useSignOut();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveSection = section;
            break;
          }
        }
      }
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-end'>
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-3'>
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => scrollToSection(item.id)}
                className='text-sm'>
                {item.label}
              </Button>
            ))}
            <ModeToggle />

            {session && <Button onClick={signOut}>Sign out</Button>}
          </div>

          {/* Mobile Menu */}
          <Menu isOpen={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <div className='flex-col space-y-4 mt-12'>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => scrollToSection(item.id)}
                  className='text-sm w-full justify-start'>
                  {item.label}
                </Button>
              ))}
            </div>

            <div className='flex gap-4 justify-end items-end'>
              <ModeToggle />
              {session && (
                <Button onClick={signOut} className='w-fit'>
                  Sign out
                </Button>
              )}
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
