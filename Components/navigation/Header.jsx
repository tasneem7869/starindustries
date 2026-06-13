import React, { useState, useEffect, useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { createPageUrl, ROUTE_PATHS, resolveAssetPath } from '@/utils';

import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About' },
  { 
    name: 'Products', 
    page: 'Products',
    submenu: [
      { 
        name: 'Uniforms', 
        page: 'Products?category=uniforms',
        children: [
          { name: 'Automobile & Security', page: 'ProductDetail?subcategory=automobile' },
          { name: 'Pharmaceutical Industry', page: 'ProductDetail?subcategory=pharmaceutical' },
          { name: 'Food Industry', page: 'ProductDetail?subcategory=food' },
          { name: 'Government Sector', page: 'ProductDetail?subcategory=government' },
          { name: 'Schools / Colleges', page: 'ProductDetail?subcategory=school-uniform' },
        ]
      },
      { 
        name: 'Shoes', 
        page: 'Products?category=shoes',
        children: [
          { name: 'Industrial Shoes', page: 'ProductDetail?subcategory=industrial-shoes' },
          { name: 'Safety & Security Shoes', page: 'ProductDetail?subcategory=safety-shoes' },
          { name: 'Uniform Shoes', page: 'ProductDetail?subcategory=uniform-shoes' },
          { name: 'Executive Shoes', page: 'ProductDetail?subcategory=executive-shoes' },
          { name: 'School / College Shoes', page: 'ProductDetail?subcategory=school-shoes' },
        ]
      },
    ]
  },
  { name: 'Customer Segments', page: 'CustomerSegments' },
  { 
  name: 'Services', 
  external: true,
  submenu: [
    { 
      name: 'Web Development', 
      url: 'https://www.vinceeta.com/services/web-development' 
    },
    { 
      name: 'Web Designing', 
      url: 'https://www.vinceeta.com/services/web-designing' 
    },
    { 
      name: 'Web Hosting', 
      url: 'https://www.vinceeta.com/services/web-hosting' 
    },
    { 
      name: 'Digital Marketing', 
      url: 'https://www.vinceeta.com/services/digital-marketing' 
    },
  ]
},

  { name: 'Contact', page: 'Contact' },
];

export default function Header({ onHeightChange }) {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      const { height } = headerRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      if (typeof onHeightChange === 'function') {
        onHeightChange(height);
      }
    };

    updateHeaderHeight();

    let observer;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [onHeightChange]);

  const isActiveTab = (page) => {
    if (!page) return false;

    const targetPath = createPageUrl(page).split('?')[0];
    if (location.pathname === targetPath) {
      return true;
    }

    if (targetPath === ROUTE_PATHS.Products) {
      return location.pathname.startsWith(ROUTE_PATHS.Products) || location.pathname.startsWith(ROUTE_PATHS.ProductDetail);
    }

    return false;
  };

  const toggleMobileItem = (itemName) => {
    setMobileExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}
    >
      {/* Top Bar */}
      <div className="bg-[#1e3a5f] text-white py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+919884451005" className="flex items-center gap-2 hover:text-[#c9a962] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+91-9884451005</span>
            </a>
            <a href="mailto:sales@starindus.com" className="flex items-center gap-2 hover:text-[#c9a962] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">sales@starindus.com</span>
            </a>
          </div>
          <span className="text-xs text-gray-300">Est. 1999</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <img
              src={resolveAssetPath('si-logo.png')}
              alt="Star Industries"
              loading="lazy"
              decoding="async"
              className="h-16 w-auto object-contain drop-shadow-sm"
            />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => { setActiveDropdown(null); setActiveSubmenu(null); }}
              >
                {item.external ? (
                  <button className="px-4 py-2 font-medium text-[#1e3a5f] hover:text-[#c9a962] transition-colors flex items-center gap-1 rounded-lg">
                    {item.name}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </button>
                ) : (
                  <Link 
                    to={createPageUrl(item.page)}
                    className={`px-4 py-2 font-medium flex items-center gap-1 transition-colors ${
                      isActiveTab(item.page)
                        ? 'text-[#c9a962]'
                        : 'text-[#1e3a5f] hover:text-[#c9a962]'
                    }`}
                    aria-current={isActiveTab(item.page) ? 'page' : undefined}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[220px]"
                    >
                      {item.submenu.map((subItem) => (
                        <div 
                          key={subItem.name}
                          className="relative"
                          onMouseEnter={() => setActiveSubmenu(subItem.name)}
                          onMouseLeave={() => setActiveSubmenu(null)}
                        >
                          {subItem.url ? (
                            <a 
                              href={subItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-gray-700 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link 
                              to={createPageUrl(subItem.page)}
                              className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                            >
                              {subItem.name}
                              {subItem.children && <ChevronDown className="w-4 h-4 -rotate-90" />}
                            </Link>
                          )}

                          {/* Nested Submenu */}
                          <AnimatePresence>
                            {subItem.children && activeSubmenu === subItem.name && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="absolute top-0 left-full bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] ml-1"
                              >
                                {subItem.children.map((child) => (
                                  <Link 
                                    key={child.name}
                                    to={createPageUrl(child.page)}
                                    className="block px-4 py-2 text-gray-700 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1e3a5f]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 border-t pt-4"
            >
              {navigationItems.map((item) => (
                <div key={item.name} className="py-2">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileItem(item.name)}
                        className={`flex items-center justify-between w-full font-medium mb-2 px-3 py-2 rounded-lg ${isActiveTab(item.page) ? 'text-[#c9a962]' : 'text-[#1e3a5f] hover:text-[#c9a962]'}`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedItems[item.name] ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {mobileExpandedItems[item.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((subItem) => (
                              <div key={subItem.name}>
                                {subItem.url ? (
                                  <a 
                                    href={subItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block py-1 text-gray-600 hover:text-[#c9a962]"
                                  >
                                    {subItem.name}
                                  </a>
                                ) : (
                                  <>
                                    {subItem.children ? (
                                      <>
                                        <button
                                          onClick={() => toggleMobileItem(`${item.name}-${subItem.name}`)}
                                          className="flex items-center justify-between w-full py-1 text-gray-600 hover:text-[#c9a962]"
                                        >
                                          {subItem.name}
                                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedItems[`${item.name}-${subItem.name}`] ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                          {mobileExpandedItems[`${item.name}-${subItem.name}`] && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: 'auto' }}
                                              exit={{ opacity: 0, height: 0 }}
                                              className="pl-4 overflow-hidden"
                                            >
                                              {subItem.children.map((child) => (
                                                <Link 
                                                  key={child.name}
                                                  to={createPageUrl(child.page)}
                                                  className="block py-1 text-sm text-gray-500 hover:text-[#c9a962]"
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  {child.name}
                                                </Link>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </>
                                    ) : (
                                      <Link 
                                        to={createPageUrl(subItem.page)}
                                        className="block py-1 text-gray-600 hover:text-[#c9a962]"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      to={createPageUrl(item.page)}
                      className={`block font-medium mb-2 px-3 py-2 rounded-lg ${isActiveTab(item.page) ? 'text-[#c9a962]' : 'text-[#1e3a5f] hover:text-[#c9a962]'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}