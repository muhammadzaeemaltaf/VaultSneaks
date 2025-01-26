import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const getProductByCategory = async (slugs: string[]) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
                *[
                     _type == "product"
                     && category->categoryName in $slugs
                 ] | order(name asc)
            `);

  try {
    const products = await client.fetch(PRODUCT_BY_CATEGORY_QUERY, {
      slugs,
    });

    return products || [];
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};

