import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">E-commerce</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {isLoggedIn() && (
          <>
            <li><Link to="/orders">Orders</Link></li>
            {isAdmin() && <li><Link to="/admin">Admin Dashboard</Link></li>}
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
        {!isLoggedIn() && <li><Link to="/login">Login</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
