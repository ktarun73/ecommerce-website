import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../services/productService';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';
import './ProductList.css';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        let products;
        if (selectedCategory) {
          products = await fetchProductsByCategory(selectedCategory);
        } else {
          products = await fetchProducts();
        }
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, [selectedCategory]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      navigate('/login?code=loginRequired'); 
      return;
    }
    addToCart(product); 
  };

  const addToCartPromise = (product) => {
    return new Promise((resolve, reject) => {
      try {
        addToCart(product);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      navigate('/login?code=loginRequired');
      return;
    }
    addToCartPromise(product)
      .then(() => {
        navigate('/checkout');
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('An error occurred while adding the product to the cart. Please try again.');
      });
  };

  const handleUpdateQuantity = (e, product, quantity) => {
    e.stopPropagation();
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

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products in this category</p>
      ) : (
        products.map((product) => {
          const cartItem = cart.find((item) => item._id === product._id);
          return (
            <div className="product-item" key={product._id} onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="price">${product.price}</p>
              <div className="button-container">
                {cartItem ? (
                  <div className="quantity-controls">
                    <button onClick={(e) => handleUpdateQuantity(e, product, -1)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button 
                      onClick={(e) => handleUpdateQuantity(e, product, 1)} 
                      disabled={cartItem.quantity >= product.stock}
                      className={cartItem.quantity >= product.stock ? 'disabled' : ''}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={(e) => handleAddToCart(e, product)} disabled={product.stock === 0}>Add to Cart</button>
                    <button onClick={(e) => handleBuyNow(e, product)} className="buy-now-button" disabled={product.stock === 0}>Buy Now</button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductList;
