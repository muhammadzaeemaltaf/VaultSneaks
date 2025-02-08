import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getChildrenProducts = async () => {
  const CHILDREN_PRODUCTS_QUERY = defineQuery(
    `*[_type=="product" && category->categoryName match "*Children*"] | order(name asc)`
  );
  try {
    const products = await client.fetch(CHILDREN_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
