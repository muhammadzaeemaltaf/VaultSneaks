import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const searchProducts = async (searchTerm: string) => {
  const SEARCH_PRODUCT_NAMES_QUERY = defineQuery(
    `
    *[_type=="product" && (productName match $searchTerm || description match $searchTerm)]{
      productName, 
      "imageUrl": image.asset->url
    } | order(productName asc)[0...6]
  `
  );
  
  const SEARCH_PRODUCT_CATEGORY_NAME_QUERY = defineQuery(
    `
    *[_type=="product" && category match $searchTerm]{
      category
    } | order(category asc)
  `
  );

  try {
    // Fetch data using parameterized queries
    const productDetail = await client.fetch(SEARCH_PRODUCT_NAMES_QUERY, { searchTerm: `*${searchTerm}*` });
    const categoryDetail = await client.fetch(SEARCH_PRODUCT_CATEGORY_NAME_QUERY, { searchTerm: `*${searchTerm}*` });

    // Process and return unique categories
    const uniqueCategories = Array.from(new Set(categoryDetail.map((item: { category: string }) => item.category)));

    return { productDetail, categoryDetail: uniqueCategories };
  } catch (error) {
    console.error("Error searching products", error);
    return { productDetail: [], categoryDetail: [] };
  }
};
