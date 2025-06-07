import { AddProductForm } from './AddProductForm';
import React from 'react';
import type { NewProduct } from '../types'


interface ToggleableAddProductFormProps {
  onAddProduct: (newProduct: NewProduct) => void,
}

export const ToggleableAddProductForm = (
  { 
    onAddProduct 
  }: ToggleableAddProductFormProps
) => {
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