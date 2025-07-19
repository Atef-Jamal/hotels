"use client";
import {
  AppWindow,
  CurrencyIcon,
  HelpCircle,
  Hotel,
  Languages,
  LogOut,
  Menu,
  MessageSquare,
  View,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { MdAccountBox, MdClose } from "react-icons/md";

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
    <Dialog onOpenChange={(value) => handleScroll(value)}>
      <DialogTrigger className="md:hidden">
        <Menu className="text-white" size={25} />
      </DialogTrigger>
      <DialogContent className="max-w-screen h-full border-none bg-purple-200 p-0 md:hidden">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Nav Menu</DialogTitle>
            <DialogDescription>Nav Description</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <div className="flex flex-col overflow-y-auto">
          <div className="z-[1] flex h-[46px] items-center justify-between bg-white px-2 sm:px-4 md:h-[66px] md:px-7">
            <Link href={"/"} className="text-xl font-bold text-blue-700 md:text-2xl">
              Hotels.com
            </Link>
            <DialogClose>
              <MdClose color="blue" size={25} />
            </DialogClose>
          </div>

          <div
            className={cn(
              "m-2 flex-1 overflow-y-auto bg-white p-2 transition-all duration-300 ease-out",
              scrollMenu ? "translate-y-0" : "-translate-y-[100%]",
            )}
          >
            <div className="space-y-2 rounded-lg bg-[#7fabe428] px-2 py-3">
              <h1 className="text-center font-medium">Access saving just for you - in only one step</h1>
              <div className="mx-auto grid max-w-[400px] grid-cols-2 gap-1">
                <button className="rounded-sm border border-gray-400 bg-[#ffffff] py-1 text-sm font-medium">
                  Search Hotels
                </button>
                <button className="flex items-center justify-center gap-x-1 text-nowrap rounded-sm bg-[#2747ff] py-1 text-sm font-medium text-white">
                  <Link href={"/auth/sign-in"}>Sign in</Link>
                  <span className="mx-1">/</span>
                  <Link href={"/auth/sign-up"}>Register</Link>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-x-2">
                  <Hotel size={18} />
                  <Link href={"/hotels"}>Hotels</Link>
                </li>
                <li className="flex items-center gap-x-2">
                  <Hotel size={18} />
                  <Link href={"/hotels/Details"}>Hotel Details</Link>
                </li>
                <li className="flex items-center gap-x-2">
                  <Hotel size={18} /> <Link href={"/bookNew"}>BookNew</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 border-b-2 py-5 text-sm">
              <span className="text-muted-foreground">Setting</span>
              <ul className="space-y-3">
                <li className="flex items-center gap-x-2">
                  <Languages size={18} /> English ( US )
                </li>
                <li className="flex items-center gap-x-2">
                  <CurrencyIcon size={18} /> Currency ( SAR )
                </li>
                <li className="flex items-center gap-x-2">
                  <MdAccountBox size={18} /> My Bookings
                </li>
                <li className="flex items-center gap-x-2">
                  <View size={18} /> Recently Viewed
                </li>
              </ul>
            </div>
            <div className="space-y-3 border-b-2 py-5 text-sm">
              <span className="text-muted-foreground">More</span>
              <ul className="space-y-3">
                <li className="flex items-center gap-x-2">
                  <HelpCircle size={18} /> Help
                </li>
                <li className="flex items-center gap-x-2">
                  <MessageSquare size={18} /> Notifications
                </li>
                <li className="flex items-center gap-x-2">
                  <AppWindow size={18} /> Download the App
                </li>
                <li className="flex items-center gap-x-2">
                  <LogOut size={18} /> Sign out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavMenu;
