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
import { useSearchContext } from "@/context/searchProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import SelectGuestsAndRooms from "./SelectGuestsAndRooms";
import { User } from "lucide-react";
import { useState } from "react";

function ResponsiveSelectGuestsRooms({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { searchData, setSearchData } = useSearchContext();

  const [adults, setAdults] = useState(searchData.adults);
  const [childrenGuest, setChildrenGuest] = useState(searchData.children);
  const [rooms, setRooms] = useState(searchData.roomsCount);

  const apply = () => {
    setSearchData((prev) => ({ ...prev, adults, roomsCount: rooms, children: childrenGuest }));
  };

  if (isMobile)
    return (
      <Drawer>
        {children}
        <DrawerContent className="px-3 py-0">
          <DrawerHeader className="px-1">
            <DrawerTitle className="font-medium">Guests and Rooms</DrawerTitle>
          </DrawerHeader>
          <SelectGuestsAndRooms
            adults={adults}
            setAdults={setAdults}
            childrenGuest={childrenGuest}
            setChildrenGuest={setChildrenGuest}
            rooms={rooms}
            setRooms={setRooms}
          />
          <DrawerDescription className="mb-2 text-center text-xs font-light">
            if there are more guests. consider adding more rooms
          </DrawerDescription>
          <DrawerFooter className="p-0">
            <DrawerClose onClick={apply} className="rounded-md bg-blue-700 py-1 text-gray-200">
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
          {searchData.roomsCount} Room, {searchData.adults} Adults, {searchData.children} Children
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <SelectGuestsAndRooms
          adults={adults}
          setAdults={setAdults}
          childrenGuest={childrenGuest}
          setChildrenGuest={setChildrenGuest}
          rooms={rooms}
          setRooms={setRooms}
        />
        <DialogDescription className="text-center text-sm font-medium">
          if there are more guests. consider adding more rooms
        </DialogDescription>
        <DialogFooter className="p-0">
          <DialogClose onClick={apply} className="w-full rounded-md bg-blue-700 py-1 text-gray-200">
            Apply
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResponsiveSelectGuestsRooms;
