// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// const CategoryList = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { cart, addToCart } = useCart();
//   const {user}=useAuth();
//   const navigate=useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     setTimeout(() => {
//       fetch(`http://localhost:5000/api/products?category=${category}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data.products);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching products:", err);
//           setError("Failed to load products");
//           setLoading(false);
//         });
//     }, 2000);
//   }, [category]);

//   if (loading)
//     return (
//       <div className="flex flex-col items-center pt-16 h-screen bg-gray-100">
//         <div role="status" className="flex justify-center items-center h-32 mt-16">
//         <svg
//   aria-hidden="true"
//   className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
//   viewBox="0 0 100 100"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" fill="none" />
//   <path
//     fill="currentColor"
//     d="M50 5 A45 45 0 1 1 5 50.5"
//   />
// </svg>

//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );

//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col items-center pt-16 h-screen bg-gray-100 mt-11">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Showing results for: {category}
//       </h1>
//       <div className="w-full max-w-7xl px-4">
//         {products.length === 0 ? (
//           <p className="text-center text-gray-500 py-20">No products found in this category.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => {
//               const isInCart = cart.some((item) => item.productId._id === product._id);
//               return (
//                 <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center">
//                   <img
//                     src={`http://localhost:5000/${product.image.replace("uploads/", "")}`}
//                     alt={product.name}
//                   />
//                   <h2 className="text-lg font-bold mt-2">{product.name}</h2>
//                   <p className="text-gray-600">₹{product.price}</p>
//                   <button
//                     className={`mt-4 w-full py-2 rounded-lg transition duration-300 font-semibold cursor-pointer ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
//                     onClick={() => {
//                       if (!user) {
//                         toast.error("Login to add products to the cart!", {
//                           duration: 2000,
//                           position: "top-right",
//                         });
//                         navigate("/account"); // Redirect to login page
//                         return;
//                       }
                  
//                       if (!isInCart) {
//                         addToCart(product._id);
//                         toast.success(`${product.name} added to cart!`, {
//                           duration: 2000,
//                           position: "top-right",
//                         });
//                       }
//                     }}
//                     disabled={isInCart}
//                   >
//                     {isInCart ? "Added to Cart" : "Add to Cart"}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default CategoryList;
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Eye, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const CategoryList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Set a timeout to ensure loading lasts at least 3 seconds
    const loadingTimer = setTimeout(() => {
      fetch(`http://localhost:5000/api/products?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError("Failed to load products");
          setLoading(false);
        });
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(loadingTimer);
  }, [category]);

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-16">
        <div className="flex-grow p-6 w-full max-w-7xl">
          {/* Title placeholder */}
          <div className="mb-8 mt-10 text-center">
            <div className="animate-pulse h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
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

  // Rest of the component remains the same...
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Error Loading Products</h2>
          <p className="text-gray-700">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gray-900 hover:bg-gray-800"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pt-11">
      <div className="flex-grow p-6 w-full max-w-7xl">
        <div className="mb-8 mt-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)} Collection
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our premium selection of {category} products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium text-gray-700 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">We couldn't find any products in this category.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gray-900 hover:bg-gray-800"
            >
              Browse All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {products.map((product) => {
              const isInCart = cart.some((item) => item.productId._id === product._id);
              
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
                        src={`http://localhost:5000/${product.image}`}
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
                            navigate("/account");
                            return;
                          }

                          if (isInCart) {
                            navigate("/cart");
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
                          navigate("/account");
                          return;
                        }

                        if (isInCart) {
                          navigate("/cart");
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
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default CategoryList;