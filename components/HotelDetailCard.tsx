import Image from "next/image";
import testImage from "@/public/gamePhoto-43.jpg";

const HotelDetailCard = () => {
  return (
    <div className="flex items-center justify-center rounded-md overflow-hidden bg-[#fff] h-[190px]">
      <Image
        src={testImage}
        alt=""
        className="w-[7.5rem] h-full object-cover"
      />
      <div className="flex-1 h-full p-2 sm:p-3 space-y-1">
        <h1 className="font-bold leading-4 truncate">
          Ramda Blaza by Dubai Derie
        </h1>
        <div className="flex gap-x-1">
          <span className="rounded-s-lg rounded-b-lg bg-blue-900 text-white text-[13px] font-medium p-[3px]">
            4.2/5
          </span>
          <p className="text-sm font-medium">Very good | 142 Review</p>
        </div>
        <p className="text-[13px] sm:text-sm font-medium text-muted-foreground leading-4">
          {"some words about this hotel might be beneficial so give some words please and taht it djh skjh sdjhgse zlk".slice(
            0,
            80
          )}
        </p>
        <p className="text-[13px] sm:text-sm font-medium text-muted-foreground">
          Saved by 1,698 people
        </p>
        <div>
          <p className="text-xl font-bold text-blue-800 text-end ">
            <span className="text-xs font-bold">US$</span>30
          </p>
          <p className="text-sm font-medium text-muted-foreground text-end -mt-1">
            Total (include Txes): 35
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailCard;
