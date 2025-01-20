import { client } from "../lib/client";

export const getProductsUnderPriceRange = async (priceRange: string) => {
  let priceCondition = "";

  // Define price conditions based on the provided range
  if (priceRange === "Under ₹2,500.00") {
    priceCondition = "price < 2500";
  } else if (priceRange === "₹2,501.00 - ₹5,000.00") {
    priceCondition = "price >= 2501 && price <= 5000";
  } else if (priceRange === "₹5,001.00+") {
    priceCondition = "price > 5000";
  }

  // Construct the query string only if a valid price condition exists
  const query = priceCondition
    ? `*[_type=="product" && ${priceCondition}] | order(name asc)`
    : `*[_type=="product"] | order(name asc)`;

  try {
    // Fetch the products using the constructed query
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error("Error fetching products under price range", error);
    return [];
  }
};