import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Factory, Utensils, Heart, GraduationCap, Shield, Landmark, Ship, Wrench, FlaskConical, Hotel, Package } from 'lucide-react';

const segments = [
  {
    name: 'Construction',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    description: 'Safety uniforms and protective footwear for construction workers'
  },
  {
    name: 'Engineering',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
    description: 'Technical workwear for engineering professionals'
  },
  {
    name: 'Automobile Industry',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600',
    description: 'Durable uniforms for automotive manufacturing and service'
  },
  {
    name: 'Chemical Industry',
    icon: FlaskConical,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600',
    description: 'Chemical-resistant protective clothing and footwear'
  },
  {
    name: 'Shipping & Shipbuilding',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600',
    description: 'Marine-grade uniforms for shipping and shipyard workers'
  },
  {
    name: 'Marine Engineering',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600',
    description: 'Specialized uniforms for marine engineers'
  },
  {
    name: 'Technical Institutions',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600',
    description: 'Student and faculty uniforms for polytechnics and ITIs'
  },
  {
    name: 'Food Industry',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    description: 'Hygienic uniforms for food processing and service'
  },
  {
    name: 'Hotels & Resorts',
    icon: Hotel,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    description: 'Elegant hospitality uniforms for staff and management'
  },
  {
    name: 'Pharmaceutical Industry',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600',
    description: 'Cleanroom and laboratory uniforms for pharma sector'
  },
  {
    name: 'Security Companies',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
    description: 'Professional security guard uniforms and footwear'
  },
  {
    name: 'Government Sectors',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600',
    description: 'Official uniforms for government departments'
  },
  {
    name: 'Schools / Colleges',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600',
    description: 'Complete school uniforms and footwear solutions'
  }
];

export default function CustomerSegments() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-6">
              Industries We Serve
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Customer Segments
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide specialized uniforms and footwear solutions for diverse industries across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Segments Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden card-surface h-full">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={segment.image} 
                      alt={segment.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center mb-3">
                        <segment.icon className="w-6 h-6 text-[#1e3a5f]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {segment.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">{segment.description}</p>
                    <Link 
                      to={createPageUrl('Products')}
                      className="inline-flex items-center gap-2 text-[#c9a962] font-medium text-sm group-hover:text-[#1e3a5f] transition-colors"
                    >
                      View Products
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-2 pb-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Looking for Custom Solutions?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We provide customized uniform and footwear solutions for your specific industry requirements. 
              Contact us to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={createPageUrl('Contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2d5a8f] transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to={createPageUrl('Products')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a962] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#dbb872] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}