import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { ArrowDown, ArrowDownWideNarrow, CheckIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

function ResponsiveSortHotels() {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="flex items-center justify-center rounded-sm bg-white px-[6px] py-[3px] text-[13px] font-medium text-blue-950 md:hidden">
            Sort
            <ArrowDown size={16} className="ml-1 min-w-fit" />
          </div>
        </DrawerTrigger>
        <DrawerContent aria-describedby={undefined} className="px-3 py-0">
          <DrawerHeader className="px-1">
            <DrawerTitle className="mr-auto font-bold">Sort</DrawerTitle>
          </DrawerHeader>
          <div className="">
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Hotels.com Recommended</p>
            </DrawerClose>
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Distance ( Near to Far )</p>
            </DrawerClose>
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide text-blue-700">Top Reviewed</p>
              <CheckIcon color="#1d4ed8" />
            </DrawerClose>
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Lowest Price</p>
            </DrawerClose>
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Highest Price</p>
            </DrawerClose>
            <DrawerClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Star Rating ( High to Low )</p>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
      <Dialog>
        <DialogTrigger>
          <div className="hidden items-center justify-center rounded-sm bg-white px-4 py-2 md:flex">
            <ArrowDownWideNarrow size={18} />
            <span className="font-medium text-blue-700">Sort</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="px-1">
            <DialogTitle className="mr-auto font-bold">Sort</DialogTitle>
          </DialogHeader>
          <div className="">
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Hotels.com Recommended</p>
            </DialogClose>
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Distance ( Near to Far )</p>
            </DialogClose>
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide text-blue-700">Top Reviewed</p>
              <CheckIcon color="#1d4ed8" />
            </DialogClose>
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Lowest Price</p>
            </DialogClose>
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Highest Price</p>
            </DialogClose>
            <DialogClose className="flex w-full items-center justify-between border-b py-3">
              <p className="text-sm tracking-wide">Star Rating ( High to Low )</p>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResponsiveSortHotels;
