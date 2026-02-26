"use client";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = () => {};

  const paymentElementOptions = {};

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
          className="w-full bg-blue-700 text-lg"
        >
          Confirme
        </Button>
      </form>
    </div>
  );
}
