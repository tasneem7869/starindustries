import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Chatbot from '@/components/Chatbot';

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1" style={{ paddingTop: 'var(--header-height, 160px)' }}>
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}