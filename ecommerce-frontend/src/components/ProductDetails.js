import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductAndCategory = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);

        if (productData) {
          const categories = await fetchCategories();
          const productCategory = categories.find(category => category._id === productData.categoryId);
          setCategoryName(productCategory ? productCategory.name : 'Unknown Category');
        }
      } catch (error) {
        console.error('Error fetching product details or categories:', error);
      } finally {
        setLoading(false);
      }
    };

    getProductAndCategory();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      navigate('/login?code=loginRequired');
      return;
    }
    addToCart(product);
  };

  const handleUpdateQuantity = (quantity) => {
    const cartItem = cart.find((item) => item._id === product._id);
    if (cartItem && cartItem.quantity + quantity > product.stock) {
      alert('Cannot add more than available stock');
      return;
    }
    if (cartItem && cartItem.quantity + quantity <= 0) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, quantity);
    }
  };

  const cartItem = cart.find((item) => item._id === product._id);

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Category: {categoryName}</p>
        <div className="button-container">
          {cartItem ? (
            <div className="quantity-controls">
              <button onClick={() => handleUpdateQuantity(-1)}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => handleUpdateQuantity(1)} disabled={cartItem.quantity >= product.stock}>+</button>
            </div>
          ) : (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
