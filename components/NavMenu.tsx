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
import Link from "next/link";
import { MdAccountBox } from "react-icons/md";

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
        className="md:hidden max-w-screen mt-[22px] overflow-hidden p-2  bg-slate-100"
      >
        <VisuallyHidden asChild>
          <DialogTitle>Nav Menu</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>Nav Description</DialogDescription>
        </VisuallyHidden>

        <div
          className={cn(
            "bg-white p-2 transition-all ease-out duration-300 overflow-auto scrollbar-none",
            scrollMenu ? "translate-y-0" : "-translate-y-[100%]"
          )}
        >
          <div className=" p-2 rounded-lg bg-[#7fabe428] space-y-2">
            <h1 className="text-center font-bold">
              Access saving just for you - in only one step
            </h1>
            <div className="flex items-center justify-evenly ">
              <button className="py-2 px-4 text-sm font-[700] bg-[#ffffff] border border-gray-400 rounded-md">
                Search Hotels
              </button>
              <button className="flex gap-x-1 text-sm leading-[18px] text-white font-[700] bg-[#2747ff] py-2 px-4 rounded-sm tracking-wide">
                <Link href={"/auth/sign-in"}>Sign in</Link> /
                <Link href={"/auth/sign-up"}>Register</Link>
              </button>
            </div>
          </div>
          <div className="my-5">
            <span className="text-muted-foreground font-medium text-sm">
              Setting
            </span>
            <ul className="space-y-3 mt-3">
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> Profile
              </li>
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> My Bookings
              </li>
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> Recently Viewed
              </li>
            </ul>
          </div>
          <div className="my-5">
            <span className="text-muted-foreground font-medium text-sm">
              Support
            </span>
            <ul className="space-y-3 mt-3">
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> Help
              </li>
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> About us
              </li>
              <li className="text-sm font-medium flex items-center gap-x-2">
                <MdAccountBox /> Contuct us
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavMenu;
