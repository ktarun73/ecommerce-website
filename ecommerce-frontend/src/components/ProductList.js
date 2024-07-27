import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../services/productService';
import './ProductList.css';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

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
    // add to cart logic
  };

  const handleBuy = (e, product) => {
    e.stopPropagation();
    // buy product logic
  };

  const handleProductClick = (product) => {
    // product detail page logic
  };

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products in this category</p>
      ) : (
        products.map((product) => (
          <div className="product-item" key={product._id} onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <div className="button-container">
              <button onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
              <button className="buy-button" onClick={(e) => handleBuy(e, product)}>Buy</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
