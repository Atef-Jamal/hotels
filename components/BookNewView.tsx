"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BadgeCheck, BedDouble, BedSingle, Calendar, ChevronDown, InfoIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { IRoom } from "@/types/types";
import { applyPromoCod } from "@/actions/actions";

export default function BookNewView({ room, discountId }: { room: IRoom; discountId: string | null }) {
  const [roomData, setRoomData] = useState(room);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeLoading, setPromoCodeLoading] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPromoCodeError("");
    setPromoCodeLoading(true);
    try {
      const result = await applyPromoCod({ roomId: roomData._id, discountId, promoCode });

      if (result.status === "error") {
        setPromoCodeError(result.message);
        setPromoCodeLoading(false);
      }

      if (result.status === "success") {
        setRoomData((prev) => ({ ...prev, pricePerNight: result.newPrice }));
        setPromoCodeLoading(false);
        setPromoCodeApplied(true);
      }
    } catch (error) {
      setPromoCodeError("an error occured");
      setPromoCodeLoading(false);
    }

    return;
  };
  console.log(promoCodeLoading);
  const user = { name: "atef", email: "atefgmal778@gmail.com", phone: "01095938927", emailVerified: false };

  return (
    <section className="mx-2 flex flex-col gap-4 rounded-xl max-md:py-2 lg:flex-row">
      <div className="flex w-full flex-1 flex-col gap-4">
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="text-lg font-semibold">Guest Info</h1>
          <p className="mt-2 text-sm font-thin">Guest names will be used at check in</p>
          <div className="mt-6 grid grid-cols-1 gap-3 min-[550px]:grid-cols-2">
            <div className="grid items-center gap-2">
              <Label htmlFor="name" className="ml-1">
                Name
              </Label>
              <Input type="text" id="name" placeholder="Name" className="h-11" />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="phone" className="ml-1">
                Phone
              </Label>
              <Input type="tel" id="phone" placeholder="phone" className="h-11" />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="email" className="ml-1">
                Email
              </Label>
              <Input type="email" id="email" placeholder="Email" className="h-11" />
            </div>
          </div>
          {!user.emailVerified && (
            <div className="mt-4 rounded-lg bg-purple-50 px-4 py-2">
              <p className="mb-4 text-center text-sm font-thin">
                we have been sent your verification code to your email.
              </p>
              <div className="flex flex-col items-center justify-between gap-5 min-[550px]:flex-row md:px-10">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-zinc-500" />
                    <InputOTPSlot index={1} className="border-zinc-500" />
                    <InputOTPSlot index={2} className="border-zinc-500" />
                    <InputOTPSlot index={3} className="border-zinc-500" />
                    <InputOTPSlot index={4} className="border-zinc-500" />
                    <InputOTPSlot index={5} className="border-zinc-500" />
                  </InputOTPGroup>
                </InputOTP>
                <Button className="bg-blue-700">Verify your Email</Button>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="text-lg font-semibold">
            Special Requests{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">(Optional)</span>{" "}
          </h1>
          <p className="mb-4 mt-2 text-sm font-thin">
            The property will do its best, but cannot guarantee to fulfill all requests.
          </p>

          <Textarea placeholder="Enter Your Requests" />
        </div>
        {discountId && (
          <div className="rounded-md bg-white px-2 py-4 sm:px-4">
            <h1 className="mb-5 text-lg font-semibold">Available For this Booking</h1>
            <form className="grid items-center gap-2">
              <Label htmlFor="promo-code" className="ml-1">
                Promo code
              </Label>
              <div className="relative flex items-center justify-end">
                <Input
                  type="text"
                  id="promo-code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoCodeLoading || promoCodeApplied}
                  placeholder="Enter promo code"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={cn(
                    "absolute mr-2 rounded-md px-3 py-1 text-sm text-white",
                    promoCode ? "bg-blue-700" : "bg-blue-700/40",
                  )}
                >
                  {promoCodeLoading ? "Loading" : "Use"}
                </button>
              </div>
              {promoCodeError && <p>{promoCodeError}</p>}
            </form>
          </div>
        )}
        <Link
          href={discountId && promoCodeApplied ? `info/payment?discountId=${discountId}` : `info/payment`}
          className="hidden w-full rounded-lg bg-blue-700 text-lg lg:block"
        >
          Next Step
        </Link>
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-[33%]">
        <div className="space-y-1 rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="mb-4 font-semibold">Delux Bunk Room</h1>
          <div className="flex items-center gap-2 text-sm font-thin">
            <div className="flex items-center gap-1">
              <BedDouble size={15} />
              <span>1 Queen Bed</span>
            </div>
            <div className="flex items-center gap-1">
              <BedSingle size={15} />
              <span>2 Single Beds</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-thin">
            <BadgeCheck size={15} />
            <span>Internet .</span>
            <span> Contact hotel .</span>
            <span>Non-smoking</span>
          </div>
          <div className="flex items-center gap-1">
            <InfoIcon size={15} />
            <p className="text-sm font-thin">Non-Refundable</p>
          </div>
        </div>
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <div className="flex items-center justify-evenly text-sm font-semibold">
            <p>Check In</p>
            <Separator orientation="vertical" className="bg-black/30" />
            <p>Check Out</p>
          </div>
          <div className="my-2 flex items-center justify-around">
            <p>{new Date().toISOString().split("T")[0]}</p>
            <p>{new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}</p>
          </div>
          <Separator orientation="horizontal" className="bg-black/30" />
          <div className="flex items-center gap-1 text-sm">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar size={15} />
                <span className="">1 Nights</span>
              </div>
              <ChevronDown size={17} />
              {/* <ChevronUp size={15} /> */}
            </div>
            <Separator orientation="vertical" className="mx-2 my-2 h-5 bg-black/30" />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar size={15} />
                <span>1 Rooms</span>
              </div>
              <ChevronDown size={17} />
            </div>
          </div>
        </div>
        <div className="space-y-3 rounded-md bg-white px-2 py-4 font-thin sm:px-4">
          <h1 className="mb-4 font-semibold">Price Details</h1>
          <div className="">
            <div className="mb-1 flex items-center justify-between">
              <p>1 Room * 1 Night</p>
              <span>SAR 356</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p>Taxes & Fees</p>
              <span>SAR 64.39</span>
            </div>
            <div className="mb-2 ml-1 space-y-1 border-l border-l-black/30 pl-2">
              <p>City tax: SAR 13.13</p>
              <p>Accommodation tax: SAR 20.42</p>
              <p>Sales tax: SAR 30.84</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Prepay Online</h1>
            <span>SAR 420</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Pay At Hotels</h1>
            <span>SAR 99</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Total</h1>
            <span>SAR {roomData.pricePerNight}</span>
          </div>
        </div>
        <div>
          <Link
            href={discountId && promoCodeApplied ? `info/payment?discountId=${discountId}` : `info/payment`}
            className="w-full rounded-lg bg-blue-700 text-lg lg:hidden"
          >
            Next Step
          </Link>
        </div>
      </div>
    </section>
  );
}
