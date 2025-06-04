import type { ProductData } from '../types';
import { useState } from 'react';

interface EditFormProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  product: ProductData,
};

export const EditForm = ({ setEditMode, product }: EditFormProps) => {

  const [productName, setProductName] = useState(product.title);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productQuantity, setProductQuantity] = useState(product.quantity);

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            aria-label="Product Name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={productPrice}
            aria-label="Product Price"
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={productQuantity}
            aria-label="Product Quantity"
            onChange={(e) => setProductQuantity(Number(e.target.value))}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};