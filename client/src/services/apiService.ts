import axios from 'axios';
import type { NewProduct, ProductData, CartItemData } from '../types';
import { productsSchema, cartSchema, productSchema } from '../schema';

export const fetchProducts = async (): Promise<ProductData[]> => {
  try {
    const result = await axios.get('/api/products');
    return productsSchema.parse(result.data);
  } catch(e: unknown) {
    console.log(e);
    throw e;
  }
}

export const fetchCart = async (): Promise<CartItemData[]> => {
  try {
    const result = await axios.get('/api/cart');
    return cartSchema.parse(result.data);
  } catch (e: unknown) {
    console.log(e);
    throw e;
  }
}

export const addProduct = async (newProduct: NewProduct): Promise<ProductData> => {
  try {
    const result = await axios.post('/api/products', newProduct);
    return productSchema.parse(result.data);
  } catch (e: unknown) {
    console.log(e);
    throw e;
  }
}

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/products/${id}`);
  } catch (e: unknown) {
    console.log(e);
  }
}

export const editProduct = async (updatedProduct: ProductData): Promise<ProductData> => {
  try {
    const result = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
    return productSchema.parse(result.data);
  } catch (e: unknown) {
    console.log(e);
    throw e;
  }
}