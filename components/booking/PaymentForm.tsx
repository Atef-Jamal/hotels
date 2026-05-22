"use client";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent } from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      throw new Error("stripe or elements not exists");
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment/completed",
      },
    });
    console.log(error);
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
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <p className="mb-2 text-sm font-thin">
          By submitting this booking, I acknowledge that I have read and agree to Hotels.com&lsquo;s Terms of
          Use and Privacy Statement.
        </p>
        <Button
          type="submit"
          id="submit"
          disabled={!stripe || !elements}
          size={"lg"}
          className="w-full rounded-sm bg-blue-700"
        >
          confirm
        </Button>
      </form>
    </div>
  );
}
