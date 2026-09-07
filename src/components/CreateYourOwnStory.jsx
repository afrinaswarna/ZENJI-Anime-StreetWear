import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext"; // Adjust path

const CreateYourOwnStory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Context থেকে কার্ট ও উইশলিস্ট ফাংশন ব্যবহার
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product); // এটি সরাসরি Navbar-এর কার্ট কাউন্ট বাড়াবে!
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <section className="bg-brand-bg py-16 text-center text-zinc-400 font-mono text-sm">
        Loading Carousel...
      </section>
    );
  }

  const marqueeProducts = [...products, ...products];

  return (
    <section className="text-brand-bg py-16 border-b border-brand-border overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center max-w-3xl mx-auto mb-12 px-4">
        <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-bg">
          Wear Your Own Story
        </h2>
        <p className="text-zinc-600 text-sm mt-2 font-body">
          Follow the most popular trends and get exclusive items from shop
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-scroll flex gap-6">
          {marqueeProducts.map((product, index) => {
            const isWishlisted = wishlistItems.some((item) => item.id === product.id);

            return (
              <div key={`${product.id}-${index}`} className="w-64 sm:w-72 flex-shrink-0 group relative flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-3 rounded-sm">
                  
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                    
                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-white text-black p-2.5 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                      title="Add to Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(e, product)}
                      className={`p-2.5 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 ${
                        isWishlisted ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-600 hover:text-white"
                      }`}
                      title="Wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={(e) => handleQuickView(e, product.id)}
                      className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                      title="View Details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-sm font-semibold text-zinc-800 hover:text-brand-primary transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-mono text-sm font-bold text-zinc-500">
                    A${product.price ? product.price.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreateYourOwnStory;