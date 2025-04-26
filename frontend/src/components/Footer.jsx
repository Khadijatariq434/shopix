import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-950 to-purple-950 text-white w-full mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center mb-4">
              <Link
                to="/"
                className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Shopix
              </Link>
              <motion.span
                className="ml-1 text-yellow-300"
                animate={{
                  rotate: [0, 15, 0, 15, 0],
                  opacity: [1, 0.8, 1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.span>
            </div>
            <p className="text-white/70 mb-4">
              Your one-stop shop for all the latest trends and fashion essentials.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/category" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Shop Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/new-arrivals" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/sale" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Sale Items
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-white/70 hover:text-purple-300 transition-all flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-white/70 hover:text-purple-300 transition-all">
                <Mail className="h-5 w-5 mr-2 text-purple-300" />
                <span>support@shopix.com</span>
              </div>
              <div className="flex items-center text-white/70 hover:text-purple-300 transition-all">
                <Phone className="h-5 w-5 mr-2 text-purple-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-white/10 border border-purple-800/50 text-white placeholder-white/50 px-4 py-2 rounded-l-full focus:outline-none focus:ring-1 focus:ring-purple-400 w-full"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-r-full text-sm font-medium"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-800/50 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} Shopix. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-all">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 hover:text-white text-sm transition-all">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-white/50 hover:text-white text-sm transition-all">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;