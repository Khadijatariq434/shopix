// const Sale = () => {
//     return (
//       <div className="w-full  flex justify-center my-14">
//         <img src="/images/sale.webp" alt="Sale Banner" className="max-w-full h-auto" />
//       </div>
//     );
//   };
  
//   export default Sale;
  
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock } from 'lucide-react';

const Sale = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 45,
    seconds: 30
  });

  // Update the countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ ...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59 });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({ ...timeLeft, hours: timeLeft.hours - 1, minutes: 59, seconds: 59 });
      } else if (timeLeft.days > 0) {
        setTimeLeft({ ...timeLeft, days: timeLeft.days - 1, hours: 23, minutes: 59, seconds: 59 });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="w-full my-8 overflow-hidden rounded-xl shadow-lg bg-white pt-14">
      {/* Top Sale Banner */}
      <div className="relative bg-gradient-to-r from-rose-600 to-pink-600 text-white py-1.5 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Limited Time: SUMMER SALE ends in {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</span>
        </div>
      </div>

      {/* Main Banner Content */}
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 z-0"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-yellow-200 opacity-30"></div>
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-pink-200 opacity-30"></div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {/* Left content */}
          <div className="flex flex-col justify-center px-8 py-10 md:py-16">
            <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Summer Collection
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Summer Sale is <br />
              <span className="text-rose-600">LIVE NOW!</span>
            </h2>

            <div className="mt-2 text-2xl font-bold text-amber-600">Up to 50% Off</div>

            <p className="mt-4 text-gray-600 max-w-md">
              Refresh your wardrobe with our hottest styles for the season. Limited stock available, don't miss out!
            </p>

            {/* Countdown boxes */}
            <div className="mt-6 grid grid-cols-4 gap-2 max-w-xs">
              <div className="text-center">
                <div className="bg-white shadow-md px-2 py-3 rounded-lg border border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">{String(timeLeft.days).padStart(2, '0')}</span>
                </div>
                <span className="text-xs mt-1 block text-gray-500">Days</span>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md px-2 py-3 rounded-lg border border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-xs mt-1 block text-gray-500">Hours</span>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md px-2 py-3 rounded-lg border border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-xs mt-1 block text-gray-500">Mins</span>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md px-2 py-3 rounded-lg border border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="text-xs mt-1 block text-gray-500">Secs</span>
              </div>
            </div>

            <div className="flex flex-wrap space-y-3 md:space-y-0 md:space-x-4 mt-8">
              <Link
                to="/sale"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Shop the Sale
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/new-arrivals"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Right content - Featured Products */}
          <div className="relative h-full flex items-center justify-center overflow-hidden md:py-10">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Featured Products Grid */}
              <div className="grid grid-cols-2 gap-3 p-6 max-w-md">
                {/* Product 1 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/images/1744277802666.jpg"
                      alt="Summer Dress"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      -40%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">Summer Dress</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-rose-600 font-bold">₹299</span>
                        <span className="text-gray-400 text-xs line-through ml-1">₹399</span>
                      </div>
                      <button className="text-gray-500 hover:text-rose-600">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/images/men.webp"
                      alt="Men's Shirt"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      -35%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">Men's Shirt</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-rose-600 font-bold">₹249</span>
                        <span className="text-gray-400 text-xs line-through ml-1">₹499</span>
                      </div>
                      <button className="text-gray-500 hover:text-rose-600">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/images/accessories.webp"
                      alt="Accessories"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      -50%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">Stylish Bag</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-rose-600 font-bold">₹349</span>
                        <span className="text-gray-400 text-xs line-through ml-1">₹599</span>
                      </div>
                      <button className="text-gray-500 hover:text-rose-600">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/images/footwear.webp"
                      alt="Footwear"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      -45%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">Summer Shoes</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-rose-600 font-bold">₹799</span>
                        <span className="text-gray-400 text-xs line-through ml-1">₹1699</span>
                      </div>
                      <button className="text-gray-500 hover:text-rose-600">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Offer Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 font-bold py-3 px-6 rounded-bl-2xl rounded-tr-2xl transform rotate-12 shadow-lg z-20">
                SPECIAL<br/>OFFER
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-gray-900 text-center py-3 px-4 text-white text-sm font-medium">
        Use code <span className="font-bold mx-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded">SUMMER50</span> at checkout • Free shipping on orders over $50
      </div>
    </div>
  );
};

export default Sale;
