import { useState, useEffect } from 'react';
import { mockProducts, mockCart } from './mockData/data';
import type { ProductData, CartItemData } from './types';
import { ProductListing } from './components/ProductListing';
import { AddProduct } from './components/AddProduct';
import { Header } from './components/Header';

const App = () => {

  const [products, setProducts] = useState<ProductData[]>([]);
  const [cart, setCart] = useState<CartItemData[]>([]);

  useEffect(() => {
    setProducts(mockProducts);
    setCart(mockCart);
  }, []);

  return (
    <div id="app">
      <Header cart={cart}/>
      <main>
        <ProductListing products={products}/>
        <AddProduct />
      </main>
    </div>
  );
};

export default App;