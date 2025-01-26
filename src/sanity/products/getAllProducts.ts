import { client } from "../lib/client";

export const getAllProducts = async (sortBy = "productName") => {
  let sortField;
  if (sortBy === "price") {
    sortField = "price";
  } else if (sortBy === "category") {
    sortField = "category->categoryName";
  } else {
    sortField = "productName";
  }

  // Correctly format the query as a string
  const ALL_PRODUCTS_QUERY = `
    *[_type == "product"] | order(${sortField} asc) {
      ...,
      "categoryName": category->categoryName
    }
  `;

  try {
    // Fetch products using the query string directly
    const products = await client.fetch(ALL_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
