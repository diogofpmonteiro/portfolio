"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
import { MenuIcon, XIcon } from "lucide-react";

interface MenuProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Menu({ children, isOpen, onOpenChange }: MenuProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction='right'>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='sm' className='md:hidden' aria-label='Open menu'>
          <MenuIcon className='size-5' />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='min-h-screen min-w-full'>
        <DrawerClose asChild className='absolute top-4 right-4'>
          <Button variant='outline'>
            <XIcon className='size-4' />
          </Button>
        </DrawerClose>

        <DrawerHeader className='sr-only'>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <div className='flex flex-col space-y-4 p-4 h-full justify-between'>{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
