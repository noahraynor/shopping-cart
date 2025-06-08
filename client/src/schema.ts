import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().min(0),
  price: z.number().min(0),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _v: z.number().optional(),
});

export const cartItemSchema = z.object({
  _id: z.string().min(1),
  productId: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const productsSchema = z.array(productSchema);

export const cartSchema = z.array(cartItemSchema);