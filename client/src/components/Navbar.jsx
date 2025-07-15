import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext'; // ✅ import context

function Navbar() {
  const { user, isLoggedIn, logout } = useContext(AuthContext); // ✅ use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-amber-600 shadow-sm fixed top-0 left-0 w-full z-50">
      {/* Left - Dropdown Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FiMenu className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            {!isLoggedIn ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/track-order">My Orders</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-4xl">Furniq</Link>
      </div>

      {/* Right - Auth Buttons or Username */}
      <div className="navbar-end gap-4 pr-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-black">Login</Link>
            <Link to="/register" className="btn btn-sm btn-white bg-white text-black hover:bg-gray-100">Register</Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-black text-white hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
