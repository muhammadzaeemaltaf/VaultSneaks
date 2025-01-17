import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getWomenProducts = async () => {
  const WOMEN_PRODUCTS_QUERY = defineQuery(
    `*[_type=="product" && category match "Women*"] | order(name asc)`
  );
  try {
    const products = await client.fetch(WOMEN_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
