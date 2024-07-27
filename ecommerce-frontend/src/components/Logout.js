import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
