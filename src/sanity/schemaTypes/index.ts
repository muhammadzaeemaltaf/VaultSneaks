import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'
import { reviewSchema } from './review'
import { orderSchema } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, reviewSchema, orderSchema],
}
