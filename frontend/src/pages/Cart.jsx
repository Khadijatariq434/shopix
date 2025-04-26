// import toast, { Toaster } from "react-hot-toast";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";


// const Cart = () => {
//   const { user } = useAuth();
//   const { cart, removeFromCart, updateCart, loading } = useCart();

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
//         <div className="space-y-6">
//           {[...Array(3)].map((_, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300"
//             >
//               {/* Left: Image and Product Info Skeleton */}
//               <div className="flex items-center space-x-6">
//                 <div className="w-20 h-20 bg-gray-300 rounded-lg animate-pulse"></div>
//                 <div className="space-y-2">
//                   <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
//                   <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
//                   {/* Quantity Buttons Skeleton */}
//                   <div className="flex items-center mt-2">
//                     <div className="w-8 h-8 bg-gray-300 rounded-l animate-pulse"></div>
//                     <div className="w-12 h-8 bg-gray-300 mx-1 animate-pulse"></div>
//                     <div className="w-8 h-8 bg-gray-300 rounded-r animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//               {/* Right: Remove Button Skeleton */}
//               <div className="w-16 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center mt-24 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2921/2921147.png"
//           alt="Login Required"
//           className="w-48 h-48 opacity-90"
//         />
//         <h2 className="text-2xl font-bold text-gray-800 mt-6">
//           Sign in to Continue
//         </h2>
//         <p className="text-gray-600 mt-2 text-center">
//           Login to add products to your cart and enjoy seamless shopping!
//         </p>
//         <button
//           onClick={() => navigate("/login")}
//           className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
//         >
//           <Link to="/account">Login Now</Link>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
//       {cart.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//             alt="Empty Cart"
//             className="w-48 h-48 opacity-80"
//           />
//           <p className="text-gray-600 text-lg font-semibold mt-4">
//             Oops! Your cart is empty.
//           </p>
//           <p className="text-gray-500 mt-2">
//             Start adding amazing products to your cart now!
//           </p>
//           <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
//             <Link to="/">Shop Now</Link>
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => {
//             if (!item.productId || typeof item.productId.price !== "number") {
//               console.warn("Invalid cart item:", item);
//               return null; // Skip invalid items
//             }

//             return (
//               <div
//                 key={item._id}
//                 className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="flex items-center space-x-6">
//                   <img
//                     src={`http://localhost:5000/${item.productId.image}`}
//                     alt={item.productId.name || "Product"}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {item.productId.name || "Unnamed Item"}
//                     </h3>
//                     <p className="text-gray-600">
//                       ₹{item.productId.price.toFixed(2)}
//                     </p>
//                     <div className="flex items-center mt-2">
//                       <button
//                         className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300 transition-colors duration-200"
//                         onClick={() =>
//                           updateCart(item.productId._id, Math.max(1, item.quantity - 1))
//                         }
//                       >
//                         -
//                       </button>
//                       <span className="px-4 py-1 bg-white border-t border-b border-gray-200 text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300 transition-colors duration-200"
//                         onClick={() => updateCart(item.productId._id, item.quantity + 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
//                   onClick={() => {
//                     removeFromCart(item.productId._id);
//                     toast.success(`${item.productId.name} removed from cart!`, {
//                       duration: 2000,
//                       position: "top-right",
//                     });
//                   }}
//                 >
//                   Remove
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//       {cart.length > 0 && (
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <div className="flex justify-between items-center">
//             <span className="text-xl font-semibold text-gray-800">Total:</span>
//             <span className="text-xl font-bold text-gray-800">
//               ₹
//               {cart
//                 .reduce(
//                   (total, item) =>
//                     total + item.productId.price * item.quantity,
//                   0
//                 )
//                 .toFixed(2)}
//             </span>
//           </div>
//           <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//             <Link to="/checkout">Proceed to Checkout</Link>
//           </button>
//         </div>
//       )}
//       <Toaster />
//     </div>
//   );
// };


// export default Cart;

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  AlertCircle,
  TruckIcon,
  Clock,
  ArrowLeft,
  CreditCard
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart, updateCart, loading } = useCart();
  const [isRemovingItem, setIsRemovingItem] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + (item.productId?.price || 0) * item.quantity,
    0
  );

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
      toast.success("Coupon applied successfully!", {
        icon: "🎉",
        duration: 3000,
      });
    } else {
      toast.error("Invalid coupon code", {
        duration: 3000,
      });
    }
  };

  // Calculate total after discount
  const total = subtotal - discount;

  // Handle remove item animation
  const handleRemoveItem = (itemId, itemName) => {
    setIsRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      toast.success(`${itemName} removed from cart!`, {
        duration: 2000,
        position: "top-right",
      });
      setIsRemovingItem(null);
    }, 300);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300 animate-pulse"
                >
                  {/* Left: Image and Product Info Skeleton */}
                  <div className="flex items-center space-x-6 w-full md:w-auto">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                    <div className="space-y-3 flex-1">
                      <div className="w-40 h-5 bg-gray-200 rounded"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      {/* Quantity Buttons Skeleton */}
                      <div className="flex items-center mt-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="w-12 h-8 bg-gray-200 mx-2 rounded"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  {/* Right: Remove Button and Price Skeleton */}
                  <div className="flex items-center mt-4 md:mt-0">
                    <div className="w-20 h-7 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="w-16 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 flex items-center justify-center">
              <div className="text-white max-w-md">
                <ShoppingBag className="h-16 w-16 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Your shopping experience awaits!</h2>
                <p className="text-blue-100 mb-8">
                  Sign in to view your cart, save items, and enjoy a personalized shopping experience.
                </p>
                <Link
                  to="/account"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                >
                  Sign in now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Not signed in</h3>
                <p className="text-gray-600 mb-8">
                  You need to be logged in to access your cart and checkout. Create an account to track orders and get personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/account"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/"
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-8">
              <ShoppingCart className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-bold">0</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
              <p className="text-gray-600 text-center max-w-md mb-8">
                Looks like you haven't added anything to your cart yet.
                Explore our products and find something you'll love!
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-8">
            <ShoppingCart className="h-6 w-6 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            <span className="ml-3 bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Cart header - mobile hidden, desktop visible */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart items */}
          <div className="space-y-6 mt-6">
            {cart.map((item) => {
              if (!item.productId || typeof item.productId.price !== "number") {
                console.warn("Invalid cart item:", item);
                return null; // Skip invalid items
              }

              const itemTotal = item.productId.price * item.quantity;

              return (
                <div
                  key={item._id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:p-6 bg-gray-50 rounded-xl transition-all duration-300 ${
                    isRemovingItem === item.productId._id ? 'opacity-50 transform -translate-x-4' : ''
                  }`}
                >
                  {/* Product info */}
                  <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`http://localhost:5000/${item.productId.image}`}
                        alt={item.productId.name || "Product"}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-200"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{item.quantity}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.productId.name || "Unnamed Item"}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        {item.productId.category && (
                          <span className="mr-3">{item.productId.category}</span>
                        )}
                        {item.productId.brand && (
                          <span>{item.productId.brand}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId._id, item.productId.name)}
                        className="inline-flex items-center text-sm text-red-500 hover:text-red-700 md:hidden"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button
                        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        onClick={() =>
                          updateCart(item.productId._id, Math.max(1, item.quantity - 1))
                        }
                        aria-label="Decrease quantity"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        onClick={() => updateCart(item.productId._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-right mt-4 md:mt-0">
                    <span className="text-gray-600 md:hidden mr-2">Price:</span>
                    <span className="font-medium text-gray-800">₹{item.productId.price.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center mt-4 md:mt-0">
                    <span className="text-gray-600 md:hidden mr-2">Total:</span>
                    <span className="font-bold text-gray-900">₹{itemTotal.toFixed(2)}</span>

                    {/* Desktop remove button */}
                    <button
                      className="hidden md:inline-flex items-center justify-center ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      onClick={() => handleRemoveItem(item.productId._id, item.productId.name)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="mt-10 grid md:grid-cols-12 gap-10">
            {/* Coupon Code */}
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Have a promo code?</h3>
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={`px-4 py-2 rounded-r-lg font-medium ${
                      couponApplied
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
                    }`}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <span className="inline-block w-4 h-4 bg-green-600 rounded-full mr-2 flex items-center justify-center text-white">✓</span>
                    10% discount applied!
                  </p>
                )}

                {/* Shipping info */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-700">
                    <TruckIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Free shipping on orders over ₹500</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Delivery estimated: 3-5 business days</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    to="/"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Cart totals */}
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-800">
                      {subtotal > 500 ? 'Free' : '₹40.00'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200 pt-4 mt-2">
                    <span className="text-gray-800">Total</span>
                    <span className="text-indigo-700">
                      ₹{(total + (subtotal > 500 ? 0 : 40)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  Secure checkout with encrypted payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Cart;
