import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl, resolveAssetPath } from '@/utils';

import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={resolveAssetPath('si-logo.png')}
                alt="Star Industries"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Established in 1999, we are leading manufacturers and suppliers of Safety & Security Products,
              Uniforms, and Shoes across India.
            </p>
            <div className="flex items-center gap-2 text-[#c9a962]">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Since 1999</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Products', 'CustomerSegments', 'Contact'].map((page) => (
                <li key={page}>
                  <Link
                    to={createPageUrl(page)}
                    className="text-gray-400 hover:text-[#c9a962] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {page === 'CustomerSegments' ? 'Customer Segments' : page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Our Products
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Industrial & Security Uniforms', page: 'ProductDetail?subcategory=automobile' },
                { name: 'Safety Shoes', page: 'ProductDetail?subcategory=safety-shoes' },
                { name: 'School Uniforms', page: 'ProductDetail?subcategory=school-uniform' },
                { name: 'Executive Shoes', page: 'ProductDetail?subcategory=executive-shoes' },
                { name: 'All Products', page: 'Products' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={createPageUrl(item.page)}
                    className="text-gray-400 hover:text-[#c9a962] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Chennai, Tamil Nadu, India</span>
              </li>
              <li>
                <a href="tel:+919884451005" className="flex items-center gap-3 text-gray-400 hover:text-[#c9a962] transition-colors">
                  <Phone className="w-5 h-5 text-[#c9a962]" />
                  <span className="text-sm">+91-9884451005</span>
                </a>
              </li>
              <li>
                <a href="mailto:sales@starindus.com" className="flex items-center gap-3 text-gray-400 hover:text-[#c9a962] transition-colors">
                  <Mail className="w-5 h-5 text-[#c9a962]" />
                  <span className="text-sm">sales@starindus.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Star Industries Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Developed by{" "}
            <a
              href="https://califnco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              Califnco
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}