import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/auth';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', categoryId: '', image: '', stock: '' });
  const [categoryInputs, setCategoryInputs] = useState({});
  const [productInputs, setProductInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login?code=adminLoginRequired');
      return;
    }

    if (!isAdmin()) {
      navigate('/');
      return;
    }

    fetchCategories().then(categories => {
      setCategories(categories);
      const initialInputs = categories.reduce((acc, category) => {
        acc[category._id] = { ...category };
        return acc;
      }, {});
      setCategoryInputs(initialInputs);
    });
    fetchProducts().then(products => {
      setProducts(products);
      const initialInputs = products.reduce((acc, product) => {
        acc[product._id] = { ...product };
        return acc;
      }, {});
      setProductInputs(initialInputs);
    });
  }, [navigate]);

  const handleCreateCategory = async () => {
    try {
      const category = await createCategory({ name: newCategoryName });
      setCategories([...categories, category]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category. Please try again.');
    }
  };

  const handleUpdateCategory = async (categoryId, updatedCategory) => {
    try {
      const category = await updateCategory(categoryId, updatedCategory);
      setCategories(categories.map(cat => cat._id === categoryId ? category : cat));
      alert('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category. Please try again.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      alert('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category. Please try again.');
    }
  };

  const handleCreateProduct = async () => {
    try {
      const product = await createProduct(newProduct);
      setProducts([...products, product]);
      setNewProduct({ name: '', description: '', price: '', categoryId: '', image: '', stock: '' });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      const product = await updateProduct(productId, updatedProduct);
      setProducts(products.map(prod => prod._id === productId ? product : prod));
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(prod => prod._id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      e.target.setCustomValidity('');
    } else {
      e.target.setCustomValidity('Only numbers are allowed');
    }
    e.target.reportValidity();
    e.target.value = value.replace(/[^\d]/g, '');
  };

  const handleCategoryInputChange = (categoryId, field, value) => {
    setCategoryInputs({
      ...categoryInputs,
      [categoryId]: {
        ...categoryInputs[categoryId],
        [field]: value
      }
    });
  };

  const handleProductInputChange = (productId, field, value) => {
    setProductInputs({
      ...productInputs,
      [productId]: {
        ...productInputs[productId],
        [field]: value
      }
    });
  };

  const handleCategoryUpdateClick = (categoryId) => {
    handleUpdateCategory(categoryId, categoryInputs[categoryId]);
  };

  const handleProductUpdateClick = (productId) => {
    handleUpdateProduct(productId, productInputs[productId]);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-section">
        <h2>Categories</h2>
        <input 
          type="text" 
          placeholder="New Category Name" 
          value={newCategoryName} 
          onChange={(e) => setNewCategoryName(e.target.value)} 
        />
        <button className="admin-button" onClick={handleCreateCategory}>Create Category</button>
        <ul className="admin-ul">
          {categories.map(category => (
            <li key={category._id} className="admin-li">
              <input 
                type="text" 
                value={categoryInputs[category._id]?.name || ''} 
                onChange={(e) => handleCategoryInputChange(category._id, 'name', e.target.value)} 
              />
              <button className="admin-button" onClick={() => handleCategoryUpdateClick(category._id)}>Update</button>
              <button className="admin-button" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="admin-section">
        <h2>Products</h2>
        <div className="admin-form-group">
          <input 
            type="text" 
            placeholder="Product Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={newProduct.description} 
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Price" 
            value={newProduct.price} 
            onInput={handleNumberInput} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Image URL" 
            value={newProduct.image} 
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Stock" 
            value={newProduct.stock} 
            onInput={handleNumberInput} 
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} 
          />
          <select 
            value={newProduct.categoryId} 
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })} 
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <button className="admin-button" onClick={handleCreateProduct}>Create Product</button>
        </div>
        <ul className="admin-ul">
          {products.map(product => (
            <li key={product._id} className="admin-li">
              <input 
                type="text" 
                value={productInputs[product._id]?.name || ''} 
                onChange={(e) => handleProductInputChange(product._id, 'name', e.target.value)} 
              />
              <input 
                type="text" 
                value={productInputs[product._id]?.description || ''} 
                onChange={(e) => handleProductInputChange(product._id, 'description', e.target.value)} 
              />
              <input 
                type="text" 
                value={productInputs[product._id]?.price || ''} 
                onInput={handleNumberInput} 
                onChange={(e) => handleProductInputChange(product._id, 'price', e.target.value)} 
              />
              <input 
                type="text" 
                value={productInputs[product._id]?.image || ''} 
                onChange={(e) => handleProductInputChange(product._id, 'image', e.target.value)} 
              />
              <input 
                type="text" 
                value={productInputs[product._id]?.stock || ''} 
                onInput={handleNumberInput} 
                onChange={(e) => handleProductInputChange(product._id, 'stock', e.target.value)} 
              />
              <select 
                value={productInputs[product._id]?.categoryId || ''} 
                onChange={(e) => handleProductInputChange(product._id, 'categoryId', e.target.value)} 
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
              <button className="admin-button" onClick={() => handleProductUpdateClick(product._id)}>Update</button>
              <button className="admin-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

