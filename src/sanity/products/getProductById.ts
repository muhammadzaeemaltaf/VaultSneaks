import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getProductByID = async (id: string) => {
  const GET_PRODUCTS_BY_ID_QUERY = defineQuery(
    `*[_type=="product" && _id == $id]`
  );
  try {
    const product = await client.fetch(GET_PRODUCTS_BY_ID_QUERY, { id });
    return product || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
