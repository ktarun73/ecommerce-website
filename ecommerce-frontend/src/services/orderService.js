import axios from 'axios';
import config from '../config';

const API_URL = `${config.apiUrl}/orders`;

export const createOrder = async (orderData) => {
  try {
const token=localStorage.getItem('token');
const response = await axios.post(API_URL, orderData, {headers: {'x-auth-token': token}});
    return response.data;
  } catch (error) {
console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${orderId}`, {headers: {'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
console.error('Error fetching order by ID:', error);
throw error;
  }
};


export const getOrdersForLoggedInUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/my-orders`, {
        headers: {
          'x-auth-token': token
    }
});
      return response.data;
    }catch (error) {
    console.error('Error fetching orders', error);
      throw error;
    }
  };