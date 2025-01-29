import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'
import { reviewSchema } from './review'
import { orderSchema } from './order'
import { categoriesSchema } from './categories'
import { UserSchema } from './users'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, reviewSchema, orderSchema, categoriesSchema, UserSchema],
}
