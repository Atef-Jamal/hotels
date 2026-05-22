import { ArrowDown } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import FilterHotels from "@/components/hotels/FilterHotels";

interface IProps {
  initialSuggestedLocations: string[];
}

export default function FilterDrawer({ initialSuggestedLocations }: IProps) {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center rounded-sm bg-white px-1.5 py-0.75 text-sm text-blue-950">
        Filter
        <ArrowDown size={16} className="ml-1 min-w-fit" />
      </DrawerTrigger>
      <DrawerContent className="px-3 py-0">
        <DrawerHeader className="px-1">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <div className="scrollbar-thin max-h-[60vh] space-y-4 overflow-y-auto text-sm font-normal">
          <FilterHotels initialSuggestedLocations={initialSuggestedLocations} />
        </div>
        <DrawerFooter className="p-0">
          <DrawerClose className="rounded-md bg-blue-700 py-1 text-gray-200">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
