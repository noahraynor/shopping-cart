import React from 'react';

interface ProductFormProps {
  setAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>,
  productName: string,
  productPrice: string,
  productQuantity: string,
  setProductName: React.Dispatch<React.SetStateAction<string>>,
  setProductPrice: React.Dispatch<React.SetStateAction<string>>,
  setProductQuantity: React.Dispatch<React.SetStateAction<string>>,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ProductForm = ({
    setAddProductVisible,
    productName,
    productPrice,
    productQuantity,
    setProductName,
    setProductPrice,
    setProductQuantity,
    onSubmit,
  }: ProductFormProps) => {

  return (
    <form onSubmit={onSubmit}>
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
  )
}