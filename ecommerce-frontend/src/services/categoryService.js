import axios from 'axios';
import config from '../config';

const API_URL = `${config.apiUrl}/category`;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, categoryData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${categoryId}`, categoryData, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${categoryId}`, {
    headers: { 'x-auth-token': token }
  });
};
