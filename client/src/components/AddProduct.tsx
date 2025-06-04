import { AddForm } from './AddForm';
import { useState } from 'react';

export const AddProduct = () => {
  const [addProductVisible, setAddProductVisible] = useState<boolean>(false);

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
          <AddForm setAddProductVisible={setAddProductVisible} />
        )
      }
    </>
  );
};