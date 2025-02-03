import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../actions/createCheckoutSession";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("No webhook secret");
    return NextResponse.json({ error: "No webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verication failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in sanity", order);

      // Prepare email details based on payment method
      const metadata = session.metadata as Record<string, any>;
      const paymentMethod = metadata.paymentMethod;
      const customerEmail = metadata.customerEmail;
      const emailText = paymentMethod === "COD"
        ? "Your order has been placed with Cash On Delivery."
        : "Your order has been placed using Stripe payment.";
      const fullName = metadata.customerName;
      const orderNumber = metadata.orderNumber;

      if (!order.emailSent) {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: customerEmail,
            subject: "Order Confirmation",
            text: emailText,
            userId: metadata.userId,
            isOrderEmail: true,
            fullName,
            orderNumber
          }),
        });
        // Mark order as having been emailed
        await client.patch(order._id)
          .set({ emailSent: true })
          .commit();
      } else {
        console.log("Email already sent for order", order.orderNumber);
      }
    } catch (error) {
      console.error("Error Creating order in sanity", error);
      return NextResponse.json({ error: "Error Creating order" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    customer,
    payment_intent,
    currency,
    metadata,
    total_details,
  } = session;

  const {
    orderNumber,
    customerEmail,
    userId,
    customerName,
    paymentMethod = "COD",
    addressLine1 = "",
    addressLine2 = "",
    addressLine3 = "",
    postalCode = "",
    locality = "",
    country = "",
    phoneNumber = "",
  } = metadata as Metadata & {
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    postalCode?: string;
    locality?: string;
    country?: string;
    phoneNumber?: string;
  };

  const existingOrder = await client.fetch(
    '*[_type == "order" && stripeCheckoutSessionId == $id][0]',
    { id }
  );
  if (existingOrder) return existingOrder;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await client.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    userId,
    email: customerEmail,
    firstName: customerName.split(" ")[0] || "",
    lastName: customerName.split(" ").slice(1).join(" ") || "",
    addressLine1,
    addressLine2,
    addressLine3,
    postalCode,
    locality,
    country,
    phoneNumber,
    currency: currency!.toUpperCase(), // Convert currency to uppercase
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: paymentMethod === "COD" ? "pending" : "paid",
    orderDate: new Date().toISOString(),
    estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod,
    emailSent: false, // Add emailSent field
  });

  return order;
}
