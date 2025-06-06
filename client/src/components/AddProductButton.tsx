import { AddProductForm } from './AddProductForm';
import React from 'react';
import type { NewProduct } from '../types'

interface AddProductButtonProps {
  onAddProduct: (newProduct: NewProduct) => void,
}

export const AddProductButton = ({ onAddProduct }: AddProductButtonProps) => {
  const [addProductVisible, setAddProductVisible] = React.useState<boolean>(false);

  return (
    <>
      {
        !addProductVisible && (
          <p>
            <button className="add-product-button" onClick={() => setAddProductVisible(true)}>Add A Product</button>
          </p>
        )
      }
      {
        addProductVisible && (
          <AddProductForm setAddProductVisible={setAddProductVisible} onAddProduct={onAddProduct} />
        )
      }
    </>
  );
};