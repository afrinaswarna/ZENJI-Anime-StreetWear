import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../context/CartContext"; // Adjust path if necessary

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    cartItems,
    wishlistItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    removeFromWishlist,
    totalCartCount,
    totalWishlistCount,
    cartTotal,
  } = useCart();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP ALL", path: "/shop-all" },
    { name: "NEW DROPS", path: "/new-drops" },
    { name: "About Us", path: "/about-us" },
    { name: "REVIEWS", path: "/reviews" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="font-display text-2xl font-black tracking-widest text-white">
              ZENJI<span className="text-brand-primary">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-display text-xs font-semibold tracking-widest transition-colors ${
                      isActive ? "text-brand-primary" : "text-zinc-300 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Header Action Icons & Mobile Hamburger */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Wishlist Trigger */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative text-zinc-300 hover:text-brand-primary transition-colors p-1"
                aria-label="Open Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {totalWishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold font-mono h-4 w-4 rounded-full flex items-center justify-center">
                    {totalWishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative text-zinc-300 hover:text-brand-primary transition-colors p-1"
                aria-label="Open Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-brand-primary text-white text-[10px] font-bold font-mono h-4 w-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-zinc-300 hover:text-white p-1 focus:outline-none"
                aria-label="Toggle Mobile Navigation"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- MOBILE MENU DROPDOWN ---------------- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 transition-all duration-300">
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block font-display text-sm font-semibold tracking-wider py-2 transition-colors ${
                      isActive ? "text-brand-primary" : "text-zinc-300 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ---------------- CART DRAWER ---------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col justify-between p-6 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>Your Shopping Cart</span>
                    <span className="text-xs font-mono text-zinc-400">({totalCartCount})</span>
                  </h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white text-lg">✕</button>
                </div>

                <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-zinc-500 font-mono text-sm py-12">Your cart is empty.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-zinc-800" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <h3 className="font-display text-xs font-bold text-zinc-200">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-400 text-xs">✕</button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-zinc-700 rounded px-2 py-0.5 text-xs font-mono gap-2">
                              <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                            </div>
                            <span className="font-mono text-xs font-bold">A${((item.price || 0) * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-zinc-400">Subtotal:</span>
                    <span className="font-bold text-white">A${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full py-3 bg-white text-black text-center font-display text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors rounded"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- WISHLIST DRAWER ---------------- */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col justify-between p-6 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>Your Wishlist</span>
                    <span className="text-xs font-mono text-zinc-400">({totalWishlistCount})</span>
                  </h2>
                  <button onClick={() => setIsWishlistOpen(false)} className="text-zinc-400 hover:text-white text-lg">✕</button>
                </div>

                <div className="mt-6 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  {wishlistItems.length === 0 ? (
                    <p className="text-center text-zinc-500 font-mono text-sm py-12">Your wishlist is currently empty.</p>
                  ) : (
                    wishlistItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-zinc-800" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <h3 className="font-display text-xs font-bold text-zinc-200">{item.name}</h3>
                            <button onClick={() => removeFromWishlist(item.id)} className="text-zinc-500 hover:text-red-400 text-xs">✕</button>
                          </div>
                          <p className="font-mono text-xs font-bold text-zinc-400 mt-1">
                            A${item.price ? item.price.toFixed(2) : "0.00"}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(item);
                              removeFromWishlist(item.id);
                            }}
                            className="mt-2 text-left text-[11px] font-mono text-brand-primary hover:underline uppercase tracking-wider"
                          >
                            + Move to Cart
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;