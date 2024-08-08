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
    return <div className="myorders-loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="myorders-error">
        Error: {error}
        <Link to="/" className="myorders-link-home">Go to Home</Link>
      </div>
    );
  }
  return (
    <div className="myorders-container">
      <h1 className="myorders-title">My Orders</h1>
      <ul className="myorders-list">
        {orders.map(order => (
          <li key={order._id} className="myorders-item">
            <h2 className="myorders-order-id">Order ID: {order._id}</h2>
            <p className="myorders-order-price">Total Price: ${order.totalPrice}</p>
            <p className="myorders-order-address">Address: {order.address}</p>
            <h3 className="myorders-products-title">Products:</h3>
            <ul className="myorders-products-list">
              {order.products.map(product => (
                <li key={product._id} className="myorders-product-item">
                  {product.productId ? (
                    <>
                      {product.productId.name} - {product.quantity} x ${product.productId.price}
                    </>
                  ) : (
                    <>Product information not available</>
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
