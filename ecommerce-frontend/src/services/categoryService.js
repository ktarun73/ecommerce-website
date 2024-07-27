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
