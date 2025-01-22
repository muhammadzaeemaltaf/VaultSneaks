import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getAllOrders = async () => {
  const ORDER_QUERY = defineQuery(
    `*[_type == "order" ] {
    ...,
    "products": products[]->{
      product->{
        name,
        image,
        price,
        currency
      },
      quantity
    }
  } | order(orderDate asc)`
  );
  try {
    const order = await client.fetch(ORDER_QUERY);
    return order || [];
  } catch (error) {
    console.error("Error fetching order", error);
    return [];
  }
};
