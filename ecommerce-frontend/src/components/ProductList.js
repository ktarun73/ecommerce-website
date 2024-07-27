import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../services/productService';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';
import './ProductList.css';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateQuantity } = useCart();
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
      navigate('/login'); 
      return;
    }
    addToCart(product); 
  };

  const handleUpdateQuantity = (e, product, quantity) => {
    e.stopPropagation();
    updateQuantity(product._id, quantity);
  };

  const handleProductClick = (product) => {
    // product detail page logic
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
                    <button onClick={(e) => handleUpdateQuantity(e, product, 1)}>+</button>
                  </div>
                ) : (
                  <button onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
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
