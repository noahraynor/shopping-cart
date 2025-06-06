import React from 'react';
import type { NewProduct } from '../types'

interface AddProductFormProps {
  setAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onAddProduct: (newProduct: NewProduct) => void,
};

export const AddProductForm = ({ setAddProductVisible, onAddProduct }: AddProductFormProps) => {
  const [productName, setProductName] = React.useState<string>("");
  const [productPrice, setProductPrice] = React.useState<string>("");
  const [productQuantity, setProductQuantity] = React.useState<string>("");

  const clearAddProduct = () => {
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
  }

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onAddProduct({title: productName, quantity: Number(productQuantity), price: Number(productPrice)})
    clearAddProduct();
  };

  return (
    <div className="add-form">
      <form onSubmit={(e) => handleAddProduct(e)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={productName}
            onChange={(e) => (setProductName(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={productPrice}
            onChange={(e) => (setProductPrice(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={productQuantity}
            onChange={(e) => (setProductQuantity(e.target.value))}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={() => setAddProductVisible(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};