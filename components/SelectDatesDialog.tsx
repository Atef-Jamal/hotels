"use client";
import { useSearchContext } from "@/context/searchProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";

function SelectDatesDialog({ children }: { children: React.ReactNode }) {
  const { searchData, setSearchData } = useSearchContext();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchData.checkIn,
    to: searchData.checkOut,
  });

  useEffect(() => {
    if (dateRange?.from && dateRange.to) {
      setSearchData((prev) => ({ ...prev, checkIn: dateRange.from!, checkOut: dateRange.to! }));
    }
  }, [dateRange, setSearchData]);

  return (
    <Dialog>
      {children}
      <DialogContent
        aria-describedby={undefined}
        className="scrollbar-none md:scrollbar-thin h-auto w-[90%] max-w-100 overflow-y-auto rounded-lg p-0"
      >
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>
        <div>
          <Calendar
            className="h-full w-full"
            mode="range"
            defaultMonth={searchData.checkIn}
            selected={{ from: searchData.checkIn, to: searchData.checkOut }}
            onSelect={setDateRange}
            numberOfMonths={1}
            disabled={(date) => date < searchData.checkIn || date < new Date("1900-01-01")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectDatesDialog;
