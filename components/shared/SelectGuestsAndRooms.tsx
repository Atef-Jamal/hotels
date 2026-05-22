"use client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

interface IProps {
  guestsAndRooms: {
    adults: number;
    children: number;
    rooms: number;
  };
  setGuestsAndRooms: Dispatch<
    SetStateAction<{
      adults: number;
      children: number;
      rooms: number;
    }>
  >;
}

export default function SelectGuestsAndRooms({ guestsAndRooms, setGuestsAndRooms }: IProps) {
  const decreaseAdults = () => {
    setGuestsAndRooms((prev) => ({
      ...prev,
      adults: prev.adults - 1,
    }));
    // updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults - 1).toString() }]);
  };

  const increaseAdults = () => {
    setGuestsAndRooms((prev) => ({
      ...prev,
      adults: prev.adults + 1,
    }));
    // updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults + 1).toString() }]);
  };

  const decreasChildren = () => {
    setGuestsAndRooms((prev) => ({
      ...prev,
      children: prev.children - 1,
    }));
    // updateQueryParams([{ method: "set", key: "children", value: (queryParams.children - 1).toString() }]);
  };
  const increaseChildren = () => {
    setGuestsAndRooms((prev) => ({
      ...prev,
      children: prev.children + 1,
    }));
    // updateQueryParams([{ method: "set", key: "children", value: (queryParams.children + 1).toString() }]);
  };

  const decreaseRoomCount = () => {
    setGuestsAndRooms((prev) => ({
      ...prev,
      rooms: prev.rooms - 1,
    }));
    // updateQueryParams([{ method: "set", key: "roomsCount", value: (queryParams.roomsCount - 1).toString() }]);
  };

  const increaseRoomCount = () => {
    if (guestsAndRooms.adults <= guestsAndRooms.rooms && guestsAndRooms.rooms < 10) {
      setGuestsAndRooms((prev) => ({
        ...prev,
        adults: prev.adults + 1,
        rooms: prev.rooms + 1,
      }));
      // updateQueryParams([
      //   { method: "set", key: "adults", value: (queryParams.adults + 1).toString() },
      //   { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      // ]);
    } else {
      setGuestsAndRooms((prev) => ({
        ...prev,
        rooms: prev.rooms + 1,
      }));
      // updateQueryParams([
      //   { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      // ]);
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
            disabled={guestsAndRooms.adults <= 1}
            onClick={decreaseAdults}
          >
            <MinusCircle size={17} />
          </Button>
          <span> {guestsAndRooms.adults} </span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={guestsAndRooms.adults >= 30}
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
            disabled={guestsAndRooms.children <= 0}
            onClick={decreasChildren}
          >
            <MinusCircle size={17} />
          </Button>
          <span>{guestsAndRooms.children}</span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={guestsAndRooms.children >= 30}
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
            disabled={guestsAndRooms.rooms <= 1}
            onClick={decreaseRoomCount}
          >
            <MinusCircle size={17} />
          </Button>
          <span> {guestsAndRooms.rooms} </span>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            disabled={guestsAndRooms.rooms >= 10}
            onClick={increaseRoomCount}
          >
            <PlusCircle size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}
