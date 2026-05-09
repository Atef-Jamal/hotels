import CheckOutForm from "@/components/CheckOutForm";
import { stripe } from "@/lib/stripe";

export default async function page() {
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
  });

  if (!clientSecret) throw new Error("client secret not found");
  return <CheckOutForm clientSecret={clientSecret} />;
}
