import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    navigate('/login');
    return null;
  }
  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = () => {
    // implement checkout here
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product._id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(product._id, -1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => updateQuantity(product._id, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(product._id)} className="remove-button">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
