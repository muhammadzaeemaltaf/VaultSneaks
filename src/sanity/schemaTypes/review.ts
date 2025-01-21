import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "productId",
      title: "Product ID",
      type: "string",
    }),
    defineField({
      name: "reviewId",
      title: "Review ID",
      type: "string",
    }),
    defineField({
      name: "reviewerName",
      title: "Reviewer Name",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "text",
    }),
    defineField({
      name: "reviewDate",
      title: "Review Date",
      type: "datetime",
    }),
    defineField({
      name: "reviewPicture",
      title: "Review Pictures",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
