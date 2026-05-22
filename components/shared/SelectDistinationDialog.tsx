"use client";
import { Blinds, Hotel, MapPin, Navigation } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "@/actions";
import testImage from "@/public/gamePhoto-43.jpg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MdClose } from "react-icons/md";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IDestinationItem, IDestinationResponse } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

interface IProps {
  children: React.ReactNode;
  initialDestinations: IDestinationResponse;
}

export default function SelectDistinationDialog({ children, initialDestinations }: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { queryParams, updateQueryParams } = useQueryParams();

  const handleSelect = (distination: IDestinationItem) => {
    if (distination.type === "property") {
      return updateQueryParams([
        { method: "set", key: "hotelName", value: distination.hotelSlug },
        { method: "set", key: "address", value: distination.address },
        { method: "set", key: "city", value: distination.city },
        { method: "set", key: "country", value: distination.country },
      ]);
    }
    if (distination.type === "address") {
      return updateQueryParams([
        { method: "delete", key: "hotelName" },
        { method: "set", key: "address", value: distination.address },
        { method: "set", key: "city", value: distination.city },
        { method: "set", key: "country", value: distination.country },
      ]);
    }

    if (distination.type === "city") {
      return updateQueryParams([
        { method: "set", key: "city", value: distination.city },
        { method: "set", key: "country", value: distination.country },
        { method: "delete", key: "hotelName" },
        { method: "delete", key: "address" },
      ]);
    }

    if (distination.type === "country") {
      return updateQueryParams([
        { method: "set", key: "country", value: distination.country },
        { method: "delete", key: "hotelName" },
        { method: "delete", key: "address" },
        { method: "delete", key: "city" },
      ]);
    }
  };

  const { status, data, error } = useQuery({
    queryKey: ["destinations-list", searchTerm],
    queryFn: () => getDestinations(searchTerm),
    initialData: initialDestinations,
    // staleTime: 1000 * 60 * 60,
  });

  return (
    <Dialog>
      {children}
      <DialogContent
        showCloseButton={false}
        className="flex h-full min-w-full flex-col gap-1 px-2 py-4 max-md:rounded-none md:h-[80%] md:min-w-3xl md:px-4"
      >
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.select()}
              defaultValue={
                queryParams.hotelName
                  ? queryParams.hotelName.replace(/_/g, " ")
                  : queryParams.city
                    ? `${queryParams.city} - ${queryParams.country}`
                    : queryParams.country
                      ? queryParams.country
                      : ""
              }
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
          <div className="scrollbar-thin relative flex-1 overflow-auto">
            <div className="sticky top-0 left-0 mb-1 flex w-full items-center gap-3 bg-white py-1">
              <Blinds size={18} color="blue" />
              <span>Popular Distinations</span>
            </div>
            {/* {status === "pending" && (
              <div className="flex h-full items-center justify-center font-bold">Loading ...</div>
            )} */}
            {status === "error" && (
              <div className="flex h-full items-center justify-center text-red-700">{error.message}</div>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {status === "success" &&
                data.map((result, indx) => (
                  <DialogClose
                    onClick={() => handleSelect(result)}
                    className="overflow-hidden rounded-md bg-purple-200 text-sm font-medium"
                    key={indx + Date.now() * Math.random() * 1000}
                  >
                    <Image src={testImage} alt="" className="h-24 bg-gray-500 object-cover" />
                    <div className="flex flex-col items-start p-1">
                      <div className="flex items-center gap-x-1 truncate">
                        {result.type === "property" ? <Hotel color="blue" size={18} /> : <MapPin size={18} />}
                        {result.type === "property" && <p>{result.name}</p>}
                        {result.type === "address" && <p>{result.address}</p>}
                        {result.type === "city" && <p>{result.city}</p>}
                        {result.type === "country" && <p> {result.country}</p>}
                      </div>
                      <span className="rounded-sm px-2 text-[12px] font-normal text-red-700">
                        {result.type === "property" || result.type === "address"
                          ? `${result.city} - ${result.country}`
                          : ""}

                        {result.type === "city" && <p>{result.country}</p>}
                        {result.type === "country" && <p>country</p>}
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
