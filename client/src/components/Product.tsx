import type { ProductData } from '../types';
import { EditProductForm } from './EditProductForm';
import { useState } from 'react';

interface ProductProps {
  product: ProductData,
  onEditProduct: (updatedProduct: ProductData) => void,
  onDeleteProduct: (id: string) => void,
  onAddToCart: (id: string) => void,
};

export const Product = (
  { 
    product, 
    onEditProduct, 
    onDeleteProduct,
    onAddToCart,
  }: ProductProps
) => {

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const inStock = (): boolean => {
    return product.quantity > 0;
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart(product._id);
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          {!showEditForm && (
            <>
              <button 
                className="add-to-cart" 
                disabled={inStock() ? false : true}
                onClick={(e) => handleAddToCart(e)}
              >
                Add to Cart
              </button>
              <button 
                className="edit" 
                onClick={() => setShowEditForm((showEditForm) => !showEditForm)}
              >
                Edit
              </button>
            </>
          )}
          </div>
        <button 
          className="delete-button" 
          data-testid={product._id}
          onClick={() => onDeleteProduct(product._id)}>
            <span>X</span>
        </button>
      </div>

      {
        showEditForm && (
          <
            EditProductForm 
              setShowEditForm={setShowEditForm} 
              product={product}
              onEditProduct={onEditProduct}
          />
        )
      }
    </li>
  );
};