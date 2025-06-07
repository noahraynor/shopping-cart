import React from 'react';
import type { NewProduct } from '../types'
import { ProductForm } from './ProductForm';

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
      <ProductForm 
        setAddProductVisible={setAddProductVisible}
        productName={productName}
        productPrice={productPrice}
        productQuantity={productQuantity}
        setProductName={setProductName}
        setProductPrice={setProductPrice}
        setProductQuantity={setProductQuantity}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};