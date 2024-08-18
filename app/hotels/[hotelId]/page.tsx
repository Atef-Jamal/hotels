import React from "react";
import testImage from "@/public/gamePhoto-43.jpg";
import Image from "next/image";
import {
  AlarmSmokeIcon,
  ArrowBigLeft,
  ArrowBigRight,
  BedDouble,
  CheckCircleIcon,
  CheckIcon,
  PlaneIcon,
  Space,
  Star,
  TrainFrontIcon,
  User,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MenuBarHotelsPage from "@/components/MenuBarHotelsPage";

const HotelDetailsPage = () => {
  return (
    <section className="bg-slate-200">
      <div className="h-44 relative">
        <Image src={testImage} alt="" className="h-full" />
        <span className="absolute top-1 right-1 rounded-sm px-2 text-white text-sm bg-[#0e020263]">
          1 / 40
        </span>
        <button className="py-1 px-3 absolute left-0 top-[30%] bg-[#14040448] rounded-e-sm">
          <ArrowBigLeft color="white" />
        </button>
        <button className="py-1 px-3 absolute right-0 top-[30%] bg-[#14040448] rounded-s-sm">
          <ArrowBigRight color="white" />
        </button>
        <div className="absolute bottom-0 w-full shadow-custom-shadow2"></div>
      </div>
      <MenuBarHotelsPage />
      <div
        id={"hotel-detail-page-overview-section"}
        className="mx-3 pb-3 space-y-2 rounded-es-lg rounded-ee-lg bg-white relative mb-2 "
      >
        <div className="flex items-center justify-between px-3">
          <h1 className="font-bold tracking-wide truncate">
            Mercur Sydny Backtwoen
          </h1>
          <div className="flex items-center justify-center gap-x-1">
            <Star size={13} className="text-[#f75858]" />
            <Star size={13} className="text-[#f75858]" />
            <Star size={13} className="text-[#f75858]" />
            <Star size={13} className="text-[#f75858]" />
          </div>
        </div>
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-x-2">
            <span className="rounded-s-lg rounded-b-lg bg-blue-900 text-white text-[12px] font-medium px-[3px] py-[2px]">
              4.2/5
            </span>
            <p className="text-muted-foreground text-xs font-bold">
              142 Review
            </p>
          </div>
          <ArrowBigRight size={15} />
        </div>
        <p className="text-sm text-muted-foreground leading-4 px-3">
          5.4 Kilometer from Metro station. approximatily 30 min by car
        </p>
      </div>
      <div className="mx-3 p-3 space-y-2 rounded-lg bg-white flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center justify-center gap-x-4">
            <span className="flex items-center justify-center gap-x-1">
              <CheckCircleIcon size={13} />{" "}
              <span className="text-sm text-muted-foreground">
                Free Parking
              </span>
            </span>
            <span className="flex items-center justify-center gap-x-1">
              <CheckCircleIcon size={13} />{" "}
              <span className="text-sm text-muted-foreground">
                Free Parking
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <span className="flex items-center justify-center gap-x-1">
              <CheckCircleIcon size={13} />{" "}
              <span className="text-sm text-muted-foreground">
                Free Parking
              </span>
            </span>
            <span className="flex items-center justify-center gap-x-1">
              <CheckCircleIcon size={13} />{" "}
              <span className="text-sm text-muted-foreground">
                Free Parking
              </span>
            </span>
          </div>
        </div>
        <ArrowBigRight size={15} />
      </div>
      <div className="mx-3 p-3 space-y-2 rounded-lg bg-white mb-2">
        <div className="flex items-center justify-center border-b pb-2">
          <div className="w-[60%]">
            <p className="text-sm font-bold text-muted-foreground">
              Ckeck-In & Ckeck-out
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-muted-foreground">
                Aug 15 - Aug 17
              </p>
              <Badge variant={"secondary"} className="">
                1 Night
              </Badge>
            </div>
          </div>
          <div className="w-[40%] ml-1 pl-1 border-l">
            <p className="text-sm font-bold text-muted-foreground text-center">
              Rooms & Guests
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-x-1">
                <User size={15} /> 1
              </div>
              <div className="flex items-center justify-center gap-x-1">
                <User size={15} /> 2
              </div>
              <div className="flex items-center justify-center gap-x-1">
                <User size={15} /> 0
              </div>
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap space-x-2 overflow-auto scrollbar-none">
          <span className="inline-block py-1 px-3 bg-[#bdbbbb6b] text-xs">
            Breackfast Included
          </span>
          <span className="inline-block py-1 px-3 bg-[#bdbbbb6b] text-xs">
            1 King Bed
          </span>
          <span className="inline-block py-1 px-3 bg-[#bdbbbb6b] text-xs">
            1 King Bed
          </span>
          <span className="inline-block py-1 px-3 bg-[#bdbbbb6b] text-xs">
            1 King Bed
          </span>
          <span className="inline-block py-1 px-3 bg-[#bdbbbb6b] text-xs">
            1 King Bed
          </span>
        </div>
      </div>
      <div
        id={"hotel-detail-page-rooms-section"}
        className="mx-3 p-3 space-y-2 rounded-lg bg-white flex items-center justify-between mb-2"
      >
        <div className="w-28 h-[7.5rem] rounded-sm overflow-hidden border">
          <Image
            src={testImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pl-2 pr-1 flex-1 mb-2">
          <div className="flex items-center justify-between ">
            <h1 className="font-bold text-sm">Standard Twin Room</h1>
            <ArrowBigRight size={15} />
          </div>
          <div className="flex items-center gap-x-2">
            <BedDouble size={15} />
            <p className="text-sm text-muted-foreground">2 Single Beds</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
              <AlarmSmokeIcon size={15} /> Non-Smoking
            </div>
            <div className="flex items-center justify-center gap-x-1 text-sm text-muted-foreground">
              <Wifi size={18} />
              Free Wi-Fi
            </div>
          </div>
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <Space /> 22 - 25m
          </div>

          <span className="text-xs float-right">
            US${" "}
            <span className="text-lg font-extrabold text-blue-800">100</span>
          </span>
        </div>
      </div>
      <div
        id={"hotel-detail-page-hotels-nearby-section"}
        className="mx-3 py-3 pl-3 space-y-1 rounded-lg bg-white mb-2"
      >
        <h1 className="text-lg font-extrabold">Hotels Nearby</h1>
        <div className="whitespace-nowrap space-x-2 py-2 overflow-auto scrollbar-none">
          <div className="inline-block w-48 bg-[#c9c3c35d] rounded-md overflow-hidden">
            <Image src={testImage} alt="" className="object-cover h-32" />
            <div className="p-2 space-y-1">
              <h1 className="font-bold text-sm truncate">
                Atura Blacktwon, an EVA Hotel
              </h1>
              <div className="flex items-center  gap-x-1">
                <Star size={15} />
                <Star size={15} />
                <Star size={15} />
                <Star size={15} />
              </div>
              <p className="text-xs text-muted-foreground h-20 whitespace-normal truncate">
                25 km from your search (distance) 25 km from your search
                (distance) 25 km from your search (distance) 25 km from your
                search (distance) 25 km from your search (distance) 25 km from
                your search (distance) 25 km from your search (distance) 25 km
                from your search (distance) 25 km from your search (distance) 25
                km from your search (distance)
              </p>
              <span className="pl-[60%]">
                US${" "}
                <span className="font-extrabold text-lg text-blue-800">
                  100
                </span>
              </span>
            </div>
          </div>
          <div className="inline-block w-48 bg-[#c9c3c35d] rounded-md overflow-hidden">
            <Image src={testImage} alt="" className="object-cover h-32" />
            <div className="p-2 space-y-1">
              <h1 className="font-bold text-sm truncate">
                Atura Blacktwon, an EVA Hotel
              </h1>
              <div className="flex items-center  gap-x-1">
                <Star size={15} />
                <Star size={15} />
                <Star size={15} />
                <Star size={15} />
              </div>
              <p className="text-xs text-muted-foreground h-20 whitespace-normal truncate">
                25 km from your search (distance) 25 km from your search
                (distance) 25 km from your search (distance) 25 km from your
                search (distance) 25 km from your search (distance) 25 km from
                your search (distance) 25 km from your search (distance) 25 km
                from your search (distance) 25 km from your search (distance) 25
                km from your search (distance)
              </p>
              <span className="pl-[60%]">
                US${" "}
                <span className="font-extrabold text-lg text-blue-800">
                  100
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        id={"hotel-detail-page-reviews-section"}
        className="mx-3 space-y-2 rounded-lg overflow-hidden bg-white mb-2"
      >
        <div className="flex items-center justify-between bg-slate-100 p-2">
          <h1 className="font-extrabold text-lg">Reviews</h1>
          <span className="text-blue-800 font-bold text-sm">122 reviews</span>
        </div>
        <div className="bg-white">
          <div className="p-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-1 ">
              <span className="font-extrabold text-4xl text-blue-800">3.7</span>
              <p className="text-xs font-bold text-blue-800">Hotels.com</p>
              <p className="text-xs font-medium text-center">
                Comprehensive Rating
              </p>
            </div>
            <div className="w-2/3">
              <div className="">
                <p className="text-sm font-medium">Cleanliness</p>
                <div className="flex items-center justify-center gap-x-2 -mt-1 font-bold">
                  <div className="rounded-lg overflow-hidden bg-slate-300 h-[5px] w-full">
                    <div className="w-[80%] h-full bg-blue-900"></div>
                  </div>
                  3.8
                </div>
              </div>
              <div className="">
                <p className="text-sm font-medium">Amentities</p>
                <div className="flex items-center justify-center gap-x-2 -mt-1 font-bold">
                  <div className="rounded-lg overflow-hidden bg-slate-300 h-[5px] w-full">
                    <div className="w-[80%] h-full bg-blue-900"></div>
                  </div>
                  3.8
                </div>
              </div>
              <div className="">
                <p className="text-sm font-medium">Location</p>
                <div className="flex items-center justify-center gap-x-2 -mt-1 font-bold">
                  <div className="rounded-lg overflow-hidden bg-slate-300 h-[5px] w-full">
                    <div className="w-[80%] h-full bg-blue-900"></div>
                  </div>
                  3.8
                </div>
              </div>
              <div className="">
                <p className="text-sm font-medium">Service</p>
                <div className="flex items-center justify-center gap-x-2 -mt-1 font-bold">
                  <div className="rounded-lg overflow-hidden bg-slate-300 h-[5px] w-full">
                    <div className="w-[80%] h-full bg-blue-900"></div>
                  </div>
                  3.8
                </div>
              </div>
            </div>
          </div>
          <div className=" whitespace-nowrap space-x-2 overflow-auto scrollbar-none py-3 pl-3">
            <div className="w-64 inline-block border border-zinc-500 p-3 rounded-md">
              <div className="flex items-center gap-x-3 mb-2">
                <Image
                  src={testImage}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm font-bold">Atef Gamal</p>
                <span className="ml-4 rounded-s-lg rounded-b-lg bg-blue-900 text-white text-[12px] font-medium px-[3px] py-[2px]">
                  4.2/5
                </span>
              </div>
              <p className="h-24 whitespace-normal truncate text-sm text-muted-foreground font-medium">
                Hello Everyone I see That Helps Me Hello Everyone I see That
                Helps Me Hello Everyone I see That Helps Me Hello Everyone I see
                That Helps Me Hello Everyone I see That Helps Me Hello Everyone
                I see That Helps Me Hello Everyone I see That Helps Me Hello
                Everyone I see That Helps Me
              </p>
            </div>
            <div className="w-64 inline-block border border-zinc-500 p-3 rounded-md">
              <div className="flex items-center gap-x-3 mb-2">
                <Image
                  src={testImage}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm font-bold">Atef Gamal</p>
                <span className="ml-4 rounded-s-lg rounded-b-lg bg-blue-900 text-white text-[12px] font-medium px-[3px] py-[2px]">
                  4.2/5
                </span>
              </div>
              <p className="h-24 whitespace-normal truncate text-sm text-muted-foreground font-medium">
                Hello Everyone I see That Helps Me Hello Everyone I see That
                Helps Me Hello Everyone I see That Helps Me Hello Everyone I see
                That Helps Me Hello Everyone I see That Helps Me Hello Everyone
                I see That Helps Me Hello Everyone I see That Helps Me Hello
                Everyone I see That Helps Me
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id={"hotel-detail-page-nearby-attractions-section"}
        className="mx-3 p-3 space-y-2 rounded-lg bg-white mb-2"
      >
        <h1 className="text-lg font-extrabold">Nearby Attractions</h1>
        <div className="flex items-center gap-x-2">
          <span className="text-sm py-[2px] px-4 bg-zinc-600 text-white font-medium rounded-sm">
            Transport
          </span>
          <span className="text-sm py-[2px] px-4 bg-zinc-200 text-black font-medium rounded-sm">
            Dining
          </span>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <TrainFrontIcon size={20} />
            <span className="truncate font-medium text-muted-foreground">
              Abu Bakre El-Siddique
            </span>
            <span className="truncate ml-auto text-xs font-medium text-muted-foreground bg-[#d1cece] py-[2px] px-2">
              Metro Station
            </span>
            <span className="text-xs font-medium whitespace-nowrap">22 m</span>
          </div>
          <div className="flex items-center gap-x-2">
            <TrainFrontIcon size={20} />
            <span className="truncate font-medium text-muted-foreground">
              Salah Eldin
            </span>
            <span className="truncate ml-auto text-xs font-medium text-muted-foreground bg-[#d1cece] py-[2px] px-2">
              Metro Station
            </span>
            <span className="text-xs font-medium">1.1 km</span>
          </div>
          <div className="flex items-center gap-x-2">
            <PlaneIcon size={20} />
            <span className="truncate font-medium text-muted-foreground">
              Dubai International Airport
            </span>
            <span className="truncate ml-auto text-xs font-medium text-muted-foreground bg-[#d1cece] py-[2px] px-2">
              Airport
            </span>
            <span className="text-xs font-medium">4.4 km</span>
          </div>
          <div className="flex items-center gap-x-2">
            <PlaneIcon size={20} />
            <span className="truncate font-medium text-muted-foreground">
              Sharqa Airport
            </span>
            <span className="truncate ml-auto text-xs font-medium text-muted-foreground bg-[#d1cece] py-[2px] px-2">
              Airport
            </span>
            <span className="text-xs font-medium">8.7 km</span>
          </div>
        </div>
      </div>
      <div
        id={"hotel-detail-page-amentities-section"}
        className="mx-3 p-3 space-y-2 rounded-lg bg-white mb-2"
      >
        <h1 className="text-lg font-extrabold">Amentities</h1>
        <div className="whitespace-nowrap space-x-2 overflow-auto scrollbar-none">
          <div className="w-44 h-32 inline-block rounded-sm overflow-hidden relative">
            <Image
              src={testImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="w-full absolute left-1 bottom-0 text-sm text-white truncate">
              Indoor swimmining pool and another places
            </div>
          </div>
          <div className="w-44 h-32 inline-block rounded-sm overflow-hidden relative">
            <Image
              src={testImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="w-full absolute left-1 bottom-0 text-sm text-white truncate">
              Indoor swimmining pool and another places
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">
              Indoor swimming pool
            </span>
          </span>
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">Hot Springs</span>
          </span>
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">Sauna</span>
          </span>
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">Gym</span>
          </span>
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">
              Private Parking
            </span>
          </span>
          <span className="flex gap-x-1">
            <CheckIcon size={15} />
            <span className="text-sm font-medium leading-4">Nightclub</span>
          </span>
        </div>

        <Button variant={"secondary"} className="ml-[33%]">
          Show All
        </Button>
      </div>
      <div
        id={"hotel-detail-page-hotel-policy-section"}
        className="mx-3 p-3 space-y-2 rounded-lg bg-white mb-2"
      >
        <h1 className="text-lg font-extrabold">Hotel Policy</h1>
        <p className="font-bold text-sm">Check-in and Check-out Times</p>
        <div className="text-sm bg-slate-100 flex items-center justify-between p-2">
          <p className="text-sm">Check-in: After 14:00</p>
          <p className="text-sm">Check-out: Before 12:00</p>
        </div>
        <p className="font-bold text-sm">Policies</p>
        <ul className="list-disc pl-5">
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
          <li>nice ti have a points here</li>
        </ul>
      </div>
    </section>
  );
};

export default HotelDetailsPage;
