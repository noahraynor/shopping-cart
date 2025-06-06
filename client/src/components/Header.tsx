import type { CartItemData } from '../types';

interface HeaderProps {
  cart: CartItemData[],
};

export const Header = ({ cart }: HeaderProps) => {

  const getCartTotal = (): number => {
    let result = 0;
    cart.forEach(cartItem => {
      result += (cartItem.price * cartItem.quantity);
    });
    return result
  };

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {
          cart.length <= 0 && (
            <>
              <p>Your cart is empty</p>
              <p>Total: $0</p>
              <button className="checkout" disabled>Checkout</button>
            </>
          )
        }
        {
          cart.length > 0 && (
            <>
              <table className="cart-items">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(cartItem => {
                    return (
                      <tr key={cartItem._id}>
                        <td>{cartItem.title}</td>
                        <td>{cartItem.quantity}</td>
                        <td>${cartItem.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="total">Total: ${getCartTotal().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
              <button className="checkout">Checkout</button>
            </>
          )
        }

      </div>
    </header >
  );
};