import axios from 'axios';
import config from '../config';

const API_URL = `${config.apiUrl}/products`;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};


export const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, productData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${productId}`, productData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const deleteProduct = async (productId) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${productId}`, {
    headers: { 'x-auth-token': token }
  });
};