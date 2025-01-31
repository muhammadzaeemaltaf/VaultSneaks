import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getAllOrders = async () => {
  const ORDER_QUERY = defineQuery(
    `*[_type == "order" ] {
     ...,
                products[] {
                    ...,
                    product->
                }}`
  );
  try {
    const order = await client.fetch(ORDER_QUERY);
    return order || [];
  } catch (error) {
    console.error("Error fetching order", error);
    return [];
  }
};

export const getOrdersByUserId = async (userId: string) => {
  const ORDER_QUERY = defineQuery(
    `*[_type == "order" && userId == $userId] {
     ...,
     products[] {
       ...,
       product->
     }
    }`
  );
  try {
    const orders = await client.fetch(ORDER_QUERY, { userId });
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders", error);
    return [];
  }
};
