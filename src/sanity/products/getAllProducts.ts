import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getAllProducts = async () => {
  const All_PRODUCTS_QUERY = defineQuery(
    `*[_type=="product"] | order(name asc)`
  );
  try{
        const products = await client.fetch(
     All_PRODUCTS_QUERY,
        )
        return products || [];
  }catch(error){
    console.error("Error fetching products", error);
    return [];
  }
};