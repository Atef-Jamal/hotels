import Image from "next/image";
import gamePhoto from "@/public/gamePhoto-43.jpg";

export const HotelSliderCard = () => {
  return (
    <div className="inline-block w-[210px] h-[250px] rounded-sm overflow-hidden">
      <Image src={gamePhoto} alt="" className="w-full h-[45%] object-cover" />
      <div className="bg-[#fcdfdf] h-[55%] px-2 py-1">
        <h1 className="sm:text-lg font-medium sm:font-[600] truncate">
          Asia international Hotel
        </h1>
        <p className="whitespace-normal mb-2 h-10 leading-4 text-[13px] font-medium text-muted-foreground flex-1 border-white border-b">
          {"This is the Hotel Description as you might say what is it i told Hotel Dksjdh sdkjhjkdh s".slice(
            0,
            70
          ) + "..."}
        </p>
        <p className="whitespace-normal h-10 leading-4 text-[13px] font-medium text-muted-foreground flex-1">
          {"This is the Hotel Description as you might say what is it i told Hotel Dksjdh sdkjhjkdh s".slice(
            0,
            70
          ) + "..."}
        </p>
      </div>
    </div>
  );
};

export default HotelSliderCard;
