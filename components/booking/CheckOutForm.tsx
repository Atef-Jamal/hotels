"use client";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

interface IProps {
  clientSecret: string;
  paymentId: string;
  bookingExpireAt: Date;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckOutForm({ clientSecret, paymentId, bookingExpireAt }: IProps) {
  const appearance: Appearance = {
    theme: "stripe",
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm paymentId={paymentId} bookingExpireAt={bookingExpireAt} />
    </Elements>
  );
}
