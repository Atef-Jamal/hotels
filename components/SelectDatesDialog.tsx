"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Calendar as CalenderDates } from "@/components/ui/calendar";
import { updateURLSearchParams } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSearchParams, useRouter } from "next/navigation";

function SelectDatesDialog({
  children,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}: {
  children: React.ReactNode;
  checkIn: string;
  checkOut: string;
  setCheckIn: React.Dispatch<React.SetStateAction<string>>;
  setCheckOut: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

        <div>
          <CalenderDates
            mode="range"
            selected={{
              from: new Date(checkIn),
              to: new Date(checkOut),
            }}
            onSelect={(value) => {
              if (value?.from && value?.to) {
                const checkInDate = value.from.toISOString().split("T")[0];
                const checkOutDate = value.to.toISOString().split("T")[0];

                setCheckIn(checkInDate);
                setCheckOut(checkOutDate);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "checkIn", value: checkInDate },
                  { actionType: "set", key: "checkOut", value: checkOutDate },
                ]);
                router.push(`?${newParams}`);
              }
            }}
            className="mx-auto w-fit rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectDatesDialog;
