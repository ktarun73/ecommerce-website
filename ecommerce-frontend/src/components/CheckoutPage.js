import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { isLoggedIn } from '../utils/auth';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [address, setAddress]=useState('');
  const [products, setProducts]= useState([]);
  const [totalPrice, setTotalPrice] =useState(0);
  const [cardNumber, setCardNumber] =useState('');
  const [expiry, setExpiry]= useState('');
  const [cvv, setCvv] =useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {navigate('/login');
      return;
    }
    const fetchCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) ||[];
      if (cart.length === 0) {
        navigate('/');
    return;
      }
      setProducts(cart);
      const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
 setTotalPrice(total);
    };

    fetchCart();
  }, [navigate]);

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleCVVChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value;
    if (/^\d{0,4}$/.test(value.replace("/", ""))) {
      if (value.length === 2 && !value.includes("/")) {
        value = value + "/";
      } else if (value.length === 3 && value.includes("/")) {
        value = value.slice(0, 2);
      }
      setExpiry(value);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cardNumber.length !== 16) {
      alert('Please enter valid card number');
      return;
    }
    if (cvv.length !== 3) {
        alert('Please enter valid cvv.');
        return;
      }
    try {
      const orderData = {
        address,
        products: products.map((product) => ({ productId: product._id, quantity: product.quantity })),
      };
      const order = await createOrder(orderData);
      // remove all cart items after ordering is done
      localStorage.removeItem('cart')
      navigate(`/order-confirmation/${order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div className="form-section">
          <label htmlFor="address">Shipping Address:</label>
          <input
          type="text" id="address" placeholder="Address" value={address}onChange={(e) => setAddress(e.target.value)} required/>
        </div>
        <div className="form-section">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text"
            id="cardNumber" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange}
            required/>
        </div>
        <div className="form-section">
          <label htmlFor="expiry">Expiry Date (MM/YY):</label>
          <input type="text" id="expiry" placeholder="MM/YY" value={expiry} onChange={handleExpiryChange} required/>
        </div>
        <div className="form-section">
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" placeholder="CVV" value={cvv} onChange={handleCVVChange} required
          />
        </div>
        <h2>Order Summary</h2>
        <ul className="order-summary">
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - {product.quantity} x ${product.price} </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice}</h3>
    <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
