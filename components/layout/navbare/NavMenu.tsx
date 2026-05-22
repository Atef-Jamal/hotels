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
import { Button } from "../../ui/button";

export default function NavMenu() {
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
      <DialogContent className="h-full min-w-full rounded-none bg-purple-200 p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Nav Menu</DialogTitle>
            <DialogDescription>Nav Description</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <div className="flex flex-col overflow-y-auto">
          <DialogClose className="z-1 flex h-11.5 items-center justify-between bg-white px-2 sm:px-4 md:h-16.5 md:px-7">
            <Link href={"/"} className="text-xl font-bold text-blue-700 md:text-2xl">
              Hotels.com
            </Link>
            <MdClose color="blue" size={25} />
          </DialogClose>

          <div
            className={cn(
              "m-2 flex-1 overflow-y-auto bg-white p-2 transition-all duration-300 ease-out",
              scrollMenu ? "translate-y-0" : "-translate-y-full",
            )}
          >
            <div className="space-y-2 rounded-lg bg-[#7fabe428] px-2 py-3">
              <h1 className="text-center font-medium">Access saving just for you - in only one step</h1>
              <DialogClose className={"mx-auto grid w-full max-w-100 grid-cols-2 gap-1"}>
                <Button variant={"outline"} size={"sm"} className={"rounded-sm"}>
                  Search Hotels
                </Button>
                <Button variant={"outline"} size={"sm"} className={"rounded-sm bg-blue-700 text-gray-100"}>
                  <Link href={"/auth/sign-in"}>Sign in</Link>
                  <span className="mx-1">/</span>
                  <Link href={"/auth/sign-up"}>Register</Link>
                </Button>
              </DialogClose>
            </div>
            <div className="mt-3">
              <DialogClose className={"w-full"}>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <Hotel size={18} />
                    <Link href={"/hotels"}>Hotels</Link>
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <Hotel size={18} />
                    <Link href={"/hotels/Details"}>Hotel Details</Link>
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <Hotel size={18} /> <Link href={"/bookNew"}>BookNew</Link>
                  </li>
                </ul>
              </DialogClose>
            </div>
            <div className="space-y-3 border-b-2 py-5 text-sm">
              <span className="text-muted-foreground">Setting</span>
              <DialogClose className={"w-full"}>
                <ul className="space-y-3">
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <Languages size={18} /> English ( US )
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <CurrencyIcon size={18} /> Currency ( SAR )
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <MdAccountBox size={18} /> My Bookings
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <View size={18} /> Recently Viewed
                  </li>
                </ul>
              </DialogClose>
            </div>
            <div className="space-y-3 border-b-2 py-5 text-sm">
              <span className="text-muted-foreground">More</span>
              <DialogClose className={"w-full"}>
                <ul className="space-y-3">
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <HelpCircle size={18} /> Help
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <MessageSquare size={18} /> Notifications
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <AppWindow size={18} /> Download the App
                  </li>
                  <li className="flex items-center gap-x-2 text-blue-700">
                    <LogOut size={18} /> Sign out
                  </li>
                </ul>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
