import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext"; // Import Auth Context
import { AppContext } from "./AppContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(AppContext);

  // Set your Render API URL
  const backendUrl = "https://shopix-backend-yzwb.onrender.com"; // Replace with your Render API URL

  // Fetch cart items when the context loads
  const fetchCart = async () => {
    if (!user || !user.token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Ensures loading is visible for at least 3 seconds
    }
  };

  // Add to Cart
  const addToCart = async (productId) => {
    if (!user || !user.token) return;
    try {
      const res = await fetch(`${backendUrl}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (res.ok) {
        fetchCart(); // Fetch updated cart after adding
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    if (!user || !user.token) return;
    try {
      await fetch(`${backendUrl}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchCart(); // Refresh cart after removing
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update Cart Quantity
  const updateCart = async (productId, quantity) => {
    if (!user || !user.token) return;
    try {
      const res = await fetch(`${backendUrl}/api/cart/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]); // Refetch cart when user changes

  const cartContextValue = useMemo(
    () => ({
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateCart,
      fetchCart,
    }),
    [cart, loading]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
