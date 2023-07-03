import { type SchemaTypeDefinition } from 'sanity';
import { products } from './products';
import { category } from './category';
import { Tags } from './tags';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category ,products , Tags],
}
