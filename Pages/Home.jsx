import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl, resolveAssetPath } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, Users, Truck, CheckCircle } from 'lucide-react';

import LazyVideo from '@/components/ui/LazyVideo';

const stats = [
  { number: '25+', label: 'Years of Excellence', icon: Clock },
  { number: '1000+', label: 'Happy Clients', icon: Users },
  { number: '50+', label: 'Product Categories', icon: Shield },
  { number: '100%', label: 'Quality Assurance', icon: Award },
];

const productCategories = [
  {
    title: 'Automobile, Industrial & Security Uniforms',
    image: 'uni-1.jpg',
    link: 'ProductDetail?subcategory=automobile',
    description: 'High-quality workwear for automobile and industrial sectors'
  },
  {
    title: 'Safety Shoes',
    image: 'sh-2.png',
    link: 'ProductDetail?subcategory=safety-shoes',
    description: 'Durable protective footwear for workplace safety'
  },
  {
    title: 'School Uniforms',
    image: 'uni-5.jpg',
    link: 'ProductDetail?subcategory=school-uniform',
    description: 'Smart and comfortable uniforms for educational institutions'
  },
  {
    title: 'Corporate Shoes',
    image: 'sh-4.png',
    link: 'ProductDetail?subcategory=executive-shoes',
    description: 'Elegant formal footwear for professionals'
  },
];

const features = [
  { icon: Shield, title: 'Quality Assured', desc: 'Stringent quality tests under expert supervision' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'On-time delivery anywhere within India' },
  { icon: Award, title: 'Premium Materials', desc: 'Raw materials from certified vendors only' },
  { icon: CheckCircle, title: 'Custom Solutions', desc: 'Tailored products to meet your specific needs' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <LazyVideo
            className="w-full h-full object-cover"
            src="/Safety_Products_and_Uniforms_Video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <span className="inline-block px-4 py-2 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-6">
                Established 1999
              </span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Welcome To
                <span className="block text-[#c9a962]">STAR INDUSTRIES</span>
                Private Limited
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                India's trusted manufacturer and supplier of premium Safety & Security Products, 
                Professional Uniforms, and Quality Footwear.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to={createPageUrl('Products')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a962] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#dbb872] transition-colors"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="hidden lg:block"
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#c9a962]/60 bg-[#0f1d33]/75 backdrop-blur-xl shadow-[0_35px_60px_-20px_rgba(15,29,51,0.7)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#c9a962]/25 opacity-90" />
                <div className="absolute -top-24 -right-12 w-56 h-56 bg-[#c9a962]/25 blur-3xl rounded-full" />
                <div className="absolute -bottom-20 -left-16 w-44 h-44 bg-[#1e3a5f]/40 blur-3xl rounded-full" />

                <div className="relative p-8">
                  <div className="flex items-center justify-between gap-6 mb-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/85">Why Leaders Choose Us</p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a962]/70 bg-[#0b172c]/70 px-3 py-1 text-xs font-medium text-[#c9a962]">
                      <Shield className="w-3.5 h-3.5" />
                      Trusted Since 1999
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a962]/60"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/15 via-transparent to-[#1e3a5f]/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-start gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9a962]/35 to-[#c9a962]/10 text-[#c9a962] flex items-center justify-center shadow-inner">
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-white leading-tight">{stat.number}</p>
                            <p className="text-xs uppercase tracking-wide text-white/70 mt-1">{stat.label}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <stat.icon className="w-10 h-10 text-[#c9a962] mx-auto mb-4" />
                <p className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Our Products</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-6">
              Premium Quality Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a diversified array of Workwear, Uniforms & Shoes manufactured using 
              the finest raw materials from leading mills across India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={createPageUrl(product.link)}
                  className="group block bg-gray-50 rounded-2xl overflow-hidden card-surface"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={resolveAssetPath(product.image)} 
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1e3a5f] group-hover:text-[#2d5a8f] transition-colors mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#c9a962] font-medium text-sm">
                      View Products
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to={createPageUrl('Products')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2d5a8f] transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-6">
                Quality is Our Forte
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We are a professionally managed organization paying utmost attention to the quality of products. 
                All products are fabricated using latest production procedures and genuine quality raw materials 
                from certified market vendors like Raymond, Digjam, Donear, NTC, and many other leading mills.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-[#c9a962]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1e3a5f] mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600" 
                alt="Manufacturing"
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#1e3a5f] text-white p-8 rounded-2xl shadow-xl max-w-xs">
                <p className="text-4xl font-bold text-[#c9a962] mb-2">MD</p>
                <p className="font-semibold">Mr. Asif Rahman</p>
                <p className="text-gray-400 text-sm mt-2">Leading the company to excellence since 1999</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by leading organizations across India for over 25 years
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                position: 'Operations Manager',
                company: 'Auto Manufacturing Co.',
                text: 'Star Industries has been our trusted partner for industrial uniforms for over 5 years. The quality is exceptional and delivery is always on time.',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                position: 'HR Director',
                company: 'Tech Solutions Ltd.',
                text: 'Outstanding quality and professional service. Their corporate shoes are comfortable, durable, and our employees love them.',
                rating: 5
              },
              {
                name: 'Mohammed Ali',
                position: 'Principal',
                company: 'Green Valley School',
                text: 'We have been ordering school uniforms from Star Industries for 8 years. The fabric quality and stitching is excellent, and prices are very reasonable.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 card-surface"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#c9a962] fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-[#1e3a5f]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                  <p className="text-sm text-[#c9a962] font-medium">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              For quick delivery, call us or email us. We deliver on-time, every time, anywhere within India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919884451005"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1e3a5f] text-white font-semibold rounded-lg hover:bg-[#2d5a8f] transition-colors"
              >
                Call +91-9884451005
              </a>
              <a 
                href="mailto:sales@starindus.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a962] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#dbb872] transition-colors"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}