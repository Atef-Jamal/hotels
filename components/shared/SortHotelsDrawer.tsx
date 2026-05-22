"use client";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { ArrowDown, CheckIcon } from "lucide-react";
import { ISortType } from "@/types";
import { Button } from "../ui/button";
import { sortOptions } from "@/constants/constants";

export default function SortHotelsDrawer() {
  const { queryParams, updateQueryParams } = useQueryParams();

  const updateSort = (sortValue: ISortType) => {
    return updateQueryParams([{ method: "set", key: "sort", value: sortValue }]);
  };

  const handleReset = () => {
    return updateQueryParams([{ method: "delete", key: "sort" }]);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex items-center justify-center rounded-sm bg-white px-1.5 py-0.75 text-sm font-medium text-blue-950 md:hidden">
          sort
          <ArrowDown size={16} className="ml-1 min-w-fit" />
        </div>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className="px-3 py-0">
        <DrawerHeader className="flex items-center justify-between px-1">
          <DrawerTitle className="mr-auto font-bold">Sort</DrawerTitle>
          <Button onClick={handleReset} variant={"outline"} className={"text-blue-700"}>
            Reset
          </Button>
        </DrawerHeader>
        <div>
          {sortOptions.map((item) => (
            <DrawerClose
              key={item.value}
              onClick={() => updateSort(item.value)}
              className="flex w-full items-center justify-between border-b py-3"
            >
              <p className="text-sm tracking-wide"> {item.label}</p>
              {queryParams.sort === item.value && <CheckIcon size={20} color="#1d4ed8" />}
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
