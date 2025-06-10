import React from 'react';
import type { ProductData, NewProduct } from './types';
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
import { productsReducer, cartReducer } from './reducers';

const App = () => {

  const [productsState, productDispatch] = React.useReducer(
    productsReducer,
    [],
  );

  const [cartState, cartDispatch] = React.useReducer(
    cartReducer, 
    []
  );

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