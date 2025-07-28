import BookNewView from "@/components/BookNewView";
import { stripe } from "@/lib/stripe";

export default async function BookNew() {
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
  });
  if (!clientSecret) throw new Error("client secret is not found");
  return <BookNewView clientSecret={clientSecret} />;
}
