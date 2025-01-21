import { defineQuery } from "next-sanity";
import { client } from "../lib/client";

export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(
        `*[_type == "product" && defined(category)] {
            "category": category
        } | order(category asc)`
    );
    try {
        const categories = await client.fetch(ALL_CATEGORIES_QUERY);
        const uniqueCategories = Array.from(new Set(categories.map((item: any) => item.category)));
        return uniqueCategories as string[] || [];
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
    }
};
