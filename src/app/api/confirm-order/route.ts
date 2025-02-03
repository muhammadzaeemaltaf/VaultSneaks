import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { client } from "@/sanity/lib/client";
import Stripe from "stripe";

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const { id, amount_total, customer, payment_intent, currency, metadata, total_details } = session;
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
  } = metadata as Record<string, any>;

  // Check if order already exists
  const existingOrder = await client.fetch(
    '*[_type == "order" && orderNumber == $orderNumber][0]',
    { orderNumber }
  );
  if (existingOrder) return existingOrder;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

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
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"],
    });
    const order = await createOrderInSanity(session);
    
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
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
