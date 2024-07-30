import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getOrdersForLoggedInUser } from '../services/orderService';
import { isLoggedIn } from '../utils/auth';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login?code=loginRequired');
      return;
    }
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersForLoggedInUser();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="error">
        Error: {error}
        <Link to="/" className="link-home">Go to Home</Link>
      </div>
    );
  }
  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id} className="order-item">
            <h2>Order ID: {order._id}</h2>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Address: {order.address}</p>
            <h3>Products:</h3>
            <ul>
              {order.products.map(product => (
                <li key={product._id} className="product-item">
                  {product.productId ? (
                    <>
                      {product.productId.name} - {product.quantity} x ${product.productId.price}
                    </>
                  ):(<>Product information not available</>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrdersPage;
