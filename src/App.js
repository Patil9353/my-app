    // App.js
    import React from 'react';
    import { Routes, Route, Navigate } from 'react-router-dom';
    import Header from './components/Header';
    import PrivateRoute from './components/PrivateRoute';
    import Login from './features/auth/Login'; // Make sure the path is correct
    import Dashboard from './features/dashboard/Dashboard';
    import ProductManager from './features/products/ProductManager';

    export default function App() {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductManager />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      );
    }
    