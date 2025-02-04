"use server";

import stripe from "@/lib/stripe";
import { BasketItem } from "../store";
import { urlFor } from "@/sanity/lib/image";

// Updated Metadata type with paymentMethod
export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  userId: string;
  paymentMethod: string;
  currency?: string; 
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  postalCode?: string;
  locality?: string;
  country?: string;
  phoneNumber?: string;
};

export type groupBasketItems = {
  product: BasketItem["product"];
  quantity: number;
};

export const createCheckoutSession = async (
  items: groupBasketItems[],
  metadata: Metadata
) => {
  if (
    !metadata.orderNumber ||
    !metadata.customerName ||
    !metadata.customerEmail ||
    !metadata.userId ||
    !metadata.paymentMethod
  ) {
    throw new Error("Missing required payment information.");
  }

  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderId=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      line_items: items.map((item) => ({
        price_data: {
          currency: metadata.currency ? metadata.currency.toUpperCase() : 'GBP',
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.productName || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image ? [urlFor(item.product.image).url()] : undefined,
          }
        },
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (error) {
    console.error("Checkout session error: ", error);
    throw error;
  }
};
