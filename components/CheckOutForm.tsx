"use client";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutForm({ clientSecret }: { clientSecret: string }) {
  const appearance: Appearance = {
    theme: "stripe",
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}
