"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ISearchData } from "./SearchBox";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

function SelectDatesDialog({
  children,
  // searchData,
  // setSearchData,
}: {
  children: React.ReactNode;
  searchData: ISearchData;
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  return (
    <Dialog>
      {children}
      <DialogContent
        aria-describedby={undefined}
        className="h-[350px] w-[90%] max-w-[25rem] overflow-y-auto rounded-lg p-0 scrollbar-none md:scrollbar-thin"
      >
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />

        {/* <Calendar
            mode="range"
            selected={{ from: searchData.checkIn, to: searchData.checkOut }}
            onSelect={(date) => {
              if (Array.isArray(date)) {
                setSearchData((prev) => ({ ...prev, checkIn: date[0], checkOut: date[1] }));
              }
            }}
            className="mx-auto w-fit rounded-md"
          /> */}
      </DialogContent>
    </Dialog>
  );
}

export default SelectDatesDialog;
