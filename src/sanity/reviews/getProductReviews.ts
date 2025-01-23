import { defineQuery } from "next-sanity";
import { Review } from "../../../sanity.types";
import { client } from "../lib/client";

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  console.log(productId)
  try {
    const PRODUCT_REVIEW_BY_ID = defineQuery(`
      *[_type == "review" && references(^._id) && references(^._id)] `)
    const params = { productId };
    const reviews = await client.fetch(PRODUCT_REVIEW_BY_ID, params);
    return reviews || [];
  } catch (error) {
    console.error("Error fetching product reviews", error);
    return [];
  }
};
