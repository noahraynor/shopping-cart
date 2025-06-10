import type { ProductData, CartItemData } from './types';

interface AddProductAction {
  type: "Add_Product",
  payload: {
    newProduct: ProductData,
  }
}

interface GetProductAction {
  type: "Get_Products",
  payload: {
    products: ProductData[];
  }
}

interface UpdateProduct {
  type: "Update_Product",
  payload: {
    updatedProduct: ProductData,
  }
}

interface DeleteProduct {
  type: "Delete_Product",
  payload: {
    id: string,
  }
}

type ProductAction = 
  | AddProductAction
  | GetProductAction
  | UpdateProduct
  | DeleteProduct;

  const updateProductsHelper = (currentProducts: ProductData[], updatedProductData: ProductData): ProductData[] => {
    return currentProducts.map(currentProduct => {
      if (currentProduct._id === updatedProductData._id) {
        return updatedProductData;
      } else {
        return currentProduct;
      }
    });
  }

export const productsReducer = 
  (
    currentState: ProductData[], 
    action: ProductAction,
  ): ProductData[] => {
    switch (action.type) {
      case "Add_Product":
        return [...currentState, action.payload.newProduct];
      case "Get_Products":
        return action.payload.products;
      case "Update_Product":
        return updateProductsHelper(currentState, action.payload.updatedProduct);
      case "Delete_Product":
        return currentState.filter(product => product._id !== action.payload.id);
      default:
        throw new Error(`Unknown product action type`);
    }
  };

  interface GetCart {
    type: "Get_Cart",
    payload: {
      cart: CartItemData[],
    }
  }

  interface AddToCart {
    type: "Add_To_Cart",
    payload: {
      item: CartItemData,
    }
  }

  interface Checkout {
    type: "Checkout",
  }

  type CartAction = 
    | GetCart
    | AddToCart
    | Checkout;

  export const getUpdatedCart = (currentCart: CartItemData[], newItem: CartItemData) => {
    if (!itemInCart(currentCart, newItem.productId)) {
      return [...currentCart, newItem];
    } else {
      return currentCart.map((currentItem) => {
        if (currentItem.productId === newItem.productId) {
          return newItem;
        } else {
          return currentItem;
        }
      });
    }
  }

  const itemInCart = (currentCart: CartItemData[], id: string): boolean => {
    return !!currentCart.find((cartItem) => {
      return cartItem.productId === id;
    });
  }

  export const cartReducer = 
  (
    currentState: CartItemData[], 
    action: CartAction
  ): CartItemData[] => {
    switch (action.type) {
      case 'Get_Cart':
        return action.payload.cart;
      case 'Add_To_Cart':
        return getUpdatedCart(currentState, action.payload.item);
      case 'Checkout':
        return [];
      default:
        throw new Error('Unkown cart action type');
    }
  }