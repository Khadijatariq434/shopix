// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiChevronDown } from "react-icons/fi";
// import { useCart } from "../context/CartContext";
// import { motion } from "framer-motion";
// // import { DropdownMenu } from "./ui/dropdown-menu";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
// const Navbar = () => {
//   const { cart } = useCart();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const [isCartHovered, setIsCartHovered] = useState(false);

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/category/${searchQuery.trim()}`);
//       setSearchQuery("");
//     }
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 flex items-center justify-between w-full fixed top-0 z-50 shadow-xl">
//       {/* Left Side - Logo */}
//       <div className="flex items-center space-x-8">
//         <motion.div whileHover={{ scale: 1.1 }} className="text-3xl font-extrabold tracking-widest">
//           <Link to="/">Shopix</Link>
//         </motion.div>
        
//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex space-x-6 text-lg">
//           <Link to="/" className="hover:text-gray-300 transition-all duration-300">Home</Link>

//           {/* ShadCN Category Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center hover:text-gray-300 transition duration-300">
//               Category <FiChevronDown className="ml-1" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="bg-white text-black shadow-md rounded-lg w-44">
//               <DropdownMenuItem asChild>
//                 <Link to="/category/men">Men</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/category/women">Women</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/category/kids">Kids</Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Link to="/about" className="hover:text-gray-300 transition-all duration-300">About</Link>
//         </div>
//       </div>

//       {/* Middle - Search Bar */}
//       <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full p-2 w-1/3 max-w-md shadow-md">
//         <FiSearch className="text-gray-300 mx-2" />
//         <input
//           type="text"
//           placeholder="Search category..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyDown={handleSearch}
//           className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
//         />
//       </div>

//       {/* Right Side - Icons */}
//       <div className="flex items-center space-x-6">
//         <div className="relative" onMouseEnter={() => setIsCartHovered(true)} onMouseLeave={() => setIsCartHovered(false)}>
//           <Link to="/cart">
//             <FiShoppingCart className="text-xl cursor-pointer hover:text-gray-300 transition duration-300" />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </Link>
//           {isCartHovered && cart.length === 0 && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//               className="absolute top-8 right-0 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">
//               No items in the cart
//             </motion.div>
//           )}
//         </div>
//         <Link to="/account">
//           <FiUser className="text-xl cursor-pointer hover:text-gray-300 transition duration-300" />
//         </Link>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
//             {isOpen ? <FiX className="text-xl hover:text-gray-300 transition duration-300" /> : <FiMenu className="text-xl hover:text-gray-300 transition duration-300" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <motion.div 
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="absolute top-16 right-4 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg shadow-lg flex flex-col items-start p-4 space-y-3 md:hidden"
//         >
//           <Link to="/" className="hover:text-gray-300 transition duration-300" onClick={() => setIsOpen(false)}>Home</Link>
          
//           {/* Mobile ShadCN Category Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center hover:text-gray-300 transition duration-300">
//               Category <FiChevronDown className="ml-1" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="bg-white text-black shadow-md rounded-lg w-44">
//               <DropdownMenuItem asChild>
//                 <Link to="/category/men" onClick={() => setIsOpen(false)}>Men</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/category/women" onClick={() => setIsOpen(false)}>Women</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link to="/category/kids" onClick={() => setIsOpen(false)}>Kids</Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Link to="/about" className="hover:text-gray-300 transition duration-300" onClick={() => setIsOpen(false)}>About</Link>
//         </motion.div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


"use client"

"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Home, Info, Sparkles, HelpCircle } from "lucide-react"
import { useCart } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";

const Navbar = () => {
  const { cart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const [isCartHovered, setIsCartHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/category/${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-container')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-indigo-950 to-purple-950 py-4"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-8">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="relative"
            >
              <Link
                to="/"
                className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                aria-label="Home"
              >
                Shopix
              </Link>
              <motion.span
                className="absolute -top-1 -right-4 text-yellow-300"
                animate={{
                  rotate: [0, 15, 0, 15, 0],
                  opacity: [1, 0.8, 1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                aria-hidden="true"
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Home Link with Icon and Animation */}
              <div className="group relative">
                <NavLink
                  to="/"
                  className="flex items-center text-white/80 hover:text-white transition-all duration-300 font-medium"
                >
                  <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span>Home</span>
                </NavLink>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </div>


              {/* Help Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300 font-medium"
                    aria-label="Help"
                  >
                    <span className="relative">
                      Help
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="bg-black/90 backdrop-blur-md border-purple-800 text-white w-48 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2"
                  align="start"
                >
                  <DropdownMenuItem asChild className="focus:bg-purple-900/50 focus:text-white">
                    <Link to="/contact" className="px-3 py-2 text-sm hover:text-purple-300 transition-colors">
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-purple-900/50 focus:text-white">
                    <Link to="/faq" className="px-3 py-2 text-sm hover:text-purple-300 transition-colors">
                      FAQs
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="group relative">
                <Link
                  to="/about"
                  className="flex items-center text-white/80 hover:text-white transition-all duration-300 font-medium"
                >
                  <Info className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span>About</span>
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </div>
            </div>
          </div>

          {/* Middle - Search Bar */}
          <div className="hidden md:flex relative w-1/3 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-white/10 border-purple-800/50 focus:border-purple-500 text-white placeholder:text-white/60 pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-purple-500/50"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} aria-hidden="true" />
            </div>
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/cart"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                  aria-label={`Shopping cart with ${cart.length} items`}
                >
                  <ShoppingCart className="h-5 w-5 text-white" aria-hidden="true" />
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
              <AnimatePresence>
                {isCartHovered && cart.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 bg-black/90 backdrop-blur-md border border-purple-800/50 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50 min-w-[140px]"
                  >
                    No items in cart
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/account"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="User account"
              >
                <User className="h-5 w-5 text-white" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden mobile-menu-container">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="h-5 w-5 text-white" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5 text-white" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-white/10 border-purple-800/50 focus:border-purple-500 text-white placeholder:text-white/60 pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-purple-500/50"
              aria-label="Search products"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden mobile-menu-container"
          >
            <div className="bg-black/90 backdrop-blur-md px-4 py-6 space-y-4 border-t border-purple-800/30 mt-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
                <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                Home
              </MobileNavLink>

              <div className="border-b border-purple-800/30 pb-4">
                <button 
                  className="w-full text-left text-white/80 font-medium mb-2 flex items-center"
                  onClick={() => setIsOpen(false)}
                  aria-label="Help"
                >
                  <HelpCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Help
                </button>
                <div className="pl-7 space-y-3">
                  <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
                    Contact Us
                  </MobileNavLink>
                  <MobileNavLink to="/faq" onClick={() => setIsOpen(false)}>
                    FAQs
                  </MobileNavLink>
                </div>
              </div>

              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
                <Info className="mr-2 h-5 w-5" aria-hidden="true" />
                About
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Helper components
const NavLink = ({ children, to, className, ...props }) => (
  <Link
    to={to}
    className={`group text-white/80 hover:text-white transition-all duration-300 font-medium ${className || ""}`}
    {...props}
  >
    {children}
  </Link>
)

const MobileNavLink = ({ children, to, onClick, ...props }) => (
  <Link
    to={to}
    className="flex items-center text-white/90 hover:text-purple-300 transition-all duration-300 py-2"
    onClick={onClick}
    {...props}
  >
    {children}
  </Link>
)

export default Navbar