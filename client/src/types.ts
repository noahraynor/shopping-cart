import { z } from "zod";
import { productSchema, cartItemSchema } from './schema.ts';

export type ProductData = z.infer<typeof productSchema>;
export type CartItemData = z.infer<typeof cartItemSchema>;
export type NewProduct = Omit<ProductData, '_id'>;
