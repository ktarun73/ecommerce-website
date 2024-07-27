import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryService';
import './Categories.css';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? 'selected' : ''}
        >
          All Products
        </li>
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={selectedCategory === category._id ? 'selected' : ''}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
