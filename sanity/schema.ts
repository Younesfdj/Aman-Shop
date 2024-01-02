import { product } from "./schemas/product-schema";
import { client } from "./schemas/client-schema";

import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,client],
};
