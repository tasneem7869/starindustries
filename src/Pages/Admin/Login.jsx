import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '@/services/apiClient';
import { setToken } from '@/services/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await apiFetch('/auth/login', { method: 'POST', body: { email, password } });
      setToken(token);
      const redirectTo = location.state?.from?.pathname || '/admin/products';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-4">Admin Login</h1>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          className="w-full border rounded px-3 py-2 mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#1e3a5f] text-white py-2 rounded hover:bg-[#2d5a8f] disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
