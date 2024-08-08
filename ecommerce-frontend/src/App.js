import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Categories from './components/Categories';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import { isLoggedIn } from './utils/auth';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import MyOrdersPage from './components/MyOrdersPage';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <MainContent 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

const MainContent = ({ selectedCategory, setSelectedCategory }) => {
  const location = useLocation();

  return (
    <main>
      {location.pathname === '/' && (
        <Categories 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}
      <Routes>
        <Route exact path="/" element={<ProductList selectedCategory={selectedCategory} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetails />} /> {}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />}/>
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
