"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { MinusCircle, PlusCircle, User } from "lucide-react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { updateURLSearchParams } from "@/lib/utils";

function ResponsiveSelectGuestsRooms() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 1);
  const [children, setChildren] = useState(Number(searchParams.get("children")) || 0);
  const [roomsCount, setRoomsCount] = useState(Number(searchParams.get("roomsCount")) || 1);

  const decreaseAdults = () => {
    setAdults((prev) => prev - 1);
    const newParams = updateURLSearchParams(searchParams, [
      { actionType: "set", key: "adults", value: (adults - 1).toString() },
    ]);
    router.push(`?${newParams}`);
  };

  const increaseAdults = () => {
    setAdults((prev) => prev + 1);
    const newParams = updateURLSearchParams(searchParams, [
      { actionType: "set", key: "adults", value: (adults + 1).toString() },
    ]);
    router.push(`?${newParams}`);
  };

  const decreasChildren = () => {
    setChildren((prev) => prev - 1);
    const newParams = updateURLSearchParams(searchParams, [
      { actionType: "set", key: "children", value: (children - 1).toString() },
    ]);
    router.push(`?${newParams}`);
  };
  const increaseChildren = () => {
    setChildren((prev) => prev + 1);
    const newParams = updateURLSearchParams(searchParams, [
      { actionType: "set", key: "children", value: (children + 1).toString() },
    ]);
    router.push(`?${newParams}`);
  };

  const decreaseRoomCount = () => {
    setRoomsCount((prev) => prev - 1);
    const newParams = updateURLSearchParams(searchParams, [
      { actionType: "set", key: "roomsCount", value: (roomsCount - 1).toString() },
    ]);
    router.push(`?${newParams}`);
  };
  const increaseRoomCount = () => {
    let newParams;
    if (adults <= roomsCount && roomsCount < 10) {
      newParams = updateURLSearchParams(searchParams, [
        { actionType: "set", key: "adults", value: (roomsCount + 1).toString() },
        { actionType: "set", key: "roomsCount", value: (roomsCount + 1).toString() },
      ]);
    } else {
      newParams = updateURLSearchParams(searchParams, [
        { actionType: "set", key: "roomsCount", value: (roomsCount + 1).toString() },
      ]);
      setRoomsCount((prev) => prev + 1);
    }
    router.push(`?${newParams}`);
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger className="flex w-full items-center gap-x-2 truncate rounded-sm border p-2 md:hidden">
          <User size={16} />
          <span>
            {roomsCount} Room, {adults} Adults, {children} Children
          </span>
        </DrawerTrigger>
        <DrawerContent className="px-3 py-0">
          <DrawerHeader className="px-1">
            <DrawerTitle className="font-medium">Guests and Rooms</DrawerTitle>
          </DrawerHeader>
          <div className="my-4 space-y-4 text-sm font-[400]">
            <div className="flex items-center justify-between">
              <span>Adults</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={adults <= 1} onClick={decreaseAdults}>
                  <MinusCircle size={17} />
                </button>
                <span> {adults} </span>
                <button disabled={adults >= 30} onClick={increaseAdults}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Children</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={children <= 0} onClick={decreasChildren}>
                  <MinusCircle size={17} />
                </button>
                <span>{children}</span>
                <button disabled={children >= 30} onClick={increaseChildren}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Rooms</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={roomsCount <= 1} onClick={decreaseRoomCount}>
                  <MinusCircle size={17} />
                </button>
                <span> {roomsCount} </span>
                <button disabled={roomsCount >= 10} onClick={increaseRoomCount}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
          </div>
          <DrawerDescription className="mb-2 text-center text-xs font-[300]">
            if there are more guests. consider adding more rooms
          </DrawerDescription>
          <DrawerFooter className="p-0">
            <DrawerClose className="rounded-md bg-blue-700 py-1 text-gray-200">Apply</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Dialog>
        <DialogTrigger className="hidden items-center gap-x-2 truncate rounded-sm border p-2 md:flex">
          <User size={16} />
          <span>
            {roomsCount} Room, {adults} Adults, {children} Children
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="my-4 space-y-4 font-semibold">
            <div className="flex items-center justify-between">
              <span>Adults</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={adults <= 1} onClick={decreaseAdults}>
                  <MinusCircle size={17} />
                </button>
                <span> {adults} </span>
                <button disabled={adults >= 30} onClick={increaseAdults}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Children</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={children <= 0} onClick={decreasChildren}>
                  <MinusCircle size={17} />
                </button>
                <span>{children}</span>
                <button disabled={children >= 30} onClick={increaseChildren}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Rooms</span>
              <div className="flex w-[80px] items-center justify-between">
                <button disabled={roomsCount <= 1} onClick={decreaseRoomCount}>
                  <MinusCircle size={17} />
                </button>
                <span> {roomsCount} </span>
                <button disabled={roomsCount >= 10} onClick={increaseRoomCount}>
                  <PlusCircle size={17} />
                </button>
              </div>
            </div>
          </div>
          <DialogDescription className="text-center text-sm font-medium">
            if there are more guests. consider adding more rooms
          </DialogDescription>
          <DialogFooter className="p-0">
            <DialogClose className="w-full rounded-md bg-blue-700 py-1 text-gray-200">Apply</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResponsiveSelectGuestsRooms;
