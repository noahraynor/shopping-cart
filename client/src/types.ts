export type NewProduct = Omit<ProductData, '_id'>;

export interface ProductData {
  _id: string,
  title: string,
  quantity: number,
  price: number,
  createdAt?: string,
  updatedAt?: string,
  _v?: number,
}

export interface CartItemData {
  _id: string,
  productID: string,
  title: string,
  quantity: number,
  price: number,
}