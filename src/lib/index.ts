import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from 'uuid';

export async function createOrderInSanity(orderData: any) {
  const order = await client.create({
    _type: "order",
    orderNumber: orderData.orderNumber,
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