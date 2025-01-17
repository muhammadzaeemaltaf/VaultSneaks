import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema],
}
