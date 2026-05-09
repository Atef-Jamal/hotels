import { useQueryParams } from "@/hooks/useQueryParams";
import { MinusCircle, PlusCircle } from "lucide-react";

function SelectGuestsAndRooms() {
  const { queryParams, updateQueryParams } = useQueryParams();

  const decreaseAdults = () => {
    updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults - 1).toString() }]);
  };

  const increaseAdults = () => {
    updateQueryParams([{ method: "set", key: "adults", value: (queryParams.adults + 1).toString() }]);
  };

  const decreasChildren = () => {
    updateQueryParams([{ method: "set", key: "children", value: (queryParams.children - 1).toString() }]);
  };
  const increaseChildren = () => {
    updateQueryParams([{ method: "set", key: "children", value: (queryParams.children + 1).toString() }]);
  };

  const decreaseRoomCount = () => {
    updateQueryParams([{ method: "set", key: "roomsCount", value: (queryParams.roomsCount - 1).toString() }]);
  };

  const increaseRoomCount = () => {
    if (queryParams.adults <= queryParams.roomsCount && queryParams.roomsCount < 10) {
      updateQueryParams([
        { method: "set", key: "adults", value: (queryParams.adults + 1).toString() },
        { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      ]);
    } else {
      updateQueryParams([
        { method: "set", key: "roomsCount", value: (queryParams.roomsCount + 1).toString() },
      ]);
    }
  };
  return (
    <div className="my-4 space-y-4 text-sm font-bold text-blue-700">
      <div className="flex items-center justify-between">
        <span>Adults</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={queryParams.adults <= 1} onClick={decreaseAdults}>
            <MinusCircle size={17} />
          </button>
          <span> {queryParams.adults} </span>
          <button disabled={queryParams.adults >= 30} onClick={increaseAdults}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Children</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={queryParams.children <= 0} onClick={decreasChildren}>
            <MinusCircle size={17} />
          </button>
          <span>{queryParams.children}</span>
          <button disabled={queryParams.children >= 30} onClick={increaseChildren}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Rooms</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={queryParams.roomsCount <= 1} onClick={decreaseRoomCount}>
            <MinusCircle size={17} />
          </button>
          <span> {queryParams.roomsCount} </span>
          <button disabled={queryParams.roomsCount >= 10} onClick={increaseRoomCount}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectGuestsAndRooms;
