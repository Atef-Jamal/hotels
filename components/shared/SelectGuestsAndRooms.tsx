"use client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SelectGuestsAndRooms() {
  const { queryParams, updateQueryParams } = useQueryParams();

  const decreaseAdults = () => {
    return updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults - 1).toString() }]);
  };

  const increaseAdults = () => {
    return updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults + 1).toString() }]);
  };

  const decreasChildren = () => {
    return updateQueryParams([
      { method: "set", key: "children", value: (queryParams.children - 1).toString() },
    ]);
  };
  const increaseChildren = () => {
    return updateQueryParams([
      { method: "set", key: "children", value: (queryParams.children + 1).toString() },
    ]);
  };

  const decreaseRoomCount = () => {
    return updateQueryParams([
      { method: "set", key: "roomsCount", value: (queryParams.roomsCount - 1).toString() },
    ]);
  };

  const increaseRoomCount = () => {
    if (queryParams.adults <= queryParams.roomsCount && queryParams.roomsCount < 10) {
      return updateQueryParams([
        { method: "set", key: "adults", value: (queryParams.adults + 1).toString() },
        { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      ]);
    } else {
      return updateQueryParams([
        { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      ]);
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
