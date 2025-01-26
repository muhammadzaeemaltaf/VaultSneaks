import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(`
        *[_type == "category"] | order(categoryName asc)
    `);
    try {
        const categories = await client.fetch(ALL_CATEGORIES_QUERY);
        return categories || [];
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
    }
};
