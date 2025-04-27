import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

// ===== Backend URL =====
const BACKEND_URL = "https://shopix-backend-yzwb.onrender.com";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userInitialized = useRef(false);
  const { clearCart } = useContext(AppContext);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();

      setTimeout(() => {
        setProducts(data.products); // Update state after delay
        setLoading(false); // Set loading false only after updating products
      }, 2000);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", error);
      setLoading(false); // Ensure loading stops if fetch fails
    }
  }, []);

  const addProduct = async (formData) => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setProducts((prev) => [...prev, data.product]);
    } catch (error) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", error.message);
    }
  };

  const updateProduct = async (id, formData) => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? data : product))
      );

      return data;
    } catch (error) {
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } else {
        const errorText = await res.text();
        console.error(`Error deleting product: ${res.status} - ${errorText}`);
      }
    } catch (error) {
      setError("Failed to delete product. Please try again.");
      console.error("Error deleting product:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Check for logged-in user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setError("Failed to load user data.");
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  // Login Function
  const login = (userData) => {
    if (userData.token) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      if (window.location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    } else {
      console.error("Token is missing from userData");
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    navigate("/account");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        products,
        fetchProducts,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
