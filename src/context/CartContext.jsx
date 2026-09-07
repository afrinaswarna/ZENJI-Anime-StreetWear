import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add Item to Cart (Increases quantity if already added)
  // const addToCart = (product) => {
  //   setCartItems((prev) => {
  //     const exists = prev.find((item) => item.id === product.id);
  //     if (exists) {
  //       return prev.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };
// Add to Cart Logic (Always Increments Quantity)
const addToCart = (product) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      // Product exists -> Increment quantity
      return prev.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // New product -> Add with quantity 1
    return [...prev, { ...product, quantity: 1 }];
  });
};
  // Update Cart Quantity (+ / -)
  const updateCartQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle Wishlist (Add if absent, Remove if present)
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Remove Specific Item from Wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Derived Counts
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlistItems.length;
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        removeFromWishlist,
        totalCartCount,
        totalWishlistCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);