import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const BestSellerProducts = () => {
  const [bestSellerTees, setBestSellerTees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.category?.toLowerCase() === "best seller"
        );

        setBestSellerTees(
          filteredProducts.length > 0 ? filteredProducts : data
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching best seller products:", err);
        setLoading(false);
      });
  }, []);

  const hasMoreThanThree = bestSellerTees.length > 3;

  // Infinite loop animation logic when items > 3
  const carouselItems = hasMoreThanThree
    ? [...bestSellerTees, ...bestSellerTees]
    : bestSellerTees;

  return (
    <section className="text-brand-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-brand-border overflow-hidden">
      {/* CSS Keyframe Animation for Right-to-Left Infinite Scroll */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Centered Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-block">
            <span className="text-xs font-mono text-brand-primary tracking-widest uppercase bg-brand-primary/10 px-3 py-1 border border-brand-primary/30 rounded-sm">
              // TOP RATED ESSENTIALS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-brand-bg">
            BEST SELLER <span className="text-zinc-800">TEES</span>
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-body leading-relaxed">
            Explore our most demanded graphic tees engineered with heavyweight combed cotton for standard streetwear aesthetic and long-lasting durability.
          </p>

          <div className="pt-1">
            <Link
              to="/shop-all"
              className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-2.5 font-display text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-brand-primary/20 group rounded-sm"
            >
              <span>SEE ALL TEES</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Content Display */}
        {loading ? (
          <div className="h-48 flex items-center justify-center font-mono text-xs text-zinc-500">
            Loading Best Sellers...
          </div>
        ) : hasMoreThanThree ? (
          /* Animated Carousel View (More than 3 Products) */
          <div className="relative w-full overflow-hidden">
            {/* Left & Right Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee gap-5 lg:gap-6 py-2">
              {carouselItems.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-64 sm:w-72 flex-shrink-0 group relative flex flex-col bg-brand-bg border border-zinc-800/80 p-2.5 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image Container with Proper Aspect Ratio */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-bg rounded-md">
                    {/* Best Seller Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-black text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider rounded z-10 shadow-md">
                      BEST SELLER
                    </span>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-top smooth-zoom group-hover:scale-105"
                    />

                    {/* Hover Overlay with CTA Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full bg-white text-black py-2 rounded font-display text-[11px] font-bold uppercase tracking-wider text-center hover:bg-brand-primary hover:text-white transition-colors shadow-md"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-2.5 flex flex-col space-y-1 px-0.5">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase truncate">
                      {product.colorway || "Heavyweight Cotton"}
                    </p>
                    <h3 className="font-display text-xs font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="font-mono text-xs font-bold text-white">
                      A${product.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Standard Centered Grid (3 or Fewer Products) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {bestSellerTees.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 150}ms` }}
                className="animate-slide-up group relative flex flex-col bg-brand-bg border border-zinc-800/80 p-2.5 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 rounded-md">
                  <span className="absolute top-2.5 left-2.5 bg-amber-500 text-black text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider rounded z-10 shadow-md">
                    BEST SELLER
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-top smooth-zoom group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-white text-black py-2 rounded font-display text-[11px] font-bold uppercase tracking-wider text-center hover:bg-brand-primary hover:text-white transition-colors shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-col space-y-1 px-0.5">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase truncate">
                    {product.colorway || "Heavyweight Cotton"}
                  </p>
                  <h3 className="font-display text-xs font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="font-mono text-xs font-bold text-white">
                    A${product.price?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellerProducts;