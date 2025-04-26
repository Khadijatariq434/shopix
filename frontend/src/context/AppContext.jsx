import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const clearCart = () => setCart([]); // Clears cart on logout

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};
