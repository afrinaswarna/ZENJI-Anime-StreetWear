import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const BestSellerProducts = () => {
  const [bestSellerTees, setBestSellerTees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // category = "Best Seller" প্রোডাক্টগুলো ফিল্টার করা হচ্ছে
        const filteredProducts = data.filter(
          (product) => product.category === "Best Seller"
        );
        setBestSellerTees(filteredProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className=" text-brand-bg py-16 px-4 text-center">
        <p className="font-mono text-sm text-zinc-400">Loading Best Sellers...</p>
      </section>
    );
  }

  return (
    <section className=" text-brand-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-zinc-800">
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-brand-bg">
            Best Seller Tees
          </h2>
          <Link
            to="/shop"
            className="font-display text-xs sm:text-sm font-bold tracking-widest uppercase hover:text-brand-primary transition-colors flex items-center gap-1 border-b border-white hover:border-brand-primary pb-1"
          >
            SEE ALL TEES ↗
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestSellerTees.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4">

                {/* Main Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick Action Icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button aria-label="Quick View" className="bg-white text-black p-2 hover:bg-black hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button aria-label="Add to Wishlist" className="bg-white text-black p-2 hover:bg-black hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Add To Cart Hover Button */}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-black text-white py-3 font-display text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
                    ADD TO CART
                  </button>
                </div>

              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-sm font-semibold text-zinc-700 hover:text-white transition-colors truncate">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Price Display in A$ */}
                <div className="flex items-center gap-2 pt-1 font-mono text-sm">
                  {product.originalPrice && (
                    <span className="text-zinc-800 line-through">
                      A${product.originalPrice}
                    </span>
                  )}
                  <span className="font-bold text-zinc-600">
                    A${product.price}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestSellerProducts;