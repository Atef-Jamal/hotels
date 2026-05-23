"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, BedDouble, BedSingle, Calendar, ChevronDown, InfoIcon } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { MdMeetingRoom } from "react-icons/md";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { applyDiscountTemporarily, bookNow } from "@/actions";
import { ChangeEvent, FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { IRoomsDetailResponse } from "@/types";
import { useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import SelectDatesDialog from "@/components/shared/SelectDatesDialog";

interface IProps {
  room: IRoomsDetailResponse;
  hasDiscounts: boolean;
}

export default function BookingDetailView({ room, hasDiscounts }: IProps) {
  const auth = authClient.useSession();
  const { queryParams } = useQueryParams();
  const router = useRouter();
  const user = auth.data?.user;

  const [guestDetails, setGuestDetails] = useState(() => ({
    ...(user ? { name: user.name } : { name: "" }),
    ...(user ? { email: user.email } : { email: "" }),
    ...(user && user.phone ? { phone: user.phone } : { phone: "" }),
  }));

  const [specialRequests, setSpecialRequets] = useState("");

  const [price, setPrice] = useState(room.pricePerNight / 100);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeLoading, setPromoCodeLoading] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);

  const [bookNowLoading, setBookNowLoading] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [bookNowError, setBookNowError] = useState<string | null>(null);

  const nights = Math.ceil(
    Math.abs(queryParams.checkOut.getTime() - queryParams.checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (!room) return;

  const handleGuestInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBook = async () => {
    setBookNowLoading(true);
    setBookNowError(null);

    const response = await bookNow({
      roomId: room.id,
      guestName: guestDetails.name,
      guestEmail: guestDetails.email,
      guestPhone: guestDetails.phone,
      checkIn: queryParams.checkIn,
      checkOut: queryParams.checkOut,
      roomsCount: queryParams.roomsCount,
      promoCode: promoCodeApplied ? promoCode : undefined,
      specialRequests,
    });

    setBookNowLoading(false);

    if (response.status === "error" && response.message.includes("Discount")) {
      setBookNowError(response.message);
      return setOpenWarningDialog(true);
    }

    if (response.status === "error") {
      return setBookNowError(response.message);
    }

    if (response.status === "success" && response.payment) {
      return router.replace(`${room.id}/payment?paymentId=${response.payment.id}`);
    }
  };

  const handleBookWithoutDiscount = async () => {
    setBookNowLoading(true);
    setBookNowError(null);

    const response = await bookNow({
      roomId: room.id,
      guestName: guestDetails.name,
      guestEmail: guestDetails.email,
      guestPhone: guestDetails.phone,
      checkIn: queryParams.checkIn,
      checkOut: queryParams.checkOut,
      roomsCount: queryParams.roomsCount,
    });

    setBookNowLoading(false);

    if (response.status === "error") {
      return setBookNowError(response.message);
    }

    if (response.status === "success" && response.payment) {
      return router.replace(`${room.id}/payment?paymentId=${response.payment.id}`);
    }
  };

  const handleSubmitPromoCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPromoCodeError(null);
    setPromoCodeLoading(true);

    const response = await applyDiscountTemporarily({
      roomId: room.id,
      promoCode: promoCode,
      checkIn: queryParams.checkIn,
      checkOut: queryParams.checkOut,
    });

    if (response.status === "error" && response.message) {
      setPromoCodeError(response.message);
    }

    if (response.status === "success" && response.newPrice) {
      setPrice(response.newPrice / 100);
      setPromoCodeApplied(true);
    }
    setPromoCodeLoading(false);
  };

  return (
    <section className="mx-2 flex flex-col gap-4 rounded-xl max-md:py-2 lg:flex-row">
      <Dialog open={openWarningDialog} onOpenChange={setOpenWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-red-500"}>Warning Discount Failed</DialogTitle>
          </DialogHeader>
          <p>{bookNowError} </p>
          <p>Want to continue without discount </p>
          <DialogClose
            className={"w-full rounded-sm bg-blue-600 py-1 font-medium text-gray-100"}
            onClick={handleBookWithoutDiscount}
          >
            continue
          </DialogClose>
          <DialogClose
            className={"w-full rounded-sm bg-blue-600 py-1 font-medium text-gray-100"}
            onClick={() => {
              setPromoCodeApplied(false);
            }}
          >
            cancel
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div className="flex w-full flex-1 flex-col gap-4">
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="font-semibold md:font-bold">Guest Info</h1>
          <p className="text-muted-foreground mt-2 text-xs md:text-sm">
            Guest names will be used at check in
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 min-[550px]:grid-cols-2">
            <div className="grid items-center gap-2">
              <Label htmlFor="name" className="ml-1">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={guestDetails.name}
                onChange={handleGuestInfoChange}
                placeholder="Name"
                className="h-11"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="phone" className="ml-1">
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={guestDetails.phone}
                onChange={handleGuestInfoChange}
                placeholder="Phone"
                className="h-11"
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="email" className="ml-1">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={guestDetails.email}
                onChange={handleGuestInfoChange}
                placeholder="Email"
                className="h-11"
              />
            </div>
          </div>
          {/* {!user.emailVerified && (
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
          )} */}
        </div>
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="font-semibold md:font-bold">
            Special Requests
            <span className="text-muted-foreground ml-1 text-sm font-normal">(Optional)</span>{" "}
          </h1>
          <p className="text-muted-foreground mt-2 mb-4 text-xs md:text-sm">
            The property will do its best, but cannot guarantee to fulfill all requests.
          </p>

          <Textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequets(e.target.value)}
            className="text-sm"
            placeholder="Enter Your Requests"
          />
        </div>
        {hasDiscounts && (
          <div className="rounded-md bg-white px-2 py-4 sm:px-4">
            <h1 className="mb-5 font-semibold md:font-bold">Available For this Booking</h1>
            <form onSubmit={handleSubmitPromoCode} className="grid items-center gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="promo-code" className="ml-1">
                  Promo code
                </Label>
                {promoCodeApplied && (
                  <p className="rounded-xs bg-red-200 px-2 py-0.5 text-xs sm:text-sm">
                    Discount Applied successfully
                  </p>
                )}
              </div>

              <div className="relative flex items-center justify-end">
                <Input
                  type="text"
                  id="promo-code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCodeError(null);
                    setPromoCode(e.target.value);
                  }}
                  disabled={promoCodeLoading || promoCodeApplied}
                  placeholder="Enter promo code"
                />
                <Button
                  type="submit"
                  className={cn(
                    "absolute mr-2 rounded-md px-3 py-1 text-sm text-white",
                    promoCode && !promoCodeApplied ? "bg-blue-700" : "bg-blue-700/40",
                  )}
                >
                  {promoCodeLoading ? "Loading" : "Use"}
                </Button>
              </div>
              {promoCodeError && (
                <div className="flex items-center gap-x-2">
                  <FaExclamationCircle />
                  <p className="text-sm font-medium text-red-700">{promoCodeError}</p>
                </div>
              )}
            </form>
          </div>
        )}
        <div className="hidden lg:block">
          {bookNowError && <p className="bg-red-200 py-1 text-center text-red-700">{bookNowError}</p>}
          <Button onClick={handleBook} size={"lg"} className="w-full rounded-md bg-blue-700">
            {bookNowLoading ? "processing..." : "Next Step"}
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-[33%]">
        <div className="space-y-1 rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="font-semibold md:font-bold">{room.type} Room</h1>
          <div className="flex flex-wrap items-center gap-x-4">
            {room.beds.map((bed, indx) => (
              <div key={indx} className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(bed.count).keys()].map((num) => {
                    if (bed.type === "Single") return <BedSingle key={num} size={15} />;
                    return <BedDouble key={num} size={15} />;
                  })}
                </div>

                <span>
                  {bed.count} {bed.type} Beds
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {room.roomServices.slice(0, 10).map((item) => (
              <div key={item} className="text-muted-foreground flex items-center gap-1 text-xs md:text-sm">
                <BadgeCheck size={15} />
                <span key={item}>{item.replace(/_/g, " ")}.</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <InfoIcon size={15} />
            <p className="text-muted-foreground text-xs md:text-sm">Non-Refundable</p>
          </div>
        </div>
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <div className="flex items-center justify-evenly text-sm font-medium">
            <p>Check In</p>
            <Separator orientation="vertical" className="bg-black/30" />
            <p>Check Out</p>
          </div>
          <div className="my-2 flex items-center justify-around">
            <p>{queryParams.checkIn.toLocaleDateString("en-CA")}</p>
            <p>{queryParams.checkOut.toLocaleDateString("en-CA")}</p>
          </div>
          <Separator orientation="horizontal" className="bg-black/30" />
          <div className="flex items-center gap-1 text-sm">
            <SelectDatesDialog>
              <DialogTrigger className="flex flex-1 items-center justify-between font-medium">
                <div className="flex items-center gap-1">
                  <Calendar size={15} />
                  <span>{nights} Nights</span>
                </div>
                <ChevronDown size={17} />
              </DialogTrigger>
            </SelectDatesDialog>
            <Separator orientation="vertical" className="mx-2 my-2 h-5 bg-black/30" />

            <div className="flex flex-1 items-center justify-between font-medium">
              <div className="flex items-center gap-1">
                <MdMeetingRoom size={15} />
                <span>1 Rooms</span>
              </div>
              <ChevronDown size={17} />
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white px-2 py-4 sm:px-4">
          <h1 className="mb-4 font-semibold md:font-bold">Price Details</h1>
          <div className="text-muted-foreground text-xs md:text-sm">
            <div className="mb-1 flex items-center justify-between">
              <p>
                {queryParams.roomsCount} Room * {nights} Night
              </p>
              <span>SAR 356</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p>Taxes & Fees</p>
              <span>SAR 64.39</span>
            </div>
            <div className="ml-1 space-y-1 border-l border-l-black/30 pl-2">
              <p>City tax: SAR 13.13</p>
              <p>Accommodation tax: SAR 20.42</p>
              <p>Sales tax: SAR 30.84</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between max-md:text-sm">
            <h1 className="">Prepay Online</h1>
            <span className="font-semibold">SAR 420</span>
          </div>
          <div className="my-1 flex items-center justify-between max-md:text-sm">
            <h1 className="">Pay At Hotels</h1>
            <span className="font-semibold">SAR 99</span>
          </div>
          <div className="flex items-center justify-between max-md:text-sm">
            <h1 className="">Total</h1>
            <span className="font-semibold">SAR {price}</span>
          </div>
        </div>
        <div className="lg:hidden">
          {bookNowError && <p className="bg-red-200 py-1 text-center text-red-700">{bookNowError}</p>}
          <Button onClick={handleBook} className="w-full rounded-md bg-blue-700">
            {bookNowLoading ? "processing..." : "Next Step"}
          </Button>
        </div>
      </div>
    </section>
  );
}
