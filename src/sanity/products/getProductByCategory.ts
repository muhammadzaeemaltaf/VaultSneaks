import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getProductByCategory = async (slug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
                *[
                     _type == "product"
                     && category == $slug
                 ] | order(name asc)
            `);

  try {
    const products = await client.fetch(PRODUCT_BY_CATEGORY_QUERY, {
      slug,
    });

    return products || [];
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};

