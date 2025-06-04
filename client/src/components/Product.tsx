import type { ProductData } from '../types';
import { EditForm } from './EditForm';
import { useState } from 'react';

interface ProductProps {
  product: ProductData,
};

export const Product = ({ product }: ProductProps) => {

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={() => setEditMode(true)}>Edit</button>
        </div>
        <button className="delete-button"><span>X</span></button>
      </div>

      {
        editMode && (
          <EditForm setEditMode={setEditMode} product={product}/>
        )
      }
    </li>
  );
};