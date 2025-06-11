import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-black select-none">
          CRM
        </Link>
        <nav className="space-x-8 hidden md:flex text-gray-700 font-medium select-none">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hover:text-black transition ${isActive ? 'text-black font-semibold' : ''}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `hover:text-black transition ${isActive ? 'text-black font-semibold' : ''}`
                }
              >
                Products
              </NavLink>
              <button
                onClick={onLogout}
                className="text-sm font-semibold px-3 py-1 bg-black text-white rounded-md hover:opacity-80 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-black transition ${isActive ? 'text-black font-semibold' : ''}`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
