import testImage from "@/public/gamePhoto-43.jpg";
import Image from "next/image";
import { BedDoubleIcon, BedIcon, SquareCheckBig, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/ImageSlider";
import { MdBathroom, MdOutlineBed, MdOutlineKingBed } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import MenuBarHotelDetailsPage from "@/components/MenuBarHotelDetailsPage";
import Link from "next/link";
import NearbyAttractionSection from "@/components/NearbyAttractionSection";
import SearchBox from "@/components/SearchBox";
// import { getHotelDetails } from "@/actions/actions";

interface IProps {
  params: { hotelName: string };
  searchParams: Record<string, string | string[]>;
}

const HotelDetailsPage = async ({ params, searchParams }: IProps) => {
  const hotel = await getHotelDetails({ params, searchParams });

  return (
    <div className="flex flex-col gap-2">
      <div className="mx-2 mb-4 hidden transition-all md:block">
        <SearchBox />
      </div>

      <div className="relative md:hidden">
        <ImageSlider images={hotel.images} />
      </div>
      <div className="mx-2 space-y-2 rounded-lg bg-white py-3">
        <div className="flex items-center justify-between gap-x-2 px-3">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 truncate">
              <h1 className="text-lg font-extrabold tracking-wide md:text-xl">{hotel.name}</h1>
              <div className="flex items-center justify-center gap-x-1">
                <Star size={13} className="text-[#f75858]" />
                <Star size={13} className="text-[#f75858]" />
                <Star size={13} className="text-[#f75858]" />
                <Star size={13} className="text-[#f75858]" />
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm leading-4">
              5.4 Kilometer from Metro station. approximatily 30 min by car
            </p>
          </div>
          <Button className="hidden md:block">Select Room</Button>
        </div>
        <div className="hidden grid-cols-5 grid-rows-2 gap-1 px-2 md:grid">
          <Image
            priority={true}
            src={hotel.images[0]}
            width={300}
            height={200}
            alt=""
            className="col-span-2 row-span-2 h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[1]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[2]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[3]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[4]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[5]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
          <Image
            src={hotel.images[6]}
            priority={true}
            width={200}
            height={200}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
        </div>
      </div>
      <div className="mx-2">
        <MenuBarHotelDetailsPage />
        <div id="overview" className="mb-6 space-y-4 rounded-b-md bg-white p-2 md:p-4">
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Amenities</h1>
            <div className="grid grid-cols-2 gap-2 overflow-hidden text-sm font-thin sm:grid-cols-3 md:grid-cols-4 md:text-base lg:grid-cols-5">
              {hotel.amenities.map((amenity, indx) => (
                <div key={indx} className="flex items-center gap-1">
                  <SquareCheckBig size={15} />
                  <span className="text-nowrap">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Property Description</h1>
            <p className="text-sm font-thin md:text-base">{hotel.description}</p>
          </div>
        </div>
        <div id="rooms" className="mb-6 space-y-4 overflow-hidden rounded-md bg-white">
          <h1 className="bg-slate-100 p-2 text-lg font-extrabold">Rooms</h1>
          {hotel.rooms.slice(0, 3).map((room) => (
            <>
              <div key={room._id} className="flex flex-col gap-4 px-2 md:flex-row md:px-4">
                <div className="relative h-36 w-full md:h-64 md:w-92">
                  <Image src={room.images[0]} alt="test" className="h-full w-full" width={200} height={200} />
                  <div className="absolute bottom-0 flex w-full items-center justify-center gap-2 bg-black/10 py-2 backdrop-blur-lg">
                    {room.images.slice(1).map((img, indx) => (
                      <Image
                        key={indx}
                        src={img}
                        alt=""
                        width={80}
                        height={80}
                        className="h-7.5 w-13.75 rounded-md border border-white object-fill md:h-10 md:w-18.75"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h1 className="text-xl font-medium">{room.type}</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {room.beds.map((bed, indx) => (
                      <div key={indx} className="my-1 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(bed.count).keys()].map((num) => {
                            if (bed.type === "Single") return <BedIcon key={num} size={17} />;
                            if (bed.type === "Double") return <BedDoubleIcon key={num} size={17} />;
                            if (bed.type === "Twin") return <BedDoubleIcon key={num} size={17} />;
                            if (bed.type === "Queen") return <MdOutlineBed key={num} size={17} />;
                            if (bed.type === "King") return <MdOutlineKingBed key={num} size={17} />;
                          })}
                        </div>
                        <span>
                          {bed.count} {bed.type} Beds
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-1 gap-y-1 font-thin text-black/80 sm:grid-cols-3 md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 xl:grid-cols-4">
                    {room.roomServices.slice(0, 10).map((service, indx) => (
                      <div key={indx} className="flex items-center gap-1 md:gap-2">
                        <MdBathroom size={15} />
                        <span className="text-sm md:text-base">{service}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between md:mt-auto">
                    <Button variant={"link"} size={"sm"}>
                      Room Details
                    </Button>
                    <Button size={"sm"} className="px-8">
                      <Link href={`${params.hotelName}/${room._id}/info`}>Reserve</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <Separator orientation="horizontal" />
            </>
          ))}
        </div>
        <div id="nearby-attractions" className="mb-6 overflow-hidden rounded-md bg-white">
          <h1 className="bg-slate-100 p-2 text-lg font-extrabold">Nearby Attractions</h1>
          <NearbyAttractionSection attractions={hotel.nearbyAttractions} />
        </div>
        <div id="reviews" className="mb-6 space-y-2 overflow-hidden rounded-md bg-white">
          <div className="flex items-center justify-between bg-slate-100 p-2">
            <h1 className="text-lg font-extrabold">Reviews</h1>
            <span className="text-sm font-bold text-blue-800">122 reviews</span>
          </div>
          <div className="bg-white">
            <div className="flex items-center justify-between p-1 sm:px-2 md:px-4">
              <div className="flex flex-col items-center justify-center gap-y-1">
                <span className="text-4xl font-extrabold text-blue-800">3.7</span>
                <p className="text-xs font-bold text-blue-800">Hotels.com</p>
                <p className="px-1 text-center text-xs font-medium">Comprehensive Rating</p>
              </div>
              <div className="grid w-2/3 grid-cols-1 gap-x-4 sm:grid-cols-2 lg:gap-x-8">
                <div className="">
                  <p className="text-sm font-medium">Cleanliness</p>
                  <div className="-mt-1 flex items-center justify-center gap-x-2 font-bold">
                    <div className="h-1.25 w-full overflow-hidden rounded-lg bg-slate-300">
                      <div className="h-full w-[80%] bg-blue-900"></div>
                    </div>
                    3.8
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-medium">Amentities</p>
                  <div className="-mt-1 flex items-center justify-center gap-x-2 font-bold">
                    <div className="h-1.25 w-full overflow-hidden rounded-lg bg-slate-300">
                      <div className="h-full w-[80%] bg-blue-900"></div>
                    </div>
                    3.8
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-medium">Location</p>
                  <div className="-mt-1 flex items-center justify-center gap-x-2 font-bold">
                    <div className="h-1.25 w-full overflow-hidden rounded-lg bg-slate-300">
                      <div className="h-full w-[80%] bg-blue-900"></div>
                    </div>
                    3.8
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-medium">Service</p>
                  <div className="-mt-1 flex items-center justify-center gap-x-2 font-bold">
                    <div className="h-1.25 w-full overflow-hidden rounded-lg bg-slate-300">
                      <div className="h-full w-[80%] bg-blue-900"></div>
                    </div>
                    3.8
                  </div>
                </div>
              </div>
            </div>
            <div className="scrollbar-none flex items-center gap-x-2 overflow-x-auto p-3 whitespace-nowrap">
              {hotel.reviews.map((review) => (
                <div key={review._id} className="min-w-64 rounded-md border border-zinc-500/55 p-3">
                  <div className="mb-2 flex items-center gap-x-3">
                    <Image
                      src={
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1752736510~exp=1752740110~hmac=0760cd27a6757f8b79ee0046a4390686f24992cdf9b6afd062123ec84f12ac92&w=996"
                      }
                      priority={true}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-bold">Anonymous</p>
                    <span className="ml-auto rounded-s-lg rounded-b-lg bg-blue-900 px-1 py-0.5 text-xs font-medium text-white">
                      4.2 / 5
                    </span>
                  </div>
                  <p className="text-muted-foreground h-24 truncate text-sm font-medium whitespace-normal">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="hotels-nearby" className="mb-6 space-y-1 overflow-hidden rounded-lg bg-white">
          <h1 className="bg-slate-100 p-2 text-lg font-extrabold">Hotels Nearby</h1>
          <div className="scrollbar-none space-x-2 overflow-auto py-2 pl-3 whitespace-nowrap md:space-x-4">
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>

            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
            <div className="inline-block w-48 overflow-hidden rounded-md bg-[#c9c3c35d]">
              <Image src={testImage} priority={true} alt="" className="h-32 object-cover" />
              <div className="space-y-1 p-2">
                <h1 className="truncate text-sm font-bold">Atura Blacktwon, an EVA Hotel</h1>
                <div className="flex items-center gap-x-1">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <p className="text-muted-foreground h-20 truncate text-xs whitespace-normal">
                  25 km from your search (distance) 25 km from your search (distance) 25 km from your search
                  (distance) 25 km from your search (distance) 25 km from your search (distance) 25 km from
                  your search (distance) 25 km from your search (distance) 25 km from your search (distance)
                  25 km from your search (distance) 25 km from your search (distance)
                </p>
                <span className="pl-[60%]">
                  US$ <span className="text-lg font-extrabold text-blue-800">100</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="policies" className="mb-6 space-y-2 overflow-hidden rounded-md bg-white">
          <h1 className="bg-slate-100 p-2 text-lg font-extrabold">Hotel Policy</h1>
          <div className="px-4 py-2">
            <p className="text-sm font-bold">Check-in and Check-out Times</p>
            <div className="flex items-center justify-between bg-slate-100 p-2 text-sm">
              <p className="text-sm">Check-in: After 14:00</p>
              <p className="text-sm">Check-out: Before 12:00</p>
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-sm font-bold sm:mb-4">Policies</p>
                <ul className="list-disc pl-5">
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold sm:mb-4">Policies</p>
                <ul className="list-disc pl-5">
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold sm:mb-4">Policies</p>
                <ul className="list-disc pl-5">
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                  <li className="font-bold">nice ti have a points here</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
