"use client";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = () => {};

  const paymentElementOptions = {};

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <p className="mb-5 mt-2 text-sm font-thin">
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
  );
}
