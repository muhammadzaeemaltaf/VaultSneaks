import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getProductByName = async (name: string) => {
  const PRODUCT_BY_NAME_QUERY = defineQuery(`
             *[
                 _type == "product"
                && productName == $name
             ][0]{
              ...,
              "categoryName": category->categoryName,
             }
        
        `);

  try {
    const product =  await client.fetch(
        PRODUCT_BY_NAME_QUERY,
        { name }
            )

    return product || [];
  } catch (error) {
    console.error("Error fetching product by name", error);
    return [];
  }
};