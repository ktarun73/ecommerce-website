import { InvalidTokenError, jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    return decoded ? true : false;
  }
  return false;
};

export const isAdmin = () => {
  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    return decoded && decoded.role ==='admin';
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('cart');
  localStorage.removeItem('token');
};
