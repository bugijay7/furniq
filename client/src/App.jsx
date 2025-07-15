import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Shop from './Pages/Shop.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import Checkout from './Pages/Checkout.jsx';
import Contact from './Pages/Contact.jsx';
import Faqs from './Pages/Faqs.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import OrderTracking from './Pages/OrderTracking.jsx';
import ReturnPolicy from './Pages/ReturnPolicy.jsx';
import Shipping from './Pages/Shipping.jsx';

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
         <Route path="/shipping" element={<Shipping />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
