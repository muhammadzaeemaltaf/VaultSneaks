import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


export const getRelatedProducts = async (category: string, excludeProductId: string) => {
  const RELATED_PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
       *[_type == "product" && category == $category && _id != $excludeProductId]

  `);

  try {
    const products = await client.fetch(RELATED_PRODUCT_BY_CATEGORY_QUERY, { category, excludeProductId });
    return shuffleArray(products).slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching related products by category", error);
    return [];
  }
};