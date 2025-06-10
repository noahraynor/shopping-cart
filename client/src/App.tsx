import React from 'react';
import type { ProductData, CartItemData, NewProduct } from './types';
import { Products } from './components/Products';
import { ToggleableAddProductForm } from './components/ToggleableAddProductForm';
import { Header } from './components/Header';
import { 
  addProduct, 
  fetchProducts, 
  fetchCart, 
  deleteProduct, 
  editProduct,  
  addToCart,
  checkout,
} from './services/apiService';

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

const productsReducer = 
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

  const getUpdatedCart = (currentCart: CartItemData[], newItem: CartItemData) => {
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

  const cartReducer = 
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

const App = () => {

  const [productsState, productDispatch] = React.useReducer(
    productsReducer,
    [],
  );

  const [cartState, cartDispatch] = React.useReducer(cartReducer, []);

  React.useEffect((): void => {
    const getProducts = async (): Promise<void> => {
      try {
        const newProducts = await fetchProducts();
        productDispatch({ type: "Get_Products", payload: {products: newProducts} })
      } catch(e: unknown) {
        console.error(e);
      }
    }

    const getCart = async (): Promise<void> => {
      try {
        const fetchedCart = await fetchCart();
        cartDispatch({ type: "Get_Cart", payload: {cart: fetchedCart} })
      } catch (e: unknown) {
        console.error(e);
      }
    }

    getProducts();
    getCart();
  }, []);


  const handleAddProduct = async (newProduct: NewProduct): Promise<void> => {
    try {
      const addedProduct = await addProduct(newProduct);
      productDispatch({ type: "Add_Product", payload: {newProduct: addedProduct} })
    } catch (e) {
      console.error(e);
    }
  }

  const handleDeleteProduct = async (id: string): Promise<void> => {
    try {
      await deleteProduct(id);
      productDispatch({ type: "Delete_Product", payload: {id} })
    } catch (e: unknown) {
      console.error(e);
    }
  }

  const handleUpdateProduct = async (updatedProductData: ProductData): Promise<void> => {
    try {
      const updatedProduct = await editProduct(updatedProductData)
      productDispatch(
        { 
          type: "Update_Product", 
          payload: {updatedProduct: updatedProduct} 
        }
      )
    } catch (e: unknown) {
      console.error(e);
    }
  }

  const handleAddToCart = async (id: string): Promise<void> => {
    try {
      const result = await addToCart(id);
      productDispatch({ type: "Update_Product", payload: {updatedProduct: result.product} })
      cartDispatch( {type: "Add_To_Cart", payload: {item: result.item}} )
    } catch (e: unknown) {
      console.log(e)
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout();
      cartDispatch( {type: "Checkout"})
    } catch (e: unknown) {
      console.log(e);
    }
  }








  return (
    <div id="app">
      <Header cart={cartState} onCheckout={handleCheckout}/>
      <main>
        <Products 
          products={productsState} 
          onEditProduct={handleUpdateProduct} 
          onDeleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};


export default App;