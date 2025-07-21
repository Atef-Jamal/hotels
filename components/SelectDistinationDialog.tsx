"use client";
import { Blinds, Hotel, MapPin, Navigation } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getDistinations, ISearchItem } from "@/actions/actions";
import testImage from "@/public/gamePhoto-43.jpg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MdClose } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

function SelectDistinationDialog({
  children,
  hotelName,
  country,
  city,
  setHotelName,
  setCountry,
  setCity,
}: {
  children: React.ReactNode;
  hotelName: string;
  country: string;
  city: string;
  setHotelName: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(hotelName || country || city || "");

  const updateSearchParam = (
    argue: (
      | { actionType: "set"; key: string; value: string }
      | { actionType: "delete"; key: string; value?: string }
    )[],
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    argue.forEach((item) => {
      if (item.actionType === "set") {
        params.set(item.key, item.value);
      }
      if (item.actionType === "delete") {
        params.delete(item.key);
      }
    });
    router.push(`?${params.toString()}`); // Update URL without full reload
  };

  const handleSelect = (distination: ISearchItem) => {
    if (distination.type === "property-name") {
      setHotelName(distination.name);
      setCity(distination.city);
      setCountry(distination.country);
      updateSearchParam([
        { actionType: "set", key: "hotelName", value: distination.name },
        { actionType: "set", key: "city", value: distination.city },
        { actionType: "set", key: "country", value: distination.country },
      ]);
      return;
    }

    if (distination.type === "city") {
      setCity(distination.city);
      setCountry(distination.country);
      setHotelName("");
      updateSearchParam([
        { actionType: "set", key: "city", value: distination.city },
        { actionType: "set", key: "country", value: distination.country },
        { actionType: "delete", key: "hotelName" },
      ]);
      return;
    }

    if (distination.type === "country") {
      setCountry(distination.country);
      setCity("");
      setHotelName("");
      updateSearchParam([
        { actionType: "set", key: "country", value: distination.country },
        { actionType: "delete", key: "hotelName" },
        { actionType: "delete", key: "city" },
      ]);
      return;
    }
  };

  const { data } = useQuery({
    queryKey: ["distination", searchTerm],
    queryFn: () => getDistinations(searchTerm),
    staleTime: 1000 * 60 * 60,
  });

  console.log(data);

  return (
    <Dialog>
      {children}
      <DialogContent className="flex h-full max-w-full flex-col gap-1 px-2 py-4 md:h-[80%] md:max-w-3xl md:px-4">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              defaultValue={hotelName || country || city || ""}
              placeholder={"Enter a Distination"}
            />
            <DialogClose className="px-4">
              <MdClose color="blue" size={25} />
            </DialogClose>
          </div>
          <button className="flex items-center gap-3 py-1">
            <Navigation color="blue" size={18} />
            <span className="text-black/70">Current Location</span>
          </button>
          <div className="relative flex-1 overflow-auto scrollbar-thin">
            <div className="sticky left-0 top-0 mb-1 flex w-full items-center gap-3 bg-white py-1">
              <Blinds size={18} color="blue" />
              <span>Popular Distinations</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {data?.map((result, indx) => (
                <DialogClose
                  onClick={() => handleSelect(result)}
                  className="overflow-hidden rounded-md bg-purple-200 text-sm font-medium"
                  key={indx + Date.now() * Math.random() * 1000}
                >
                  <Image src={testImage} alt="" className="h-24 bg-gray-500 object-cover" />
                  <div className="flex flex-col items-start p-1">
                    <div className="flex items-center gap-x-1 truncate">
                      {result.type === "property-name" ? (
                        <Hotel color="blue" size={18} />
                      ) : (
                        <MapPin size={18} />
                      )}
                      {result.type === "property-name" && <p>{result.name}</p>}
                      {result.type === "city" && <p>{result.city}</p>}
                      {result.type === "country" && <p> {result.country}</p>}
                    </div>
                    <span className="rounded-sm px-2 text-[12px] font-normal text-zinc-900/60">
                      {result.type === "property-name" && (
                        <p>
                          {result.city} - {result.country}
                        </p>
                      )}
                      {result.type === "city" && <p>{result.country}</p>}
                      {result.type === "country" && <p> country</p>}
                    </span>
                  </div>
                </DialogClose>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectDistinationDialog;
