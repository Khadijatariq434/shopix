import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Women Clothing", image: "/images/women.avif", link: "/category/women" },
  { name: "Men Clothing", image: "/images/men.webp", link: "/category/men" },
  { name: "Kids Clothing", image: "/images/kid.webp", link: "/category/kids" },
  { name: "Footwear", image: "/images/footwear.webp", link: "/category/footwear" },
  { name: "Beauty & Wellness", image: "/images/beauty.webp", link: "/category/beauty" },
  { name: "Accessories & More", image: "/images/accessories.webp", link: "/category/accessories" },
  { name: "Home Decor", image: "/images/home.webp", link: "/category/home-decor" },
  { name: "Home Furnishing", image: "/images/furniture.webp", link: "/category/home-furnishing" },
  { name: "Kitchen & Appliances", image: "/images/kitchen.webp", link: "/category/kitchen" },
];

const Categories = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: false }));
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
      
      setTimeout(handleScroll, 300);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.unobserve(container);
      };
    }
  }, []);

  return (
    <div className="relative mt-28 mb-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded"></div>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-gray-800 hover:bg-gray-100 transition-all hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 text-gray-800 hover:bg-gray-100 transition-all hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-4 scroll-smooth"
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className="flex flex-col items-center text-center group flex-shrink-0 w-24 sm:w-28 md:w-32"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-50 to-purple-100 shadow-inner"></div>
                
                {/* Image container - now with padding to make image smaller */}
                <div className="relative w-full h-full rounded-full border-2 border-gray-100 shadow-md overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-indigo-300">
                  <div className="w-full h-full p-3 rounded-full overflow-hidden bg-white"> {/* Increased padding */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`w-full h-full object-contain rounded-full transition-all duration-500 group-hover:saturate-150 ${
                        loadedImages[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                  </div>
                </div>
                
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs text-gray-500">Loading...</span>
                  </div>
                )}
              </div>

              <p className="mt-1 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors duration-200 whitespace-nowrap">
                {category.name}
              </p>
              <div className="h-0.5 w-0 bg-indigo-600 group-hover:w-3/4 transition-all duration-300 mt-1"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;