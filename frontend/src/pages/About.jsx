import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pt-24">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">About Shopix</h1>
        <p className="text-gray-600 mt-2">
          Your one-stop shop for all your needs!
        </p>
      </motion.div>

      {/* About Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/images/about.webp"
          alt="Shopix Store"
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Shopix is your trusted online marketplace, bringing high-quality
            products at unbeatable prices. We are committed to delivering the
            best shopping experience with a wide range of categories, from
            fashion to electronics.
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div 
        className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Our Mission & Vision
        </h2>
        <p className="text-gray-600 mt-4 text-center">
          Our mission is to make shopping easy, accessible, and affordable for
          everyone. We envision a world where quality meets convenience,
          ensuring every customer gets the best value for their money.
        </p>
      </motion.div>

      {/* Commitment Section */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Why Choose Shopix?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-6">
          {[
            { title: "High-Quality Products", desc: "We ensure top-notch quality in every product we offer." },
            { title: "Fast & Secure Delivery", desc: "Your orders reach you on time with our reliable logistics." },
            { title: "Customer Satisfaction", desc: "We prioritize our customers and aim for 100% satisfaction." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 border rounded-lg shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-700">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800">Get In Touch</h2>
        <p className="text-gray-600 mt-4">
          Have questions? Feel free to reach out to us!
        </p>
        <p className="text-gray-700 mt-2 font-medium">📧 support@shopix.com</p>
        <p className="text-gray-700 font-medium">📞 +91 123 456 7890</p>
      </motion.div>
    </div>
  );
};

export default About;
