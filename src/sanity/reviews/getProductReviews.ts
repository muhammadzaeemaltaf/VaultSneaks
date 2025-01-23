import { Review } from "../../../sanity.types";
import { client } from "../lib/client";

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  if (!productId) {
    console.error("Product ID is undefined");
    return [];
  }
  const query = `*[_type == "review" && productId == $productId]`;
  const params = { productId };
  const reviews = await client.fetch(query, params);
  return reviews;
};
