import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Factory, CheckCircle, TrendingUp, Shield } from 'lucide-react';

const timeline = [
  { year: '1999', title: 'Establishment', desc: 'Founded in Chennai, Tamil Nadu by Mr. Asif Rahman' },
  { year: '2005', title: 'Expansion', desc: 'Extended product range to include safety shoes' },
  { year: '2010', title: 'Growth', desc: 'Achieved pan-India distribution network' },
  { year: '2015', title: 'Modernization', desc: 'Upgraded to state-of-the-art manufacturing facility' },
  { year: '2020', title: 'Digital Era', desc: 'Launched online services and e-commerce platform' },
  { year: 'Today', title: 'Industry Leader', desc: 'Trusted by 1000+ clients across India' },
];

const values = [
  { icon: CheckCircle, title: 'Quality', desc: 'Stringent quality tests under expert supervision ensure flawlessness' },
  { icon: TrendingUp, title: 'Innovation', desc: 'Continuous innovation in products and manufacturing processes' },
  { icon: Users, title: 'Customer Focus', desc: 'Customer satisfaction is our primal objective' },
  { icon: Shield, title: 'Reliability', desc: 'On-time delivery, every time, anywhere within India' },
];

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-6">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Welcome To STAR INDUSTRIES</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Private Limited</p>
          </motion.div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Company Profile</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-8">Our Story of Excellence</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Managing Director</p>
                      <p className="font-semibold text-[#1e3a5f]">Mr. Asif Rahman</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Year of Establishment</p>
                      <p className="font-semibold text-[#1e3a5f]">1999</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Nature of Business</p>
                      <p className="font-semibold text-[#1e3a5f]">Manufacturing & Supplying</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Market Covered</p>
                      <p className="font-semibold text-[#1e3a5f]">Domestic (Pan-India)</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Established in the year 1999, STAR INDUSTRIES has recorded an upward rising graph since inception. 
                  The company manages all its operations from Chennai, Tamil Nadu. Under the able guidance of the M.D, 
                  Mr. Asif Rahman, we have weaved a magical tapestry of our indelible success.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We have marked our presence among the reliable Manufacturers and Suppliers of all Safety & Security Products, 
                  professional uniforms, and quality footwear.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" 
                alt="Star Industries"
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a962] text-[#1e3a5f] p-6 rounded-xl shadow-xl">
                <p className="text-4xl font-bold">25+</p>
                <p className="font-medium">Years of Trust</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#c9a962]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                As STAR INDUSTRIES Pvt. Ltd. enters a new growth phase, we look forward to a position of true global 
                leadership by providing unparalleled quality in products and services to our customers everywhere. 
                To set a precedent in the domestic market manufacturing workwear uniform & shoes industry, through 
                continuous innovation, exceptional products, focused services and enhanced customer satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1e3a5f] p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#c9a962] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#1e3a5f]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                  <span>Deliver on-time, every time, anywhere within India</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                  <span>Keep a sharp eye on product quality and constantly raise the bar</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                  <span>Comply flawlessly with all statutory regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                  <span>Maintain highest levels of logistics efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                  <span>Offer highest quality at the most competitive price</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality & Infrastructure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">What Sets Us Apart</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4">Our Strengths</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-50 p-8 rounded-2xl hover:bg-[#1e3a5f] transition-colors h-full">
                <Award className="w-12 h-12 text-[#c9a962] mb-6" />
                <h3 className="text-xl font-bold text-[#1e3a5f] group-hover:text-white mb-4 transition-colors">Quality Orientation</h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  Quality is considered the forte of the company. We pay utmost attention to quality using latest 
                  production procedures and genuine raw materials. Stringent quality tests are conducted under 
                  expert supervision to ensure flawlessness.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 p-8 rounded-2xl hover:bg-[#1e3a5f] transition-colors h-full">
                <Factory className="w-12 h-12 text-[#c9a962] mb-6" />
                <h3 className="text-xl font-bold text-[#1e3a5f] group-hover:text-white mb-4 transition-colors">Infrastructure & Resources</h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  We have a state-of-the-art infrastructure equipped with highly advanced machines for bulk 
                  production. Our team of deft professionals strictly follows zero-defect culture to serve 
                  clients with quality products within committed timeframes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-gray-50 p-8 rounded-2xl hover:bg-[#1e3a5f] transition-colors h-full">
                <Users className="w-12 h-12 text-[#c9a962] mb-6" />
                <h3 className="text-xl font-bold text-[#1e3a5f] group-hover:text-white mb-4 transition-colors">Customer Driven Approach</h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  Customer Satisfaction is our primal objective. We provide quality merchandise, affordable 
                  prices and expedite deliveries. As a result, we have garnered a huge customer base all 
                  over the country.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f]">
        <div className="max-w-7xl mx-auto px-4">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Milestones of Success</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#c9a962]/30 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl inline-block">
                      <span className="text-[#c9a962] font-bold text-2xl">{item.year}</span>
                      <h3 className="text-white font-semibold text-lg mt-2">{item.title}</h3>
                      <p className="text-gray-400 mt-2">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-[#c9a962] rounded-full relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">What We Believe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-[#1e3a5f] group transition-colors"
              >
                <div className="w-16 h-16 bg-[#1e3a5f] group-hover:bg-[#c9a962] rounded-xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  <value.icon className="w-8 h-8 text-[#c9a962] group-hover:text-[#1e3a5f] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f] group-hover:text-white mb-3 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm transition-colors">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}