import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from './authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-black text-center select-none">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {authError && (
            <p className="text-red-600 font-semibold text-center">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md transition hover:opacity-90"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 select-none text-sm">
          Use <strong>user@example.com</strong> / <strong>password</strong>
        </p>
      </div>
    </main>
  );
}
