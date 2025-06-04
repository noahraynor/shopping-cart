import type { ProductData } from '../types';
import { Product } from './Product';

interface ProductListingProps {
  products: ProductData[],
};

export const ProductListing = ({ products }: ProductListingProps) => {
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
                    <Product key={product._id} product={product} />
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