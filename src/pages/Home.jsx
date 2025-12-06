import React, { useState } from 'react';
import { CheckCircle, Wrench, HardHat, Award, Phone, MessageCircle, Clock, Shield, ThumbsUp, Users, ArrowRight, Star, MapPin, Mail, Sparkles, TrendingUp, Package, Zap, Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Mrs. Adeyemi",
      role: "Homeowner, Lekki",
      text: "T Square transformed our home with beautiful sliding windows. The quality is exceptional and installation was seamless. Highly recommended!",
      rating: 5
    },
    {
      name: "Mr. Chukwu",
      role: "Business Owner, VI",
      text: "They handled our office partition project professionally. Finished ahead of schedule and the result exceeded our expectations.",
      rating: 5
    },
    {
      name: "Engr. Bola",
      role: "Property Developer",
      text: "I've worked with T Square on multiple projects. Their attention to detail and quality materials make them my go-to aluminium company.",
      rating: 5
    }
  ];

  const gallery = [
    { img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80", title: "Modern Windows" },
    { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Office Partitions" },
    { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", title: "Glass Doors" },
    { img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80", title: "Shop Fronts" },
    { img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", title: "Kitchen Cabinets" },
    { img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80", title: "Shower Cubicles" }
  ];

  const processSteps = [
    { icon: Phone, title: "Contact Us", desc: "Reach out via call or WhatsApp" },
    { icon: Eye, title: "Free Inspection", desc: "We visit your site at no cost" },
    { icon: Package, title: "Custom Quote", desc: "Receive detailed pricing" },
    { icon: Wrench, title: "Fabrication", desc: "Expert crafting at our factory" },
    { icon: CheckCircle, title: "Installation", desc: "Professional on-site setup" }
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Aluminium Works" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/50 to-slate-900/90"></div>
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-blue-400/20"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold px-6 py-3 rounded-full shadow-2xl"
          >
            <Sparkles className="w-5 h-5" />
            <span>10+ Years of Excellence</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Premium Aluminium Works
            <br/>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Built to Last
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Expert design and installation of windows, doors, roofing, and office partitions. 
            <span className="text-blue-400 font-semibold"> Factory-direct pricing</span> with premium quality across Lagos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#services" 
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              View Our Works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://wa.me/2348106151579" 
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-8 bg-white shadow-2xl -mt-20 relative z-20 mx-4 md:mx-8 rounded-2xl">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { number: "10+", label: "Years Experience", icon: TrendingUp },
            { number: "500+", label: "Projects Done", icon: Package },
            { number: "100%", label: "Quality Finish", icon: Award },
            { number: "24/7", label: "Support", icon: Clock }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="py-4"
            >
              <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stat.number}</h3>
              <p className="text-gray-600 font-semibold mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-full mb-4">
              <Target className="w-4 h-4" />
              WHO WE ARE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              T Square Aluminium Enterprises
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Located in the heart of <span className="font-semibold text-blue-600">Aluminium Village, Dopemu</span>, we are a trusted name in fabrication and installation. We don't just build; we craft solutions that last a lifetime.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              From simple window repairs to complex office complexes, our team of experienced craftsmen delivers excellence in every project. We combine traditional craftsmanship with modern techniques to ensure superior results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, text: "Fast Delivery & Installation" },
                { icon: Award, text: "High Quality Materials Only" },
                { icon: ThumbsUp, text: "Affordable Factory Pricing" },
                { icon: Eye, text: "Free Site Inspection" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-green-100 p-2 rounded-lg">
                    <item.icon className="text-green-600 w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-800">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl transform rotate-3"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="T Square Workshop" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-gray-600 text-sm">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose T Square?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">We deliver exceptional value through quality, expertise, and customer-focused service</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Award, 
                title: "Premium Materials", 
                desc: "We source only the highest grade aluminium and glass, ensuring durability and longevity for every installation."
              },
              { 
                icon: Users, 
                title: "Expert Team", 
                desc: "Our certified craftsmen bring over a decade of experience, handling projects with precision and professionalism."
              },
              { 
                icon: Clock, 
                title: "Timely Delivery", 
                desc: "We respect your schedule. Projects are completed on time without compromising on quality or attention to detail."
              },
              { 
                icon: ThumbsUp, 
                title: "Factory Direct", 
                desc: "No middlemen means better prices. Get factory-fresh products at competitive rates without hidden costs."
              },
              { 
                icon: Shield, 
                title: "Quality Guarantee", 
                desc: "Every project comes with our quality assurance. We stand behind our work with comprehensive warranties."
              },
              { 
                icon: Phone, 
                title: "24/7 Support", 
                desc: "Questions? Concerns? Our support team is always available to assist you before, during, and after installation."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white px-4" id="services">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive aluminium and glass solutions for residential and commercial projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80",
                title: "Windows & Doors", 
                desc: "Casement, sliding, and projected windows with premium quality glass and hardware." 
              },
              { 
                icon: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
                title: "Office Partitions", 
                desc: "Modern glass and aluminium partitioning systems for professional corporate spaces." 
              },
              { 
                icon: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
                title: "Roofing Sheets", 
                desc: "Durable long-span aluminium roofing with expert installation and maintenance services." 
              },
              { 
                icon: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80",
                title: "Shower Cubicles", 
                desc: "Elegant glass shower enclosures and bathroom fittings for luxury bathrooms." 
              },
              { 
                icon: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80",
                title: "Shop Fronts", 
                desc: "Eye-catching toughened glass storefronts that showcase your business professionally." 
              },
              { 
                icon: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&q=80",
                title: "Kitchen Cabinets", 
                desc: "Stylish and durable aluminium kitchen cabinets with modern fittings and accessories." 
              },
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                  <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Simple, transparent process from consultation to completion</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 relative">
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
              
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="bg-white border-4 border-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10 group hover:border-blue-400 transition-colors">
                    <step.icon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Recent Projects</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Browse through our portfolio of completed installations</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
              >
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-200 text-sm">View Project Details</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:-translate-y-0.5">
              View Full Portfolio
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg">Trusted by hundreds of satisfied customers across Lagos</p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-8 text-center italic">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">{testimonials[activeTestimonial].name}</p>
                <p className="text-blue-600">{testimonials[activeTestimonial].role}</p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white px-4" id="contact">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 mb-4">Get in touch for a free consultation and quote</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 inline-block">
              <div className="flex items-start gap-3 text-left">
                <MapPin className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-yellow-400 mb-1">Visit Our Factory</p>
                  <p className="text-gray-200">22, Adebiyi Ayopo Street, Aluminium Village, Dopemu, Lagos State</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <a 
                href="tel:+2347065046511" 
                className="group bg-white text-slate-900 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-600">Call Us</p>
                  <p className="text-sm">+234 706 504 6511</p>
                </div>
              </a>
              <a 
                href="https://wa.me/2348106151579" 
                className="group bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-xs text-green-100">WhatsApp</p>
                  <p className="text-sm">+234 810 615 1579</p>
                </div>
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              Open Monday - Saturday, 8:00 AM - 6:00 PM
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">T Square Aluminium</h3>
              <p className="text-sm leading-relaxed">Your trusted partner for premium aluminium and glass installations across Lagos.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>22, Adebiyi Ayopo Street, Dopemu, Lagos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+234 706 504 6511</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>+234 810 615 1579</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 T Square Aluminium Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;