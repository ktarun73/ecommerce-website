import axios from 'axios';
import config from '../config';
const API_URL =  `${config.apiUrl}/products`;

export const fetchProducts = async ()=> {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:',error);
    throw error;
  }
};
