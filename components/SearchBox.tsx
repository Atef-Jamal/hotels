"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Calendar, SearchIcon, SendIcon, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import { MdAddLocation } from "react-icons/md";
import testImage from "@/public/gamePhoto-43.jpg";
import { Calendar as CalenderDates } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

const SearchBox = () => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );

  const handleSelectDates = (newSelect: DateRange | undefined) => {
    setCheckIn(newSelect?.from);
    setCheckOut(newSelect?.to);
  };

  // let difference: number = 0;

  // if (checkIn && checkOut) {
  //   const differenceInMilliSeconds = checkOut?.getTime() - checkIn?.getTime();
  //   difference = differenceInMilliSeconds / (1000 * 60 * 60 * 24);
  // }

  return (
    <Card className="shadow-xl">
      <CardContent className="p-2 grid grid-cols-1 md:flex gap-2">
        <Dialog>
          <DialogTrigger className="md:w-[30%]">
            <span className="font-[500] text-muted-foreground border w-full flex items-center justify-between py-2 px-4 rounded-sm truncate">
              <SearchIcon size={18} className="mr-2" /> Enter destination
              <SendIcon size={20} className="ml-auto" />
            </span>
          </DialogTrigger>
          <DialogContent className="h-full p-2 max-w-[45rem] overflow-y-auto scrollbar-none md:scrollbar-thin">
            <div className="space-y-2">
              <Input placeholder="Enter a destination " className="w-[90%] " />
              <div className="h-10 p-2 flex items-center gap-x-3 border-b mb-2">
                <FaLocationArrow color="blue" /> Current Location
              </div>
              <div className="space-y-2">
                <h1 className="font-medium">Popular destinations</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={testImage}
                      alt=""
                      className="h-24 object-cover"
                    />
                    <div className="flex items-center gap-x-2 p-2 bg-slate-100">
                      <MdAddLocation color="blue" size={20} />
                      Dubai
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="md:w-[30%]">
            <div className="font-[500] text-muted-foreground border w-full flex items-center justify-between py-2 px-4 rounded-sm truncate">
              <Calendar size={18} className="mr-2" />{" "}
              {checkIn?.toDateString().split(" ").slice(0, -1).join(" ")} -{" "}
              {checkOut?.toDateString().split(" ").slice(0, -1).join(" ")}
              <Badge variant={"secondary"} className="ml-auto">
                {/* {difference} night */} 1 night
              </Badge>
            </div>
          </DialogTrigger>
          <DialogContent className="rounded-lg h-[52%] p-2 max-w-[25rem] overflow-y-auto scrollbar-none md:scrollbar-thin">
            <div>
              <CalenderDates
                mode="range"
                selected={{
                  from: checkIn,
                  to: checkOut,
                }}
                onSelect={handleSelectDates}
                className="rounded-md border w-fit mx-auto"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="md:w-[30%]">
            <span className="font-[500] text-muted-foreground border w-full flex items-center gap-x-2 py-2 px-4 rounded-sm truncate">
              <User size={18} /> 1 Room 2 Adults 0 Children
            </span>
          </DialogTrigger>
          <DialogContent className="h-full">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="md:hidden">
            <span className="font-[500] text-muted-foreground border w-full flex items-center gap-x-2 py-2 px-4 rounded-sm truncate">
              <User size={18} /> Price, Guest rating, star rating
            </span>
          </DialogTrigger>
          <DialogContent className="h-full">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button className="w-full sm:col-span-2 md:col-span-1 md:w-[10%]">
          Search
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
