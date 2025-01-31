import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from 'uuid';

export async function createOrderInSanity(orderData: any) {
  const order = await client.create({
    _type: "order",
    orderNumber: orderData.orderNumber,
    userId: orderData.userId, // Include user ID
    customerName: orderData.firstName + " " + orderData.lastName,
    email: orderData.email,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    addressLine1: orderData.addressLine1,
    addressLine2: orderData.addressLine2,
    addressLine3: orderData.addressLine3,
    postalCode: orderData.postalCode,
    locality: orderData.locality,
    country: orderData.country,
    phoneNumber: orderData.phoneNumber,
    currency: orderData.currency,
    amountDiscount: orderData.amountDiscount,
    products: orderData.products.map((product: any) => ({
      _key: uuidv4(),
      product: { _type: "reference", _ref: product.product._ref },
      quantity: product.quantity,
      color: product.color,
    })),
    totalPrice: orderData.totalPrice,
    status: orderData.status,
    orderDate: orderData.orderDate,
    paymentMethod: orderData.paymentMethod,
    estimatedDeliveryDate: orderData.estimatedDeliveryDate,
  });

  return order;
}

export async function activateUserInSanity(userId: string) {
  const updatedUser = await client.patch(userId).set({ isActive: true }).commit();
  return updatedUser;
}

export async function sendEmail() {
  const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          to: "recipient@example.com",
          subject: "Hello from Next.js",
          text: "This is a test email using Next.js Route Handlers!",
      }),
  });

  const data = await response.json();
  alert(data.message);
}
