export type NewProduct = Omit<ProductData, '_id'>;

export interface ProductData {
  _id: string,
  title: string,
  quantity: number,
  price: number,
}

export interface CartItemData {
  _id: string,
  productID: string,
  title: string,
  quantity: number,
  price: number,
}