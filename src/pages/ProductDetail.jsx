import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Access addToCart from context

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // User Selections State
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("details");

  // Feedback UI State for Add to Cart Button
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // 1. Scroll to top on product change
    window.scrollTo(0, 0);

    // 2. Reset local selections
    setQuantity(1);
    setSelectedSize("M");
    setIsAdded(false);
    setLoading(true);

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => String(p.id) === String(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image);

          // Find Related Products (same category, excluding current product)
          const related = data
            .filter(
              (p) =>
                p.category === foundProduct.category &&
                String(p.id) !== String(id)
            )
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle Add to Cart action
  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity, selectedSize);

    // Show temporary confirmation
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono text-sm">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
        <p className="animate-pulse text-zinc-400">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono text-center p-6">
        <h2 className="text-2xl font-bold font-display uppercase mb-4">
          Product Not Found
        </h2>
        <p className="text-zinc-500 mb-6 text-sm">
          The product you are looking for might have been removed or is unavailable.
        </p>
        <Link
          to="/shop-all"
          className="bg-white text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Fallback Gallery Images
  const galleryImages = product.gallery || [
    product.image,
    product.image,
    product.image,
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen  text-brand-bg py-10 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-zinc-500 mb-8 uppercase">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop-all" className="hover:text-white transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-zinc-800 truncate">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Image Gallery Section (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Main Showcase Image */}
            <div className="relative aspect-[3/4] w-full bg-zinc-900 border border-zinc-800/80 rounded-lg overflow-hidden group">
              {product.category && (
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest rounded z-10 shadow-lg">
                  {product.category}
                </span>
              )}
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover smooth-zoom group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[3/4] w-20 sm:w-24 shrink-0 overflow-hidden rounded border bg-zinc-900 transition-all ${
                    selectedImage === img
                      ? "border-white opacity-100 ring-2 ring-white shadow-lg"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Product Details & Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Title & Tagline */}
              <div>
                <span className="text-xs font-mono text-zinc-800 uppercase tracking-widest">
                  {product.colorway || "Heavyweight Oversized Fit"}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-bg mt-1">
                  {product.name}
                </h1>
                
                {/* Price Display */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-mono text-2xl font-bold text-zinc-800">
                    A${product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-zinc-800 line-through">
                      A${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      Save A${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-zinc-800" />

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-mono text-brand-bg uppercase tracking-wider">
                    Select Size
                  </label>
                  <button className="text-[11px] font-mono text-zinc-800 underline hover:text-white transition-colors uppercase">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono font-bold uppercase border rounded-md transition-all active:scale-95 ${
                        selectedSize === size
                          ? "bg-brand-bg text-white border-white shadow-md shadow-white/10"
                          : "bg-white text-brand-bg border-zinc-800 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono text-zinc-800 uppercase tracking-wider">
                  Quantity
                </label>
                <div className="flex gap-4">
                  {/* Plus/Minus Counter */}
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-zinc-400 hover:text-white font-mono transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-sm font-bold w-10 text-center text-zinc-400">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-zinc-400 hover:text-white font-mono transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 font-display text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg rounded-md flex items-center justify-center gap-2 ${
                      isAdded
                        ? "bg-emerald-500 text-black"
                        : "bg-brand-bg text-white hover:bg-zinc-800"
                    }`}
                  >
                    {isAdded ? (
                      <span>ADDED TO CART ✓</span>
                    ) : (
                      <>
                        <span>ADD TO CART</span>
                        <span>•</span>
                        <span>
                          A${((product.price || 0) * quantity).toFixed(2)}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Accordion Information Dropdowns */}
              <div className="pt-6 border-t border-zinc-800 space-y-3">
                
                {/* Details Tab */}
                <div className="border border-zinc-800/80 rounded-md bg-brand-bg overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveAccordion(
                        activeAccordion === "details" ? "" : "details"
                      )
                    }
                    className="w-full px-4 py-3.5 text-xs font-mono uppercase text-left flex justify-between items-center text-zinc-300 hover:text-white"
                  >
                    <span>Product Description</span>
                    <span>{activeAccordion === "details" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "details" && (
                    <div className="px-4 pb-4 text-xs font-body text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3">
                      {product.description ||
                        "Designed for ultimate comfort and high streetwear appeal. Made from 100% heavy combed cotton with screenprinted original graphics."}
                    </div>
                  )}
                </div>

                {/* Fabric & Fit Tab */}
                <div className="border border-zinc-800/80 rounded-md bg-brand-bg overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveAccordion(
                        activeAccordion === "fabric" ? "" : "fabric"
                      )
                    }
                    className="w-full px-4 py-3.5 text-xs font-mono uppercase text-left flex justify-between items-center text-zinc-300 hover:text-white"
                  >
                    <span>Fabric & Care</span>
                    <span>{activeAccordion === "fabric" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "fabric" && (
                    <div className="px-4 pb-4 text-xs font-body text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3 space-y-1">
                      <p>• 280 GSM Heavyweight Cotton</p>
                      <p>• Pre-shrunk fabric to preserve fit</p>
                      <p>• Machine wash cold inside out, tumble dry low</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns Tab */}
                <div className="border border-zinc-800/80 rounded-md bg-brand-bg overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveAccordion(
                        activeAccordion === "shipping" ? "" : "shipping"
                      )
                    }
                    className="w-full px-4 py-3.5 text-xs font-mono uppercase text-left flex justify-between items-center text-zinc-300 hover:text-white"
                  >
                    <span>Shipping & Returns</span>
                    <span>{activeAccordion === "shipping" ? "−" : "+"}</span>
                  </button>
                  {activeAccordion === "shipping" && (
                    <div className="px-4 pb-4 text-xs font-body text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3 space-y-1">
                      <p>• Dispatch within 24-48 hours</p>
                      <p>• Express shipping available at checkout</p>
                      <p>• 14-day hassle-free return policy</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-zinc-800">
            <h2 className="font-display text-2xl font-black uppercase text-brand-bg mb-8">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.id}`}
                  className="group bg-brand-bg border border-zinc-800/80 p-2.5 rounded-lg hover:border-zinc-700 transition-all"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900 rounded-md mb-3">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="h-full w-full object-cover smooth-zoom group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xs font-bold text-zinc-300 group-hover:text-white truncate">
                    {relProduct.name}
                  </h3>
                  <p className="font-mono text-xs font-bold text-white mt-1">
                    A${relProduct.price?.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;