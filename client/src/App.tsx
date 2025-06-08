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

const App = () => {

  const [products, setProducts] = React.useState<ProductData[]>([]);
  const [cart, setCart] = React.useState<CartItemData[]>([]);


  React.useEffect((): void => {
    const getProducts = async (): Promise<void> => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch(e: unknown) {
        console.error(e);
      }
    }

    const getCart = async (): Promise<void> => {
      try {
        const fetchedCart = await fetchCart();
        setCart(fetchedCart);
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
      setProducts((oldProducts: ProductData[]) => [...oldProducts, addedProduct]);
    } catch (e) {
      console.error(e);
    }
  }



  const handleAddToCart = async (id: string): Promise<void> => {
    const getUpdatedCart = (oldCart: CartItemData[], newItem: CartItemData) => {
      if (!itemIsInCart(oldCart)) {
        return [...oldCart, newItem];
      } else {
        return oldCart.map((oldItem) => {
          if (oldItem.productId === id) {
            return newItem;
          } else {
            return oldItem;
          }
        });
      }
    }

    const itemIsInCart = (oldCart: CartItemData[]): boolean => {
      return !!oldCart.find((cartItem) => {
        return cartItem.productId === id;
      });
    }

    try {
      const result = await addToCart(id);
      setProducts((oldProducts) => createUpdatedProducts(oldProducts, result.product));
      setCart((oldCart) => getUpdatedCart(oldCart, result.item));
    } catch (e: unknown) {
      console.log(e)
    }
  }


  const handleCheckout = async () => {
    try {
      await checkout();
      setCart([]);
    } catch (e: unknown) {
      console.log(e);
    }
  }


  const handleDeleteProduct = async (id: string): Promise<void> => {
    try {
      await deleteProduct(id);
      setProducts((oldProducts) => oldProducts.filter(product => product._id !== id));
    } catch (e: unknown) {
      console.error(e);
    }
  }


  const createUpdatedProducts = (oldProducts: ProductData[], updatedProductData: ProductData): ProductData[] => {
    return oldProducts.map(product => {
      if (product._id === updatedProductData._id) {
        return updatedProductData;
      } else {
        return product;
      }
    });
  }


  const handleEditProduct = async (newProductData: ProductData): Promise<void> => {
    try {
      const updatedProductData = await editProduct(newProductData)
      setProducts((oldProducts) => createUpdatedProducts(oldProducts, updatedProductData));
    } catch (e: unknown) {
      console.error(e);
    }
  }


  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout}/>
      <main>
        <Products 
          products={products} 
          onEditProduct={handleEditProduct} 
          onDeleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
        />
        <ToggleableAddProductForm onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};


export default App;