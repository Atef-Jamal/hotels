"use client";

import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const NavMenu = () => {
  const [scrollMenu, setScrollMenu] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (value: boolean) => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    if (value) {
      timeOutRef.current = setTimeout(() => {
        setScrollMenu(true);
      }, 0);
    } else {
      setScrollMenu(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);
  return (
    <Dialog modal={false} onOpenChange={(value) => handleScroll(value)}>
      <DialogTrigger className="md:hidden">
        <Menu className="text-white" size={25} />
      </DialogTrigger>
      <DialogContent
        style={{
          height: `calc(100dvh - 46px)`,
        }}
        className="max-w-screen mt-[22px] overflow-hidden"
      >
        <VisuallyHidden asChild>
          <DialogTitle>Nav Menu</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>Nav Description</DialogDescription>
        </VisuallyHidden>
        <div
          className={cn(
            "transition-all ease-out duration-300 mt-2",
            scrollMenu ? "translate-y-0" : "-translate-y-[100%]"
          )}
        >
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
          <div>Customize</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavMenu;
