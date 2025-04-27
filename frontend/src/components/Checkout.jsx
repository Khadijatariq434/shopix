import React, { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const Checkout = () => {
  const { cart } = useCart();
  const { clearCart } = useContext(AppContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for checkout
  const [address, setAddress] = useState({
    street: "",
    area: "",
    city: "",
    pincode: "",
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!mobile.trim()) {
      toast.error("Please enter your mobile number.");
      return;
    }
    if (!address.street || !address.area || !address.city || !address.pincode) {
      toast.error("Please enter your complete address.");
      return;
    }

    setLoading(true); // Start loading
    try {
      console.log("Cart Items:", cart);

      const orderData = {
        products: cart.map((item) => ({
          product: item.productId._id,
          quantity: item.quantity,
        })),
        totalAmount: cart.reduce(
          (total, item) => total + item.productId.price * item.quantity,
          0
        ),
        mobile,
        address,
      };

      console.log("Order Data:", orderData);

      const response = await axios.post("https://shopix-backend-yzwb.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      toast.success("Your order has been placed! 🎉");

      // Clear cart on backend
      await axios.delete("http://localhost:5000/api/cart/clear-cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      clearCart(); // Clears cart from frontend state

      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } catch (error) {
      toast.error("Failed to place order ❌");
      console.error("Checkout Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      {/* Mobile Number Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter your mobile number"
        />
      </div>

      {/* Address Inputs */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Address</label>

        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleAddressChange}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Street"
        />

        <input
          type="text"
          name="area"
          value={address.area}
          onChange={handleAddressChange}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Area"
        />

        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="City"
        />

        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleAddressChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Pincode"
        />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.productId._id} className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.productId.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="text-gray-600">
              ₹{(item.productId.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-gray-800">
            ₹
            {cart
              .reduce((total, item) => total + item.productId.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>

        {/* Checkout Button with Spinner */}
        <button
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
          onClick={handleCheckout}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
