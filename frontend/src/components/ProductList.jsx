// import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import SalesBanner from "./SalesBanner";
// import Sale from "./Sale";
// import Categories from "./Categories";
// import { Button } from "./ui/button";

// const ProductList = () => {
//   const { products, fetchProducts, loading, error, user } = useAuth();
//   const { cart, addToCart } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center pt-16 bg-gray-100 min-h-screen mt-16">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
//           Our Products
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-6">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <div className="animate-pulse">
//                 <div className="bg-gray-300 h-48 w-full"></div>
//                 <div className="p-4">
//                   <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
//                   <div className="bg-gray-300 h-4 w-1/2"></div>
//                   <div className="bg-gray-300 h-10 w-full mt-4"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen">
//       <div className="flex-grow p-6 w-full max-w-7xl">
//         <Categories />

//         <Sale />

//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
//           Our Products
//         </h1>
//         {/* <SalesBanner />  */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => {
//             console.log("Cart Items:", cart);
//             console.log("Checking for Product ID:", product._id);

//             const isInCart = cart.some(
//               (item) => item.productId._id === product._id
//             );
 
//             return (
//               <div
//                 key={product._id}
//                 className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col "
//               >
//                 <div
//                   onClick={() => navigate(`/product/${product._id}`)}
//                   className="h-48 w-full flex items-center justify-center overflow-hidden cursor-pointer"
//                 >
//                   <img
//                     src={`http://localhost:5000/${product.image}`}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                       {product.name}
//                     </h2>
//                     <p className="text-gray-600 text-sm font-medium">
//                       ₹{product.price}
//                     </p>
//                   </div>
//                   <Button className="cursor-pointer"
//                     // className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold cursor-pointer"
//                     onClick={() => {
//                       if (!user) {
//                         toast.error("Login to add products to the cart!", {
//                           duration: 2000,
//                           position: "top-right",
//                         });
//                         navigate("/account"); // Redirect to login page
//                         return;
//                       }

//                       if (isInCart) {
//                         navigate("/cart"); // Redirect to cart
//                       } else {
//                         addToCart(product._id);
//                         toast.success(`${product.name} added to cart!`, {
//                           duration: 2000,
//                           position: "top-right",
//                         });
//                       }
//                     }}
//                   >
//                     {isInCart ? "Go to Cart" : "Add to Cart"}
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default ProductList;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SalesBanner from "./SalesBanner";
import Sale from "./Sale";
import Categories from "./Categories";
import { Button } from "./ui/button";
import { ShoppingCart, Eye, Loader2 } from "lucide-react";

const ProductList = () => {
  const { products, fetchProducts, loading, error, user } = useAuth();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-16">
        <div className="flex-grow p-6 w-full max-w-7xl">
          {/* Loading placeholder for Sale component */}
          <div className="animate-pulse mb-8 h-40 w-full bg-gray-200 rounded-xl"></div>
          
          {/* Loading placeholder for Categories */}
          <div className="animate-pulse mb-10 h-16 w-full bg-gray-200 rounded-lg"></div>
  
          {/* Loading placeholder for title section */}
          <div className="mb-8 mt-10 text-center">
            <div className="animate-pulse h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-80 bg-gray-200 rounded mx-auto"></div>
          </div>
  
          {/* Product grid loader */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col border border-gray-100"
              >
                <div className="animate-pulse">
                  {/* Image placeholder */}
                  <div className="h-60 w-full bg-gray-200"></div>
                  
                  {/* Product info placeholder */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
                      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 w-full bg-gray-200 rounded-lg mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-3">Error Loading Products</h2>
        <p className="text-gray-700">{error}</p>
        <Button
          onClick={() => fetchProducts()}
          className="mt-4 bg-gray-900 hover:bg-gray-800"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="flex-grow p-6 w-full max-w-7xl">
       
      <Sale />
        <Categories />

        

        <div className="mb-8 mt-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Our Collection
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our premium selection of carefully curated products designed for quality and style.
          </p>
        </div>

        {/* <SalesBanner />  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {products.map((product) => {
            const isInCart = cart.some(
              (item) => item.productId._id === product._id
            );

            return (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col border border-gray-100 group relative"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative">
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="h-60 w-full flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src={`https://shopix-backend-yzwb.onrender.com/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'}`}>
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100 rounded-full p-3 h-auto w-auto"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100 rounded-full p-3 h-auto w-auto"
                      onClick={() => {
                        if (!user) {
                          toast.error("Login to add products to the cart!", {
                            duration: 2000,
                            position: "top-right",
                          });
                          navigate("/account"); // Redirect to login page
                          return;
                        }

                        if (isInCart) {
                          navigate("/cart"); // Redirect to cart
                        } else {
                          addToCart(product._id);
                          toast.success(`${product.name} added to cart!`, {
                            duration: 2000,
                            position: "top-right",
                          });
                        }
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {product.description || "Premium quality product"}
                    </p>
                    <p className="text-gray-900 font-bold text-lg">
                      ₹{product.price}
                    </p>
                  </div>
                  <Button
                    className={`mt-4 w-full ${isInCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-900 hover:bg-gray-800'} transition-colors duration-300`}
                    onClick={() => {
                      if (!user) {
                        toast.error("Login to add products to the cart!", {
                          duration: 2000,
                          position: "top-right",
                        });
                        navigate("/account"); // Redirect to login page
                        return;
                      }

                      if (isInCart) {
                        navigate("/cart"); // Redirect to cart
                      } else {
                        addToCart(product._id);
                        toast.success(`${product.name} added to cart!`, {
                          duration: 2000,
                          position: "top-right",
                        });
                      }
                    }}
                  >
                    {isInCart ? "Go to Cart" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductList;
