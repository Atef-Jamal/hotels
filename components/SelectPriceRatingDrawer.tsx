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
import FilterHotels from "./FilterHotels";

function SelectPriceRatingDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      {children}
      <DrawerContent className="px-3 py-0">
        <DrawerHeader className="px-1">
          <DrawerTitle className="mr-auto font-medium">Budget</DrawerTitle>
          <DrawerDescription className="mr-auto text-center text-sm font-light">
            price per night, Bed Type, Room Services ect
          </DrawerDescription>
        </DrawerHeader>
        <div className="scrollbar-thin max-h-[60vh] space-y-4 overflow-y-auto text-sm font-normal">
          <FilterHotels />
        </div>
        <DrawerFooter className="p-0">
          <DrawerClose onClick={() => {}} className="rounded-md bg-blue-700 py-1 text-gray-200">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SelectPriceRatingDrawer;
