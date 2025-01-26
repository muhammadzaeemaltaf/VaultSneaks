import { client } from "../lib/client";

export const getMenProducts = async () => {
  const MEN_PRODUCTS_QUERY = `
    *[_type == "product" && 
      category->categoryName match "*Men*" && 
      !(category->categoryName match "*Women*")
    ] | order(name asc)
  `;

  try {
    // Fetch the products using the Sanity client
    const products = await client.fetch(MEN_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
