import React from 'react';
import axios from 'axios';
import type { ProductData, CartItemData, NewProduct } from './types';
import { Products } from './components/Products';
import { AddProductButton } from './components/AddProductButton';
import { Header } from './components/Header';


const App = () => {

  const [products, setProducts] = React.useState<ProductData[]>([]);
  const [cart, setCart] = React.useState<CartItemData[]>([]);


  React.useEffect((): void => {
    const fetchProducts = async (): Promise<void> => {
      try {
        let { data } = await axios.get('/api/products');
        console.log(data)
        setProducts(data);
      } catch(e: unknown) {
        console.log(e);
      }
    };

    const fetchCart = async (): Promise<void> => {
      try {
        let { data } = await axios.get('/api/cart');
        console.log(data)
        setCart(data);
      } catch (e: unknown) {
        console.log(e);
      }
    }

    fetchCart();
    fetchProducts();
  }, []);


  const handleAddProduct = async (newProduct: NewProduct): Promise<void> => {
    try {
      const result = await axios.post('/api/products', newProduct);
      const processedProduct = result.data;
      setProducts((oldProducts: ProductData[]) => [...oldProducts, processedProduct]);
    } catch (e: unknown) {
      console.log(e);
    }
  }


  const handleDeleteProduct = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((oldProducts) => oldProducts.filter(product => product._id !== id));
    } catch (e: unknown) {
      console.log(e);
    }
  }


  const handleEditProduct = async (updatedProduct: ProductData): Promise<void> => {
    const createUpdatedProducts = (oldProducts: ProductData[], updatedProductData: ProductData): ProductData[] => {
      return oldProducts.map(product => {
        if (product._id === updatedProductData._id) {
          return updatedProductData;
        } else {
          return product;
        }
      });
    }

    try {
      const result = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
      const updatedProductData = result.data;
      setProducts((oldProducts) => createUpdatedProducts(oldProducts, updatedProductData));
    } catch (e: unknown) {
      console.log(e);
    }
  }


  return (
    <div id="app">
      <Header cart={cart}/>
      <main>
        <Products products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct}/>
        <AddProductButton onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};


export default App;