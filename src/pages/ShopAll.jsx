import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

const ShopAll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(100);

  // Fetch Products
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Extract Unique Categories Dynamically
  const categories = useMemo(() => {
    const cats = products.map((item) => item.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  // Dynamic Badge Colors
  const getBadgeStyle = (category) => {
    switch (category?.toLowerCase()) {
      case "sale":
        return "bg-red-600 text-white border-red-500 shadow-red-900/40";
      case "new arrival":
        return "bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/40";
      case "limited stock":
        return "bg-amber-600 text-white border-amber-500 shadow-amber-900/40";
      case "best seller":
        return "bg-purple-600 text-white border-purple-500 shadow-purple-900/40";
      default:
        return "bg-zinc-800 text-zinc-200 border-zinc-700 shadow-black/40";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  text-brand-bg py-20 flex flex-col items-center justify-center font-mono text-sm">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="animate-pulse text-zinc-400">Loading All Products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header with Subtle Fade-In */}
        <div className="border-b border-zinc-800 pb-8 mb-10 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-brand-bg">
            SHOP ALL TEES
          </h1>
          <p className="text-zinc-700 text-sm mt-2 font-body">
            Explore our complete collection of heavyweight anime and streetwear tees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Interactive Filters */}
          <div className="lg:col-span-1 space-y-8 bg-brand-bg backdrop-blur-sm p-6 border border-zinc-800/80 rounded-lg h-fit shadow-xl">
            
            {/* Search Input */}
            <div>
              <label className="block text-xs font-mono text-zinc-200 uppercase mb-2">
                Search Products
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search tee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-all duration-300 group-hover:border-zinc-700 rounded-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div>
              <label className="block text-xs font-mono text-zinc-200 uppercase mb-3">
                Categories
              </label>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 text-xs font-mono uppercase text-left rounded-md transition-all duration-300 border active:scale-95 ${
                        isActive
                          ? "bg-white text-black border-white font-bold shadow-md shadow-white/10 translate-x-1"
                          : "bg-black/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-600 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-zinc-200 uppercase">
                  Max Price
                </label>
                <span className="font-mono text-xs text-brand-primary font-bold">
                  A${priceRange}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-primary cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortBy("default");
                setPriceRange(100);
              }}
              className="w-full py-2.5 bg-zinc-800/70 text-zinc-300 font-mono text-xs uppercase rounded-md hover:bg-zinc-700 hover:text-white active:scale-95 transition-all duration-200 border border-zinc-700/50"
            >
              Reset Filters
            </button>

          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-3">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 uppercase">
                Showing <strong className="text-zinc-400">{filteredProducts.length}</strong> of {products.length} Products
              </span>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">
                  Sort By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black border border-zinc-800 text-xs font-mono px-3 py-2 text-white focus:outline-none focus:border-brand-primary rounded-md transition-colors cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A - Z</option>
                </select>
              </div>
            </div>

            {/* Product Grid with Animations */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${(index % 6) * 60}ms` }}
                    className="animate-fade-in group relative flex flex-col bg-brand-bg border border-zinc-800/80 p-3 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1"
                  >
                    {/* Image Container with Zoom and Action Overlay */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-bg mb-3 rounded-md">
                      
                      {/* Dynamic Badge */}
                      {product.category && (
                        <span
                          className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border z-10 rounded shadow-md backdrop-blur-md ${getBadgeStyle(
                            product.category
                          )}`}
                        >
                          {product.category}
                        </span>
                      )}

                      {/* Smooth Zoom Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover smooth-image-zoom group-hover:scale-110"
                      />

                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Add To Cart Hover Button (Slide up animation) */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        <button className="w-full bg-white text-black py-2.5 rounded font-display text-xs font-extrabold uppercase tracking-widest hover:bg-brand-primary hover:text-white active:scale-95 transition-all shadow-lg">
                          ADD TO CART
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                        {product.colorway || "Clothing"}
                      </span>
                      
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-display text-sm font-semibold text-zinc-200 hover:text-brand-primary transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Price Display */}
                      <div className="flex items-center gap-2 pt-1 font-mono text-sm">
                        <span className="font-bold text-white">
                          A${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-zinc-400 line-through text-xs">
                            A${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State Animation */
              <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800 rounded-lg animate-fade-in">
                <p className="font-mono text-zinc-400 text-sm">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setPriceRange(100);
                  }}
                  className="mt-4 text-xs font-mono text-brand-primary hover:underline uppercase"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ShopAll;