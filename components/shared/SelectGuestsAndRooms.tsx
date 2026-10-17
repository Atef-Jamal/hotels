"use client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/appContext";

export default function SelectGuestsAndRooms() {
  const { queryParams, setQueryParams } = useAppContext();

  const decreaseAdults = () => {
    setQueryParams((prev) => ({
      ...prev,
      adults: prev.adults - 1,
    }));
  };

  const increaseAdults = () => {
    setQueryParams((prev) => ({
      ...prev,
      adults: prev.adults + 1,
    }));
  };

  const decreasChildren = () => {
    setQueryParams((prev) => ({
      ...prev,
      children: prev.children - 1,
    }));
  };
  const increaseChildren = () => {
    setQueryParams((prev) => ({
      ...prev,
      children: prev.children + 1,
    }));
  };

  const decreaseRoomCount = () => {
    setQueryParams((prev) => ({
      ...prev,
      roomsCount: prev.roomsCount - 1,
    }));
  };

  const increaseRoomCount = () => {
    if (queryParams.adults <= queryParams.roomsCount && queryParams.roomsCount < 10) {
      setQueryParams((prev) => ({
        ...prev,
        adults: prev.adults + 1,
        roomsCount: prev.roomsCount + 1,
      }));
    } else {
      setQueryParams((prev) => ({
        ...prev,
        roomsCount: prev.roomsCount + 1,
      }));
    }
  };
  return (
    <div className="my-4 space-y-4 text-sm font-bold text-blue-700">
      <div className="flex items-center justify-between">
        <span>Adults</span>
        <div className="flex w-20 items-center justify-between">
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.adults <= 1}
            onClick={decreaseAdults}
          >
            <MinusCircle size={17} />
          </Button>
          <span> {queryParams.adults} </span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.adults >= 30}
            onClick={increaseAdults}
          >
            <PlusCircle size={17} />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Children</span>
        <div className="flex w-20 items-center justify-between">
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.children <= 0}
            onClick={decreasChildren}
          >
            <MinusCircle size={17} />
          </Button>
          <span>{queryParams.children}</span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.children >= 30}
            onClick={increaseChildren}
          >
            <PlusCircle size={17} />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Rooms</span>
        <div className="flex w-20 items-center justify-between">
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.roomsCount <= 1}
            onClick={decreaseRoomCount}
          >
            <MinusCircle size={17} />
          </Button>
          <span> {queryParams.roomsCount} </span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={queryParams.roomsCount >= 10}
            onClick={increaseRoomCount}
          >
            <PlusCircle size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}
