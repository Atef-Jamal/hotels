import { useSearchContext } from "@/context/searchProvider";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function SelectGuestsAndRooms({
  adults,
  childrenGuest,
  rooms,
  setAdults,
  setChildrenGuest,
  setRooms,
}: {
  adults: number;
  childrenGuest: number;
  rooms: number;
  setAdults: Dispatch<SetStateAction<number>>;
  setChildrenGuest: Dispatch<SetStateAction<number>>;
  setRooms: Dispatch<SetStateAction<number>>;
}) {
  const { searchData } = useSearchContext();

  const decreaseAdults = () => {
    setAdults((prev) => prev - 1);
  };

  const increaseAdults = () => {
    setAdults((prev) => prev + 1);
  };

  const decreasChildren = () => {
    setChildrenGuest((prev) => prev - 1);
  };
  const increaseChildren = () => {
    setChildrenGuest((prev) => prev + 1);
  };

  const decreaseRoomCount = () => {
    setRooms((prev) => prev - 1);
  };

  const increaseRoomCount = () => {
    if (adults <= rooms && rooms < 10) {
      setAdults((prev) => prev + 1);
      setRooms((prev) => prev + 1);
    } else {
      setRooms((prev) => prev + 1);
    }
  };
  return (
    <div className="my-4 space-y-4 text-sm font-bold text-blue-700">
      <div className="flex items-center justify-between">
        <span>Adults</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={searchData.adults <= 1} onClick={decreaseAdults}>
            <MinusCircle size={17} />
          </button>
          <span> {adults} </span>
          <button disabled={adults >= 30} onClick={increaseAdults}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Children</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={childrenGuest <= 0} onClick={decreasChildren}>
            <MinusCircle size={17} />
          </button>
          <span>{childrenGuest}</span>
          <button disabled={childrenGuest >= 30} onClick={increaseChildren}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Rooms</span>
        <div className="flex w-20 items-center justify-between">
          <button disabled={rooms <= 1} onClick={decreaseRoomCount}>
            <MinusCircle size={17} />
          </button>
          <span> {rooms} </span>
          <button disabled={rooms >= 10} onClick={increaseRoomCount}>
            <PlusCircle size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectGuestsAndRooms;
