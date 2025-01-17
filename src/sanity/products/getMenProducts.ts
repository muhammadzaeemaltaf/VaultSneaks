import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getMenProducts = async () => {
  const MEN_PRODUCTS_QUERY = defineQuery(
    `*[_type=="product" && category match "Men*"] | order(name asc)`
  );
  try {
    const products = await client.fetch(MEN_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
