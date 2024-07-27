import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import Categories from './components/Categories';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar'; 
import { isLoggedIn } from './utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar /> {}
        <header className="App-header">
          <h1>Welcome to the E-commerce App</h1>
        </header>
        <main>
          <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> {}
          <Routes>
            <Route exact path="/" element={<ProductList selectedCategory={selectedCategory} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
