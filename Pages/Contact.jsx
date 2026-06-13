import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectSeparator } from '@/components/ui/select';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91-9884451005',
    link: 'tel:+919884451005',
    description: 'Call us for quick assistance'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'sales@starindus.com',
    link: 'mailto:sales@starindus.com?subject=Star%20Industries%20Enquiry',
    description: 'Email us for detailed enquiries'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'No: 18&19, Kovalamuthu street, Periamet, Chennai - 3',
    link: null,
    description: 'Head Office & Manufacturing'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    link: null,
    description: 'We are available to assist you'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const message = `
*New Contact Enquiry*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'Not provided'}
Interested In: ${formData.interest || 'Not specified'}

Message:
${formData.message}
  `.trim();

  const whatsappNumber = '919884451005';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(whatsappURL, '_blank');

  setTimeout(() => {
    setIsSubmitting(false);
    setIsSubmitted(true);
  }, 800);
};


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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're here to help. Reach out to us for any enquiries about our products and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-10">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-7 h-7 text-[#c9a962]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c9a962] font-medium hover:underline block mb-2"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-[#c9a962] font-medium mb-2">{info.value}</p>
                )}
                <p className="text-gray-500 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Send A Message</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-8">
                Get in Touch
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h3>
                  <p className="text-green-700 mb-6">
                    Your email client has been opened with your message. Please send the email to complete your enquiry.
                  </p>
                  <Button 
                    onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', interest: '', message: '' }); }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">Interested In</Label>
                    <Select 
                      value={formData.interest}
                      onValueChange={(value) => setFormData({ ...formData, interest: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectLabel>Uniforms</SelectLabel>
                        <SelectItem value="automobile-uniforms">Automobile & Security Uniforms</SelectItem>
                        <SelectItem value="pharmaceutical-uniforms">Pharmaceutical Uniforms</SelectItem>
                        <SelectItem value="food-industry-uniforms">Hotel & Food Industry Uniforms</SelectItem>
                        <SelectItem value="government-uniforms">Government Sector Uniforms</SelectItem>
                        <SelectItem value="school-college-uniforms">School & College Uniforms</SelectItem>
                        <SelectSeparator />
                        <SelectLabel>Footwear & Others</SelectLabel>
                        <SelectItem value="safety-shoes">Safety Shoes</SelectItem>
                        <SelectItem value="executive-shoes">Executive Shoes</SelectItem>
                        <SelectItem value="custom-solutions">Custom Solutions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your requirements..."
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Opening Email...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#1e3a5f] rounded-2xl p-10 text-white h-full">
                <h3 className="text-2xl font-bold mb-6">Why Choose Star Industries?</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">25+ Years Experience</h4>
                      <p className="text-gray-400 text-sm">Trusted manufacturer since 1999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Premium Quality</h4>
                      <p className="text-gray-400 text-sm">Raw materials from certified vendors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Pan-India Delivery</h4>
                      <p className="text-gray-400 text-sm">On-time delivery, every time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Competitive Pricing</h4>
                      <p className="text-gray-400 text-sm">Best quality at affordable prices</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-8">
                  <h4 className="font-semibold mb-4">Quick Contact</h4>
                  <div className="space-y-3">
                    <a href="tel:+919884451005" className="flex items-center gap-3 text-[#c9a962] hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                      +91-9884451005
                    </a>
                    <a
                      href="mailto:sales@starindus.com?subject=Star%20Industries%20Enquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#c9a962] hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      sales@starindus.com
                    </a>
                    <div className="flex items-start gap-3 text-gray-400">
                      <MapPin className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
                      <span>No: 18&19, Kovalamuthu street, Periamet, Chennai - 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.275790746846!2d80.28259507507432!3d13.085876087239548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f2f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sKovalamuthu%20Street%2C%20Periamet%2C%20Chennai%2C%20Tamil%20Nadu%20600003!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Star Industries Location - Periamet, Chennai"
        />
      </section>
    </div>
  );
}

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectSeparator } from '@/components/ui/select';

// const contactInfo = [
//   {
//     icon: Phone,
//     title: 'Phone',
//     value: '+91-9884451005',
//     link: 'tel:+919884451005',
//     description: 'Call us for quick assistance'
//   },
//   {
//     icon: Mail,
//     title: 'Email',
//     value: 'sales@starindus.com',
//     link: 'mailto:sales@starindus.com?subject=Star%20Industries%20Enquiry',
//     description: 'Email us for detailed enquiries'
//   },
//   {
//     icon: MapPin,
//     title: 'Location',
//     value: 'No: 18&19, Kovalamuthu street, Periamet, Chennai - 3',
//     link: null,
//     description: 'Head Office & Manufacturing'
//   },
//   {
//     icon: Clock,
//     title: 'Business Hours',
//     value: 'Mon - Sat: 9:00 AM - 6:00 PM',
//     link: null,
//     description: 'We are available to assist you'
//   }
// ];

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     interest: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Create email body
//     const emailSubject = `New Contact Form Submission from ${formData.name}`;
//     const emailBody = `
// Name: ${formData.name}
// Email: ${formData.email}
// Phone: ${formData.phone}
// Company: ${formData.company || 'Not provided'}
// Interested In: ${formData.interest || 'Not specified'}

// Message:
// ${formData.message}
//     `.trim();

//     // Create mailto link
//     const mailtoLink = `mailto:sales@starindus.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
//     // Open email client
//     window.location.href = mailtoLink;
    
//     // Show success message after a short delay
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//     }, 1000);
//   };

//   return (
//     <div className="overflow-hidden">
//       {/* Hero */}
//       <section className="relative py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f]">
//         <div className="max-w-7xl mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <span className="inline-block px-4 py-2 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-6">
//               Get In Touch
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Contact Us
//             </h1>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               We're here to help. Reach out to us for any enquiries about our products and services.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Info Cards */}
//       <section className="py-10 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-10">
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={info.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-4">
//                   <info.icon className="w-7 h-7 text-[#c9a962]" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{info.title}</h3>
//                 {info.link ? (
//                   <a
//                     href={info.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-[#c9a962] font-medium hover:underline block mb-2"
//                   >
//                     {info.value}
//                   </a>
//                 ) : (
//                   <p className="text-[#c9a962] font-medium mb-2">{info.value}</p>
//                 )}
//                 <p className="text-gray-500 text-sm">{info.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-16">
//             {/* Form */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Send A Message</span>
//               <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4 mb-8">
//                 Get in Touch
//               </h2>

//               {isSubmitted ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
//                 >
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <CheckCircle className="w-8 h-8 text-green-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h3>
//                   <p className="text-green-700 mb-6">
//                     Your email client has been opened with your message. Please send the email to complete your enquiry.
//                   </p>
//                   <Button 
//                     onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', interest: '', message: '' }); }}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     Send Another Message
//                   </Button>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name *</Label>
//                       <Input 
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         placeholder="Your name"
//                         className="h-12"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address *</Label>
//                       <Input 
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         placeholder="your@email.com"
//                         className="h-12"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone Number *</Label>
//                       <Input 
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         placeholder="+91 XXXXX XXXXX"
//                         className="h-12"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="company">Company Name</Label>
//                       <Input 
//                         id="company"
//                         name="company"
//                         value={formData.company}
//                         onChange={handleChange}
//                         placeholder="Your company"
//                         className="h-12"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="interest">Interested In</Label>
//                     <Select 
//                       value={formData.interest}
//                       onValueChange={(value) => setFormData({ ...formData, interest: value })}
//                     >
//                       <SelectTrigger className="h-12">
//                         <SelectValue placeholder="Select product category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectLabel>Uniforms</SelectLabel>
//                         <SelectItem value="automobile-uniforms">Automobile & Security Uniforms</SelectItem>
//                         <SelectItem value="pharmaceutical-uniforms">Pharmaceutical Uniforms</SelectItem>
//                         <SelectItem value="food-industry-uniforms">Hotel & Food Industry Uniforms</SelectItem>
//                         <SelectItem value="government-uniforms">Government Sector Uniforms</SelectItem>
//                         <SelectItem value="school-college-uniforms">School & College Uniforms</SelectItem>
//                         <SelectSeparator />
//                         <SelectLabel>Footwear & Others</SelectLabel>
//                         <SelectItem value="safety-shoes">Safety Shoes</SelectItem>
//                         <SelectItem value="executive-shoes">Executive Shoes</SelectItem>
//                         <SelectItem value="custom-solutions">Custom Solutions</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="message">Your Message *</Label>
//                     <Textarea 
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       placeholder="Tell us about your requirements..."
//                       rows={5}
//                     />
//                   </div>

//                   <Button 
//                     type="submit" 
//                     disabled={isSubmitting}
//                     className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d5a8f] text-white"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center gap-2">
//                         <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Opening Email...
//                       </span>
//                     ) : (
//                       <span className="flex items-center gap-2">
//                         <Send className="w-5 h-5" />
//                         Send Message
//                       </span>
//                     )}
//                   </Button>
//                 </form>
//               )}
//             </motion.div>

//             {/* Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="bg-[#1e3a5f] rounded-2xl p-10 text-white h-full">
//                 <h3 className="text-2xl font-bold mb-6">Why Choose Star Industries?</h3>
                
//                 <div className="space-y-6 mb-10">
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
//                       <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-1">25+ Years Experience</h4>
//                       <p className="text-gray-400 text-sm">Trusted manufacturer since 1999</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
//                       <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-1">Premium Quality</h4>
//                       <p className="text-gray-400 text-sm">Raw materials from certified vendors</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
//                       <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-1">Pan-India Delivery</h4>
//                       <p className="text-gray-400 text-sm">On-time delivery, every time</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center shrink-0">
//                       <CheckCircle className="w-5 h-5 text-[#1e3a5f]" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-1">Competitive Pricing</h4>
//                       <p className="text-gray-400 text-sm">Best quality at affordable prices</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t border-white/20 pt-8">
//                   <h4 className="font-semibold mb-4">Quick Contact</h4>
//                   <div className="space-y-3">
//                     <a href="tel:+919884451005" className="flex items-center gap-3 text-[#c9a962] hover:text-white transition-colors">
//                       <Phone className="w-5 h-5" />
//                       +91-9884451005
//                     </a>
//                     <a
//                       href="mailto:sales@starindus.com?subject=Star%20Industries%20Enquiry"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-3 text-[#c9a962] hover:text-white transition-colors"
//                     >
//                       <Mail className="w-5 h-5" />
//                       sales@starindus.com
//                     </a>
//                     <div className="flex items-start gap-3 text-gray-400">
//                       <MapPin className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
//                       <span>No: 18&19, Kovalamuthu street, Periamet, Chennai - 3</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Map */}
//       <section className="h-[400px] bg-gray-200">
//         <iframe 
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.275790746846!2d80.28259507507432!3d13.085876087239548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f2f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sKovalamuthu%20Street%2C%20Periamet%2C%20Chennai%2C%20Tamil%20Nadu%20600003!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
//           width="100%" 
//           height="100%" 
//           style={{ border: 0 }}
//           allowFullScreen="" 
//           loading="lazy" 
//           referrerPolicy="no-referrer-when-downgrade"
//           title="Star Industries Location - Periamet, Chennai"
//         />
//       </section>
//     </div>
//   );
// }