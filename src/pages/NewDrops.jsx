import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const NewDrops = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [loading, setLoading] = useState(true);

  // Waitlist State
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  const categories = ["ALL", "OUTERWEAR", "TOPS", "BOTTOMS", "ACCESSORIES"];

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const drops = data.map((item, idx) => ({
          ...item,
          isNew: idx < 8,
          dropDate: "2026-09-01",
        }));
        setProducts(drops);
        setFilteredProducts(drops);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching drops:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeCategory !== "ALL") {
      result = result.filter(
        (p) => p.category?.toUpperCase() === activeCategory
      );
    }

    if (sortBy === "PRICE_LOW") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "PRICE_HIGH") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "NEWEST") {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy, products]);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setWaitlistSubmitted(true);
      setEmail("");
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className=" text-white min-h-screen border-t border-zinc-900">
      
      {/* ---------------- HERO HEADER ---------------- */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-emerald-500/30 text-brand-primary font-mono text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            FRESH DROP LIVE NOW
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-widest text-brand-bg">
            NEW DROPS<span className="text-brand-primary">.</span>
          </h1>

          <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-xl">
            Limited quantity releases engineered for everyday utility. Once they sell out, they are gone forever.
          </p>
        </div>
      </section>

     

      {/* ---------------- FILTER & SORT TOOLBAR ---------------- */}
      <section className="sticky top-20 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-display text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider rounded-md px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="NEWEST">Latest Arrivals</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="bg- aspect-[3/4] rounded-sm" />
                <div className="h-4 bg-zinc-900 rounded w-3/4" />
                <div className="h-4 bg-zinc-900 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="font-mono text-zinc-500 text-sm">
              No products found in this category.
            </p>
            <button
              onClick={() => setActiveCategory("ALL")}
              className="font-display text-xs font-bold uppercase tracking-wider text-emerald-400 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistItems.some(
                (item) => item.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-brand-bg border border-zinc-800/80 rounded-sm overflow-hidden hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="bg-emerald-500 text-black text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs tracking-wider">
                        NEW
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-white text-black p-3 rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-lg transform hover:scale-110"
                        title="Add to Cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleToggleWishlist(e, product)}
                        className={`p-3 rounded-full transition-all shadow-lg transform hover:scale-110 ${
                          isWishlisted
                            ? "bg-red-600 text-white"
                            : "bg-white text-black hover:bg-red-600 hover:text-white"
                        }`}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill={isWishlisted ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-lg transform hover:scale-110"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      {product.category || "Limited Release"}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-display text-sm font-semibold text-zinc-100 hover:text-brand-primary transition-colors truncate"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-sm font-bold text-white">
                        A${product.price ? product.price.toFixed(2) : "0.00"}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-500 font-medium">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
       {/* ---------------- GET EARLY ACCESS / WAITLIST SECTION ---------------- */}
      <section className="bg-zinc-800 border-y border-zinc-800 py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-red-500 font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block">
            GET EARLY ACCESS
          </span>

          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            JOIN THE WAITLIST.
          </h2>

          <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Be first to shop Awakening. Exclusive early access + pre-drop discount for waitlist members.
          </p>

          {/* Form */}
          {waitlistSubmitted ? (
            <div className="pt-4 text-emerald-400 font-mono text-sm font-bold tracking-wide">
              ✓ YOU ARE ON THE LIST. WE'LL NOTIFY YOU BEFORE THE NEXT DROP.
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="pt-4 flex flex-col sm:flex-row items-stretch justify-center max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 sm:border-r-0 text-white placeholder-zinc-500 font-mono text-xs tracking-widest px-5 py-4 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white font-display font-black text-xs tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                JOIN THE WAITLIST <span className="text-base">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewDrops;