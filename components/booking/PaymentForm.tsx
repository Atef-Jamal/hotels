"use client";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { isBookingExpired } from "@/actions";
import BookingExpiringTimer from "./BookingExpiringTimer";

interface IProps {
  paymentId: string;
  bookingExpireAt: Date;
}

export default function PaymentForm({ paymentId, bookingExpireAt }: IProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentLoading(true);

    if (!stripe || !elements) {
      throw new Error("stripe or elements not exists");
    }

    const isExpired = await isBookingExpired({ paymentId });

    if (isExpired) {
      setPaymentLoading(false);
      return router.push("/payment/failed");
    }

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.BASE_URL}/payment/completed`,
      },
    });

    router.push("/payment/failed");
  };

  const paymentElementOptions: StripePaymentElementOptions = {};

  return (
    <div className="mx-2 flex flex-col gap-4 max-md:my-4 md:flex-row">
      <div className="md:order-2 md:w-[30%]">
        <div className="rounded-lg bg-white p-4">
          <p>Informations</p>
        </div>
      </div>

      <form id="payment-form" onSubmit={handleSubmit} className="flex-1 rounded-lg bg-white p-2 md:p-4">
        {bookingExpireAt < new Date() && (
          <p className="mb-2 rounded-sm bg-blue-100 p-2 text-sm font-medium">Booking order Expired</p>
        )}
        {bookingExpireAt > new Date() && <BookingExpiringTimer expireAt={bookingExpireAt} />}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <p className="text-muted-foreground mb-2 text-xs md:text-sm">
          By submitting this booking, I acknowledge that I have read and agree to Hotels.com&lsquo;s Terms of
          Use and Privacy Statement.
        </p>
        <Button
          type="submit"
          id="submit"
          disabled={!stripe || !elements || paymentLoading}
          size={"lg"}
          className="w-full rounded-sm bg-blue-700"
        >
          {paymentLoading ? "processing" : "confirm"}
        </Button>
      </form>
    </div>
  );
}
