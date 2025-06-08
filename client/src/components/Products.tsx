import type { ProductData } from '../types';
import { Product } from './Product';

interface ProductsProps {
  products: ProductData[],
  onEditProduct: (updatedProduct: ProductData) => void,
  onDeleteProduct: (id: string) => void,
  onAddToCart: (id: string) => void,
};

export const Products = ({ products, onEditProduct, onDeleteProduct, onAddToCart }: ProductsProps) => {
  return (
    <>
      {
        products.length > 0 && (
          <div className="product-listing">
            <h2>Products</h2>
            <ul className="product-list">
              {
                products.map(product => {
                  return (
                    <Product 
                      key={product._id} 
                      product={product} 
                      onDeleteProduct={onDeleteProduct} 
                      onEditProduct={onEditProduct} 
                      onAddToCart={onAddToCart}
                    />
                  );
                })
              }
            </ul>
          </div>
        )
      }
      {
        products.length <= 0 && (
          <p>No Products!</p>
        )
      } 
    </>
  );
};