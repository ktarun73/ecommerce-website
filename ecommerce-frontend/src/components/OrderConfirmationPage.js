import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);}
        catch (error){
        if (error.response && error.response.status=== 401) {
          setError('Unauthorized ');
        } else {
          setError('Error');
        }
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);
  if (error) {
    return (
      <div className="order-confirmation-container"><h1>{error}</h1>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>);
  }
  if (!order) {
return <div>Loading...</div>;
  }

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <p>Order ID: {order._id}</p>
      <p>Username: {order.userId.username}</p>
      <p>Email: {order.userId.email}</p>
      <p>Address: {order.address}</p>
      <h2>Ordered Products</h2>
      <ul>
        {order.products.map((product) => (
    <li key={product._id}>
      {product.productId.name} - {product.quantity} x ${product.productId.price}
    </li>
        ))}
      </ul>
<h3>Total: ${order.totalPrice}</h3>
    </div>
  );
};

export default OrderConfirmationPage;
