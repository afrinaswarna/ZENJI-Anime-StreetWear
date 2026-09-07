import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // "New Arrival" ক্যাটাগরির প্রোডাক্ট ফিল্টার করা
        const arrivals = data.filter(
          (item) => item.category?.toLowerCase() === "new arrival"
        );

        // যদি ক্যাটাগরি ম্যাচ করা প্রডাক্ট থাকে তবে সর্বোচ্চ ৪টি দেখাবে, অন্যথায় ব্যাকআপ ৪টি
        setNewArrivals(arrivals.length > 0 ? arrivals.slice(0, 4) : data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching new arrivals:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className=" text-brand-bg py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Header, Description & Link */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block">
              <span className="text-xs font-mono text-brand-primary tracking-widest uppercase bg-brand-primary/10 px-3 py-1 border border-brand-primary/30 rounded-sm">
                // FRESH DROP
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-brand-bg">
              NEW <br />
              <span className="text-zinc-800">ARRIVALS</span>
            </h2>

            <p className="text-zinc-400 text-base font-body leading-relaxed max-w-md">
              Discover our latest drop of heavyweight oversized tees. Crafted with premium cotton and bold streetwear graphics designed to make a statement.
            </p>

            <div className="pt-4">
              <Link
                to="/shop-all"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-display text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand-primary/20 group rounded-sm"
              >
                <span>SEE ALL TEES</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
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

          {/* Right Column: Dynamic Display (Single Image vs Gallery Grid) */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="h-96 flex items-center justify-center font-mono text-xs text-zinc-500">
                Loading New Drops...
              </div>
            ) : newArrivals.length === 1 ? (
              
              /* === IF ONLY 1 PRODUCT: Full Large Showcase Image === */
              <div className="animate-slide-up group relative bg-brand-bg border border-zinc-800/80 p-3 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl">
                <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-zinc-900 rounded-md">
                  
                  {/* New Badge */}
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-mono font-bold px-3 py-1 uppercase tracking-wider rounded z-10 shadow-lg">
                    EXCLUSIVE NEW DROP
                  </span>

                  {/* Main Full Image */}
                  <img
                    src={newArrivals[0].image}
                    alt={newArrivals[0].name}
                    className="h-full w-full object-cover smooth-zoom group-hover:scale-105"
                  />

                  {/* Overlay Info & CTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                      {newArrivals[0].colorway || "Limited Release"}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                      {newArrivals[0].name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-lg font-bold text-white">
                        A${newArrivals[0].price?.toFixed(2)}
                      </span>
                      <Link
                        to={`/product/${newArrivals[0].id}`}
                        className="bg-white text-black px-6 py-2.5 rounded font-display text-xs font-bold uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-colors shadow-md"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            ) : (

              /* === IF MORE THAN 1 PRODUCT: Grid Gallery Showcase === */
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {newArrivals.map((product, index) => (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${index * 150}ms` }}
                    className="animate-slide-up group relative flex flex-col bg-zinc-900/40 border border-zinc-800/80 p-2.5 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 rounded-md">
                      
                      {/* Badge */}
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider rounded z-10 shadow-md">
                        NEW
                      </span>

                      {/* Image with Zoom */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover smooth-zoom group-hover:scale-110"
                      />

                      {/* Hover Action CTA */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <Link
                          to={`/product/${product.id}`}
                          className="w-full bg-white text-black py-2 rounded text-[11px] font-display font-bold uppercase tracking-wider text-center hover:bg-brand-primary hover:text-white transition-colors shadow-md"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-2.5 flex flex-col space-y-1 px-1">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase truncate">
                        {product.colorway || "Heavyweight Cotton"}
                      </p>
                      <h3 className="font-display text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
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

        </div>
      </div>
    </section>
  );
};

export default NewArrival;