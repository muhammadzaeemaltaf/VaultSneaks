import { client } from "@/sanity/lib/client";

export const createOrder = async (orderData: any) => {
  try {
    const order = await client.create({
      _type: "order",
      ...orderData,
      products: orderData.products.map((item: any) => ({
        _type: "object",
        product: { _type: "reference", _ref: item.product },
        quantity: item.quantity,
      })),
    });
    return order._id;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};
