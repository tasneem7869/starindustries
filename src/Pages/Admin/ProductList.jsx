import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '@/services/apiClient';
import { getToken, clearToken } from '@/services/auth';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = getToken();

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/products', { token });
      setProducts(data);
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onDelete(slug) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    try {
      await apiFetch(`/products/${slug}`, { method: 'DELETE', token });
      await load();
    } catch (e) {
      alert('Delete failed');
    }
  }

  function onLogout() {
    clearToken();
    window.location.href = '/admin';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Products</h1>
        <div className="flex gap-2">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-[#1e3a5f] text-white rounded hover:bg-[#2d5a8f]"
          >
            New Product
          </Link>
          <button onClick={onLogout} className="px-3 py-2 border rounded">Logout</button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-3">{error}</div>}

      {!loading && !products.length && (
        <div className="text-gray-600">No products yet.</div>
      )}

      {!!products.length && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Model No</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-b last:border-b-0">
                  <td className="px-4 py-3 text-sm text-gray-700">{p.slug}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1e3a5f]">{p.title}</td>
                  <td className="px-4 py-3 text-sm capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-sm">{p.modelNo || '-'}</td>
                  <td className="px-4 py-3">
                    {p.image ? (
                      <img src={p.image} alt="thumb" className="h-10 w-auto object-contain" />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/products/${p.slug}/edit`}
                        className="px-3 py-1 border rounded hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        className="px-3 py-1 border rounded text-red-600 hover:bg-red-50"
                        onClick={() => onDelete(p.slug)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
