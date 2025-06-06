import type { ProductData } from '../types';
import React from 'react';

interface EditProductFormProps {
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>,
  product: ProductData,
  onEditProduct: (updatedProduct: ProductData) => void
};

export const EditProductForm = ({ setShowEditForm, product, onEditProduct }: EditProductFormProps) => {

  const [productName, setProductName] = React.useState(product.title);
  const [productPrice, setProductPrice] = React.useState(product.price);
  const [productQuantity, setProductQuantity] = React.useState(product.quantity);

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>, updatedProduct: ProductData) => {
    e.preventDefault();
    onEditProduct(updatedProduct);
    setShowEditForm(false);
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={(e) => handleEditProduct(e, {_id: product._id, title: productName, quantity: productQuantity, price: productPrice})}>
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
          <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};