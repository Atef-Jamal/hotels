import CheckOutForm from "@/components/booking/CheckOutForm";
import ErrorComponent from "@/components/shared/ErrorComponent";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

interface IProps {
  searchParams: Promise<{ paymentId: string | undefined }>;
}
export default async function PaymentPage({ searchParams }: IProps) {
  const { paymentId } = await searchParams;

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: { id: true, amount: true, expiredAt: true, stripePaymentIntentId: true, bookingId: true },
  });

  if (!payment) return <ErrorComponent errorMessage={"Booking not found!"} />;

  let paymentIntent;

  if (payment.stripePaymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: payment.amount,
      currency: "USD",
      metadata: {
        paymentId: payment.id,
        bookingId: payment.bookingId,
      },
    });
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        stripePaymentIntentId: paymentIntent.id,
      },
    });
  }

  if (!paymentIntent.client_secret) throw new Error("client secret not found");

  return (
    <CheckOutForm
      paymentId={payment.id}
      bookingExpireAt={payment.expiredAt}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
