
import { BoxesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const categoriesSchema = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: BoxesIcon,
    fields: [
      defineField({
        name: 'categoryName',
        title: 'Category Name',
        type: 'string',
        description: 'The name of the category',
      })
    ],
  });
  