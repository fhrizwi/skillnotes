import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('skillnotes-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('skillnotes-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, don't add duplicate
        return prevItems;
      } else {
        // If item doesn't exist, add it
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const completePurchase = () => {
    try {
      // Save current cart items to purchases
      const savedPurchases = localStorage.getItem('skillnotes-purchases');
      const existingPurchases = savedPurchases ? JSON.parse(savedPurchases) : [];
      const newPurchases = [...existingPurchases, ...cartItems];
      localStorage.setItem('skillnotes-purchases', JSON.stringify(newPurchases));
      
      // Clear the cart after successful purchase
      setCartItems([]);
      return { success: true, itemCount: cartItems.length };
    } catch (error) {
      return { success: false, error: 'Failed to complete purchase. Please try again.' };
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    completePurchase
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};