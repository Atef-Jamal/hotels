"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useQueryParams } from "@/hooks/useQueryParams";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function SelectDatesDialog({ children }: { children: React.ReactNode }) {
  const { queryParams, updateQueryParams } = useQueryParams();

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
            selected={{ from: queryParams.checkIn, to: queryParams.checkOut }}
            onSelect={(dateRange) => {
              if (dateRange?.from && dateRange.to) {
                return updateQueryParams([
                  { method: "set", key: "checkIn", value: dateRange.from.toLocaleDateString("en-CA") },
                  { method: "set", key: "checkOut", value: dateRange.to.toLocaleDateString("en-CA") },
                ]);
              }
            }}
            numberOfMonths={1}
            // disabled={(date) => {
            //   return date < queryParams.checkIn;
            // }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
