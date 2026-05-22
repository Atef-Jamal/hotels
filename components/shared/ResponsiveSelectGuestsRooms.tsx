"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import SelectGuestsAndRooms from "./SelectGuestsAndRooms";
import { User } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useState } from "react";

export default function ResponsiveSelectGuestsRooms({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { queryParams, updateQueryParams } = useQueryParams();

  const [guestsAndRooms, setGuestsAndRooms] = useState({
    adults: queryParams.adults,
    children: queryParams.children,
    rooms: queryParams.roomsCount,
  });

  const handleApply = () => {
    return updateQueryParams([
      { method: "set", key: "adults", value: guestsAndRooms.adults.toString() },
      { method: "set", key: "children", value: guestsAndRooms.children.toString() },
      { method: "set", key: "roomsCount", value: guestsAndRooms.rooms.toString() },
    ]);
  };

  if (isMobile)
    return (
      <Drawer>
        {children}
        <DrawerContent className="px-3 py-0">
          <DrawerHeader className="px-1">
            <DrawerTitle className="font-medium">Guests and Rooms</DrawerTitle>
          </DrawerHeader>
          <SelectGuestsAndRooms guestsAndRooms={guestsAndRooms} setGuestsAndRooms={setGuestsAndRooms} />
          <DrawerDescription className="mb-2 text-center text-xs font-light">
            if there are more guests. consider adding more rooms
          </DrawerDescription>
          <DrawerFooter className="p-0">
            <DrawerClose onClick={handleApply} className="rounded-md bg-blue-700 py-1 text-gray-200">
              Apply
            </DrawerClose>
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
        <SelectGuestsAndRooms guestsAndRooms={guestsAndRooms} setGuestsAndRooms={setGuestsAndRooms} />
        <DialogDescription>if there are more guests. consider adding more rooms</DialogDescription>
        <DialogFooter className="p-0">
          <DialogClose onClick={handleApply} className="m-2 w-full rounded-md bg-blue-700 py-1 text-gray-200">
            Apply
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
