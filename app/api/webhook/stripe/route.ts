import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { handlePaymentCancellation, handlePaymentFailure, handlePaymentSuccess } from "@/actions";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  let data: Stripe.Event.Data;
  let eventType: Stripe.Event.Type;

  if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
    try {
      const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

      data = event.data;
      eventType = event.type;
    } catch (err) {
      const error = err as Error;
      console.log(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    const payload = JSON.parse(body);
    data = payload.data;
    eventType = payload.type;
  }

  const paymentData = data.object as Stripe.PaymentIntent;

  if (eventType === "payment_intent.succeeded") {
    await handlePaymentSuccess(paymentData);
  } else if (eventType === "payment_intent.payment_failed") {
    await handlePaymentFailure(paymentData);
  } else if (eventType === "payment_intent.canceled") {
    await handlePaymentCancellation(paymentData);
  }

  return NextResponse.json({ received: true });
}
