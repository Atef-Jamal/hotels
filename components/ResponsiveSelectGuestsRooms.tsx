"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import SelectGuestsAndRooms from "./SelectGuestsAndRooms";
import { User } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";

function ResponsiveSelectGuestsRooms({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { queryParams } = useQueryParams();

  if (isMobile)
    return (
      <Drawer>
        {children}
        <DrawerContent className="px-3 py-0">
          <DrawerHeader className="px-1">
            <DrawerTitle className="font-medium">Guests and Rooms</DrawerTitle>
          </DrawerHeader>
          <SelectGuestsAndRooms />
          <DrawerDescription className="mb-2 text-center text-xs font-light">
            if there are more guests. consider adding more rooms
          </DrawerDescription>
          <DrawerFooter className="p-0">
            <DrawerClose className="rounded-md bg-blue-700 py-1 text-gray-200">Apply</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog>
      <DialogTrigger className="hidden items-center gap-x-2 truncate rounded-sm border p-2 md:flex">
        <User size={16} />
        <span>
          {queryParams.roomsCount} Room, {queryParams.adults} Adults, {queryParams.children} Children
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <SelectGuestsAndRooms />
        <DialogDescription className="text-center text-sm font-light">
          if there are more guests. consider adding more rooms
        </DialogDescription>
        <DialogFooter className="p-0">
          <DialogClose className="m-2 w-full rounded-md bg-blue-700 py-1 text-gray-200">Apply</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResponsiveSelectGuestsRooms;
