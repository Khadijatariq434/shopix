import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiPackage, FiCheckCircle } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setProduct(data);

        // Mock additional images (in a real app, you'd get these from the API)
        if (data.image) {
          data.images = [
            data.image,
            data.image, // Normally these would be different images
            data.image,
          ];
        }

        // Fetch similar products
        fetchSimilarProducts(data.category);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async (category) => {
      try {
        // In a real app, you'd fetch similar products based on category or tags
        // Mock data for now
        const res = await fetch('http://localhost:5000/api/products?limit=4');
        const data = await res.json();
        setSimilarProducts(data.products || data);
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
      }
    };

    fetchProduct();
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 rounded-lg p-6 inline-block mx-auto">
          <p className="text-xl text-red-600 font-medium">{error}</p>
          <button
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.productId?._id === product._id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to your cart", {
        icon: '🔒',
        duration: 3000,
        position: "top-center",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/account");
      return;
    }

    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product._id, quantity);
      toast.success(
        <div className="flex items-center">
          <img
            src={`http://localhost:5000/${product.image}`}
            alt=""
            className="w-10 h-10 object-cover rounded mr-2"
          />
          <span>Added to your cart!</span>
        </div>,
        {
          duration: 3000,
          position: "bottom-right",
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<AiFillStar key={i} className="text-yellow-500" size={18} />);
      } else {
        stars.push(<AiOutlineStar key={i} className="text-yellow-500" size={18} />);
      }
    }
    return stars;
  };

  // Calculate average rating
  const avgRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="bg-white">
      <Toaster />

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-3 text-sm text-gray-500 mt-16">
        <ol className="flex items-center space-x-1">
          <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li><Link to="/products" className="hover:text-blue-600 transition">Products</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center border">
              <img
                src={`http://localhost:5000/${product.images ? product.images[activeImage] : product.image}`}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0
                      ${activeImage === idx ? 'border-blue-600' : 'border-gray-200'}`}
                  >
                    <img
                      src={`http://localhost:5000/${img}`}
                      alt={`${product.name} - view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Ratings & Reviews Summary */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(Math.round(avgRating))}
                </div>
                <span className="text-sm text-gray-500 inline-block">
                  ({product.reviews?.length || 0} {product.reviews?.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-md">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Availability */}
              <p className="text-green-600 flex items-center">
                <FiCheckCircle className="mr-1.5" />
                In Stock
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="border-t border-b py-6 space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" />
                  {isInCart ? "View Cart" : "Add to Cart"}
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center">
                  Buy Now
                </button>
                <button className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <FiHeart className="text-gray-700" />
                </button>
                <button className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <FiShare2 className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Product Features & Shipping */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiTruck className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-500">On orders over ₹500</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiPackage className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-sm text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.material && (
                  <div className="flex">
                    <span className="w-24 text-gray-500">Material</span>
                    <span className="flex-1 font-medium">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex">
                    <span className="w-24 text-gray-500">Weight</span>
                    <span className="flex-1 font-medium">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex">
                    <span className="w-24 text-gray-500">Dimensions</span>
                    <span className="flex-1 font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex">
                    <span className="w-24 text-gray-500">Color</span>
                    <span className="flex-1 font-medium">{product.color}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Specifications, Reviews */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a href="#reviews" className="border-b-2 border-blue-600 py-4 px-1 text-sm font-medium text-blue-600">
                Customer Reviews
              </a>
            </nav>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Write a Review
              </button>
            </div>

            {/* Review Stats */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-end">
                      <span className="text-5xl font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                      <span className="text-lg text-gray-500 ml-2 mb-1">out of 5</span>
                    </div>
                    <div className="flex mt-2">
                      {renderStars(Math.round(avgRating))}
                    </div>
                    <p className="mt-1 text-gray-500">Based on {product.reviews.length} reviews</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = product.reviews.filter(r => r.rating === star).length;
                      const percentage = product.reviews.length ? (count / product.reviews.length) * 100 : 0;

                      return (
                        <div key={star} className="flex items-center text-sm">
                          <div className="flex items-center w-8">
                            {star} <AiFillStar className="ml-1 text-yellow-500" size={14} />
                          </div>
                          <div className="w-full ml-2 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-yellow-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 w-9 text-xs text-gray-500">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg text-gray-900">{review.user}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                        Helpful (0)
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this product!</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/product/${item._id}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mt-1">₹{item.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
