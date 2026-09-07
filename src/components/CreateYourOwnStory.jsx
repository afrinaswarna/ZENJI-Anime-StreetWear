import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const CreateYourOwnStory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="bg-brand-bg py-16 text-center text-zinc-400 font-mono text-sm">
        Loading Carousel...
      </section>
    );
  }

  const marqueeProducts = [...products, ...products];

  // Category Badge Color Helper Function
  const getBadgeStyle = (category) => {
    switch (category?.toLowerCase()) {
      case "sale":
        return "bg-red-600 text-white border-red-500";
      case "new arrival":
        return "bg-emerald-600 text-white border-emerald-500";
      case "limited stock":
        return "bg-amber-600 text-white border-amber-500";
      case "best seller":
        return "bg-purple-600 text-white border-purple-500";
      default:
        return "bg-zinc-800 text-zinc-200 border-zinc-700";
    }
  };

  return (
    <section className=" text-brand-bg py-16 border-b border-brand-border overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 px-4">
        <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-bg">
          Create Your Perfect Look
        </h2>
        <p className="text-zinc-600 text-sm mt-2 font-body">
          Follow the most popular trends and get exclusive items from shop
        </p>
      </div>

      {/* Moving Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex gap-6">
          {marqueeProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="w-64 sm:w-72 flex-shrink-0 group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-3 rounded-sm">
                
                {/* Dynamic Category Badge (Sale, New Arrival, Limited Stock) */}
                {product.category && (
                  <div
                    className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border z-10 shadow-md ${getBadgeStyle(
                      product.category
                    )}`}
                  >
                    {product.category}
                  </div>
                )}

                {/* Main Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Action Icons */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button 
                    aria-label="Add to Cart"
                    className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </button>
                  <button 
                    aria-label="Wishlist"
                    className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button 
                    aria-label="Quick View"
                    className="bg-white text-black p-2.5 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] text-zinc-800 font-mono tracking-wider uppercase">
                  {product.colorway || "Clothing"}
                </span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-sm font-semibold text-zinc-800 hover:text-white transition-colors truncate">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 font-mono text-sm pt-0.5">
                  <span className="font-bold text-zinc-500">
                    A${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-zinc-500 line-through text-xs">
                      A${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateYourOwnStory;