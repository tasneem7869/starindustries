import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl, resolveAssetPath } from '@/utils';

import { motion } from 'framer-motion';
import { ArrowRight, Filter, Phone, Mail } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiFetch } from '@/services/apiClient';
const uniforms = [
  {
    id: 'automobile',
    title: 'Automobile, Industrial & Security Uniforms',
    modelNo: 'Model No: 064',
    image: resolveAssetPath('uni-1.jpg'),
    description: 'Star Industries offer a diversified array of Automobile, Industrial & Uniforms for various Institutions, Industries and Establishments. Our Collection encompasses pants and shirts (in various colours), Boiler Suits, Gloves, Overalls, Coveralls and many more.',
    link: 'ProductDetail?subcategory=automobile'
  },
  {
    id: 'pharmaceutical',
    title: 'Pharmaceutical Industry Uniforms',
    modelNo: 'Model No: 078',
    image: resolveAssetPath('uni-2.jpg'),
    description: 'Star Industries offer a diversified array of Pharmaceutical Uniforms for various Hospitals, Nursing Homes, Pharmacies and Health Checkup Centers. Our uniforms feature Colour Fastness, Skin Friendliness, Anti Shrinkage, Durability, Excellent Cuts & Perfect Stitch.',
    link: 'ProductDetail?subcategory=pharmaceutical'
  },
  {
    id: 'food',
    title: 'Food Industry Uniforms',
    modelNo: 'Model No: 092',
    image: resolveAssetPath('uni-3.jpg'),
    description: 'Leveraging on our sophisticated infrastructure, we are engaged in manufacturing and supplying a wide range of Hotel and Restaurant Uniforms. Our Uniforms are highly comfortable, shrinkage free and easy to wash. Uniforms are provided with stitched logo or customized specifications.',
    link: 'ProductDetail?subcategory=food'
  },
  {
    id: 'government',
    title: 'Government Sector Uniforms',
    modelNo: 'Model No: 105',
    image: resolveAssetPath('uni-4.jpg'),
    description: 'Star Industries provide a wide range of Police Uniform Wear. Our cutting edge technology facilitates us in effective production of uniforms which are accurately designed, seamlessly stitched, durable and stands high on quality. We also specialize in supplying fabric with specific color requirements along with all accessories.',
    link: 'ProductDetail?subcategory=government'
  },
  {
    id: 'school-uniform',
    title: 'Schools / Colleges Uniforms',
    modelNo: 'Model No: 118',
    image: resolveAssetPath('uni-5.jpg'),
    description: 'Star Industries is a leading Manufacturer and Supplier of a wide range of School & College Uniforms along with complete set of accessories. We use only quality fabrics to make our products comfortable and to ensure non-fading due to repeated washings. These uniforms are offered in distinctive style and are fabricated from the finest fabric.',
    link: 'ProductDetail?subcategory=school-uniform'
  }
];

const shoes = [
  {
    id: 'industrial-shoes',
    title: 'Industrial Shoe',
    modelNo: 'Model No: 201',
    image: resolveAssetPath('sh-1.jpg'),
    description: 'Premium industrial shoes with steel toe caps and slip-resistant soles. Our industrial shoes are designed to protect your feet in hazardous work environments.',
    link: 'ProductDetail?subcategory=industrial-shoes'
  },
  {
    id: 'safety-shoes',
    title: 'Safety & Security Shoe',
    modelNo: 'Model No: 215',
    image: resolveAssetPath('sh-2.png'),
    description: 'Premium safety shoes with steel toe caps and slip-resistant soles. Our safety shoes are designed to protect your feet in hazardous work environments.',
    link: 'ProductDetail?subcategory=safety-shoes'
  },
  {
    id: 'uniform-shoes',
    title: 'Uniform Shoe',
    modelNo: 'Model No: 228',
    image: resolveAssetPath('sh-3.png'),
    description: 'Professional uniform shoes for corporate and institutional use. Our uniform shoes combine style with comfort for daily professional wear.',
    link: 'ProductDetail?subcategory=uniform-shoes'
  },
  {
    id: 'executive-shoes',
    title: 'Executive Shoe',
    modelNo: 'Model No: 242',
    image: resolveAssetPath('sh-4.png'),
    description: 'Elegant formal leather shoes for executives and professionals. Our executive shoes are crafted with premium leather for a sophisticated look.',
    link: 'ProductDetail?subcategory=executive-shoes'
  },
  {
    id: 'school-shoes',
    title: 'Schools / Colleges Shoe',
    modelNo: 'Model No: 256',
    image: resolveAssetPath('sh-5.jpg'),
    description: 'Comfortable and durable shoes for students of all ages. Our school shoes are designed to withstand daily wear while keeping young feet comfortable.',
    link: 'ProductDetail?subcategory=school-shoes'
  }
];

const UNIFORM_STATIC_IDS = uniforms.map((u) => u.id);
const SHOE_STATIC_IDS = shoes.map((s) => s.id);

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const [activeTab, setActiveTab] = useState(categoryParam || 'all');
  const [uniformCards, setUniformCards] = useState([]);
  const [shoeCards, setShoeCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiFetch('/products');
        if (!mounted) return;
        const cards = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.slug,
          title: p.title,
          modelNo: p.modelNo || '',
          image: p.image || p.mainImage || '',
          description: p.description || p.summary || '',
          link: `ProductDetail?subcategory=${p.slug}`,
          category: p.category,
        }));
        setUniformCards(cards.filter((c) => c.category === 'uniforms'));
        setShoeCards(cards.filter((c) => c.category === 'shoes'));
      } catch {
        if (mounted) setError('Failed to load products from server');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const extraUniforms = uniformCards.filter((c) => !UNIFORM_STATIC_IDS.includes(c.id));
  const extraShoes = shoeCards.filter((c) => !SHOE_STATIC_IDS.includes(c.id));
  const hasDbExtras = extraUniforms.length > 0 || extraShoes.length > 0;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        className="relative py-16"
        style={{
          backgroundImage: `url('${resolveAssetPath('var-indus.png')}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/80" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-6">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Quality Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Star Industries offers a diversified array of Uniforms & Shoes for various Industries and Establishments.
            </p>
          </motion.div>
        </div>
      </section>

      {loading && (
        <p className="text-center text-gray-500 mb-6">Loading products...</p>
      )}
      {error && !loading && (
        <p className="text-center text-red-600 mb-6">{error}</p>
      )}

      {/* Quick Contact */}
      <section className="hidden md:block bg-[#c9a962] py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-[#1e3a5f]">
            <p className="font-medium">For Quick Delivery:</p>

            <a
              href="tel:+919884451005"
              className="flex items-center gap-2 font-semibold hover:underline"
            >
              <Phone className="w-4 h-4" />
              Call: +91-9884451005
            </a>

            <a
              href="mailto:sales@starindus.com?subject=Star%20Industries%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:underline"
            >
              <Mail className="w-4 h-4" />
              Email: sales@starindus.com
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-white shadow-md p-1">
                <TabsTrigger value="all" className="px-6 py-3 data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                  All Products
                </TabsTrigger>
                <TabsTrigger value="uniforms" className="px-6 py-3 data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                  Uniforms
                </TabsTrigger>
                <TabsTrigger value="shoes" className="px-6 py-3 data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                  Shoes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Uniforms Section */}
          {(activeTab === 'all' || activeTab === 'uniforms') && (
            <div className="mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#c9a962]"></span>
                  Uniforms
                </h2>
                <p className="text-gray-600 mt-4 max-w-3xl">
                  For Uniforms, the fabrics are spun out of finest yarns and procured from certified vendors like
                  Raymond, Digjam, Donear, NTC, Mohotha, Suzuki, Mafatlal, BSL, Geoffrey Hammonds, Bhilwara Mills and more.
                </p>
                {loading && (
                  <p className="text-gray-500 text-sm mt-2">
                    Loading more products from server...
                  </p>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {[...uniforms, ...extraUniforms].map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={createPageUrl(product.link)}
                      className="group block bg-white rounded-2xl overflow-hidden card-surface"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={resolveAssetPath(product.image)}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#1e3a5f] group-hover:text-[#2d5a8f] transition-colors mb-1">
                          {product.title}
                        </h3>
                        <p
                          className="text-gray-600 text-sm mb-4"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          title={product.description}
                        >
                          {product.description}
                        </p>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e3a5f] text-white font-medium text-sm transition-colors group-hover:bg-[#2d5a8f]">
                          View Collection
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Shoes Section */}
          {(activeTab === 'all' || activeTab === 'shoes') && (
            <div className="mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#c9a962]"></span>
                  Shoes
                </h2>
                <p className="text-gray-600 mt-4 max-w-3xl">
                  Star Industries is scaling heights in manufacturing and supplying of various types of shoes for various purposes.
                  Durability, Comfort and Color-Fastness are the chief characteristics.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...shoes, ...extraShoes].map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={createPageUrl(product.link)}
                      className="group block bg-white rounded-2xl overflow-hidden card-surface"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={resolveAssetPath(product.image)}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#1e3a5f] group-hover:text-[#2d5a8f] transition-colors mb-1">
                          {product.title}
                        </h3>
                        <p
                          className="text-gray-600 text-sm mb-4"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          title={product.description}
                        >
                          {product.description}
                        </p>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e3a5f] text-white font-medium text-sm transition-colors group-hover:bg-[#2d5a8f]">
                          View Product
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            Need Custom Products?
          </h2>
          <p className="text-gray-600 mb-8">
            We provide safe and prompt delivery of products to desired destinations. Contact us for enquiry and quick delivery.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a962] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#dbb872] transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}