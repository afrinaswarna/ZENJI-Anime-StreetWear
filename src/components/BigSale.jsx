import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const BigSale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4টি ইমেজের জন্য ৪টি দিক নির্দেশকারী CSS ট্রান্সফর্ম ক্লাস (Mobile friendly smaller translation)
  const directions = [
    "-translate-x-4 -translate-y-4 sm:-translate-x-12 sm:-translate-y-12", // Top-Left
    "translate-x-4 -translate-y-4 sm:translate-x-12 sm:-translate-y-12",   // Top-Right
    "-translate-x-4 translate-y-4 sm:-translate-x-12 sm:translate-y-12",   // Bottom-Left
    "translate-x-4 translate-y-4 sm:translate-x-12 sm:translate-y-12",     // Bottom-Right
  ];

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // "Sale" ক্যাটাগরি অথবা originalPrice / discount থাকা প্রোডাক্ট ফিল্টার
        const filteredSale = data.filter(
          (item) =>
            item.category?.toLowerCase() === "sale" ||
            item.originalPrice ||
            item.discount
        );

        // ফিল্টার করা ডাটা থেকে সর্বোচ্চ ৪টি প্রোডাক্ট নেওয়া
        const finalProducts =
          filteredSale.length > 0
            ? filteredSale.slice(0, 4)
            : data.slice(0, 4);

        // প্রতিটি প্রোডাক্টের সাথে ৪টি ডিরেকশন ম্যাপ করা
        const mappedProducts = finalProducts.map((product, index) => ({
          ...product,
          direction: directions[index % 4],
        }));

        setSaleProducts(mappedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sale products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="text-brand-bg py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <span className="text-xs font-mono text-brand-primary tracking-widest uppercase bg-brand-primary/10 px-3 py-1 border border-brand-primary/30 rounded-none">
            // LIMITED TIME OFFER
          </span>

          <h2 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight leading-none">
            BIG SALE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-brand-primary to-cyan-400">
              UP TO 15% OFF
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-body max-w-md mx-auto lg:mx-0">
            Upgrade your streetwear wardrobe with our premium anime-inspired graphic tees. Grab your favorites before the drop sells out.
          </p>

          <div className="pt-2">
            <Link
              to="/shop-all"
              className="inline-block bg-white text-black hover:bg-brand-primary hover:text-white font-display text-xs font-bold uppercase tracking-widest px-10 py-4 transition-all duration-300 border border-white hover:border-brand-primary shadow-lg"
            >
              SHOP THE SALE ↗
            </Link>
          </div>
        </div>

        {/* Right Side: 4 Products Dynamic Display with Animation */}
        <div className="lg:col-span-7 group">
          {loading ? (
            <div className="h-80 flex items-center justify-center font-mono text-xs text-zinc-500">
              Loading Sale Drops...
            </div>
          ) : (
            /* Responsive Gap: gap-2 for small devices, gap-4 on sm, gap-6 on lg */
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6 max-w-lg mx-auto lg:max-w-none">
              {saleProducts.map((product) => (
                <div
                  key={product.id}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-700 ease-out transform ${product.direction} group-hover:translate-x-0 group-hover:translate-y-0 opacity-85 group-hover:opacity-100 group-hover:border-zinc-500 hover:shadow-2xl`}
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Discount Badge & Name Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 z-10">
                    <span className="bg-black/80 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-red-500 font-bold border border-red-500/30 rounded">
                      {product.discount ? `-${product.discount}%` : "-15%"}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-display font-semibold text-zinc-200 rounded truncate max-w-[80px] sm:max-w-[120px]">
                      {product.name}
                    </span>
                  </div>

                  {/* Hover Overlay with View Details Link */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-3 z-20">
                    <p className="font-display text-xs font-bold text-white mb-1 truncate">
                      {product.name}
                    </p>
                    
                    {/* Price Display */}
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                      {product.originalPrice && (
                        <span className="text-zinc-500 line-through text-[10px] sm:text-xs">
                          A${product.originalPrice}
                        </span>
                      )}
                      <span className="font-bold text-white text-[11px] sm:text-xs">
                        A${product.price?.toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-white text-black py-1.5 sm:py-2 rounded font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-center hover:bg-brand-primary hover:text-white transition-colors shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BigSale;