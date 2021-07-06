import { useState, useContext, createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export const CartStateProvider = ({ children }) => {
  // Custom provider to store state

  // Closed by default
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
};

// Custom hook for accessing the cart
export const useCart = () => {
  const all = useContext(LocalStateContext);

  return all;
};
