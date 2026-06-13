import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import Home from '@/Pages/Home';
import About from '@/Pages/About';
import Products from '@/Pages/Products';
import ProductDetail from '@/Pages/ProductDetail';
import CustomerSegments from '@/Pages/CustomerSegments';
import Contact from '@/Pages/Contact';
import AdminLogin from './Pages/Admin/Login';
import AdminProducts from './Pages/Admin/ProductList';
import AdminProductEditor from './Pages/Admin/ProductEditor';
import RequireAuth from './components/admin/RequireAuth';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">Page Not Found</h1>
      <p className="text-gray-600 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/customer-segments" element={<CustomerSegments />} />
        <Route path="/contact" element={<Contact />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/products"
          element={
            <RequireAuth>
              <AdminProducts />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <RequireAuth>
              <AdminProductEditor mode="create" />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/products/:slug/edit"
          element={
            <RequireAuth>
              <AdminProductEditor mode="edit" />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
