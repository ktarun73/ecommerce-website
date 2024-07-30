import React, { useState } from 'react';
import { useNavigate, Navigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { isLoggedIn } from '../utils/auth';
import './Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const location = useLocation();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);};

  const queryParams = getQueryParams(location.search);
  const code = queryParams.get('code');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/users/login`, { identifier, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  if (isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {code === 'loginRequired' && <p>Please log first</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username or Email" 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
