import React, { useState } from "react";
import { Link } from "react-router";

const PRODUCTS_LIST = [
  "BLUE FLAME TEE",
  "BUSHIDO TEE",
  "DEMON BLOOD TEE",
  "DOMAIN EXPANSION TEE",
  "FREE SOUL TEE",
  "LIMITLESS TEE",
  "PARADISE SPIRIT TEE",
  "WARRIOR SPIRIT TEE",
  "WATER BREATHING TEE",
  "WILL OF THE SUN TEE",
];

const AVAILABLE_TAGS = [
  "TRUE TO SIZE",
  "RUNS SMALL",
  "RUNS LARGE",
  "PREMIUM QUALITY",
  "FAST SHIPPING",
  "GREAT PACKAGING",
  "WORTH THE WAIT",
];

const Reviews = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productPurchased: "",
    orderNumber: "",
    rating: 0,
    title: "",
    reviewText: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Tag Selection Handler
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating) {
      alert("Please select a star rating for your review.");
      return;
    }

    const newReview = {
      ...formData,
      tags: selectedTags,
      date: "Just now",
      verified: true,
      id: Date.now(),
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmitted(true);

    // Reset Form
    setFormData({
      name: "",
      email: "",
      productPurchased: "",
      orderNumber: "",
      rating: 0,
      title: "",
      reviewText: "",
    });
    setSelectedTags([]);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  // Rating Stats Calculation
  const totalReviews = reviewsList.length;
  const avgRating = totalReviews
    ? (
        reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      ).toFixed(1)
    : "0.0";

  return (
    <div className="bg-brand-bg text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-zinc-900">
      <div className=" max-w-7xl mx-auto space-y-16">
        {/* ---------------- HEADER SECTION ---------------- */}
        <section className=" text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            COMMUNITY // VERDICTS
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            WHAT THE <span className="text-red-600">COMMUNITY</span> SAYS
          </h1>

          <p className="font-mono text-zinc-400 text-xs sm:text-sm uppercase tracking-widest leading-relaxed">
            HONEST REVIEWS FROM VERIFIED WARRIORS ACROSS AUSTRALIA.
          </p>
        </section>

        {/* ---------------- STATS DASHBOARD ---------------- */}
        <section className="bg-brand-bg border border-zinc-800 p-6 sm:p-8 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-8 space-y-2">
              <span className="font-display text-6xl font-black text-white tracking-tight">
                {avgRating}
              </span>
              <span className="font-mono text-zinc-500 text-sm block">
                OUT OF 5.0
              </span>
              <div className="flex justify-center md:justify-start gap-1 text-red-500 text-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.round(Number(avgRating)) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider pt-2">
                BASED ON {totalReviews}{" "}
                {totalReviews === 1 ? "REVIEW" : "REVIEWS"}
              </p>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-5 space-y-2 font-mono text-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewsList.filter(
                  (r) => r.rating === stars,
                ).length;
                const percentage = totalReviews
                  ? Math.round((count / totalReviews) * 100)
                  : 0;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-zinc-400 w-6">{stars}★</span>
                    <div className="flex-1 bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="bg-red-600 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-zinc-500 w-10 text-right">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key Metrics */}
            <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8 space-y-4 text-center md:text-left">
              <div>
                <span className="font-display text-2xl font-bold text-white block">
                  {totalReviews ? "100%" : "0%"}
                </span>
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  FIVE STAR RATING
                </span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white block">
                  {totalReviews ? "100%" : "0%"}
                </span>
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  RECOMMEND TO OTHERS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MAIN CONTENT: REVIEWS LIST & FORM ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Reviews List (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {totalReviews} PUBLISHED REVIEWS
              </span>
              <span className="font-mono text-xs text-zinc-500 uppercase">
                NEWEST FIRST ↓
              </span>
            </div>

            {reviewsList.length === 0 ? (
              /* Empty State */
              <div className="border border-dashed border-zinc-800 p-12 text-center rounded-sm space-y-4 bg-zinc-900/20">
                <div className="font-mono text-zinc-500 text-xs uppercase tracking-widest">
                  NO REVIEWS PUBLISHED YET. BE THE FIRST TO LEAVE A VERDICT.
                </div>
                <p className="font-mono text-zinc-600 text-xs max-w-sm mx-auto">
                  Purchased a tee from the Origin Drop? Share your fit,
                  fabrication feedback, and story below.
                </p>
              </div>
            ) : (
              /* Published Reviews Cards */
              <div className="space-y-4">
                {reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-white uppercase text-sm">
                            {review.name}
                          </span>
                          {review.verified && (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                              VERIFIED BUYER
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 uppercase block mt-0.5">
                          PURCHASED:{" "}
                          {review.productPurchased || "ZENJI DROP TEE"}
                        </span>
                      </div>

                      <div className="text-red-500 text-sm">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-sm font-black uppercase text-white">
                        {review.title}
                      </h4>
                      <p className="font-body text-xs text-zinc-300 leading-relaxed">
                        {review.reviewText}
                      </p>
                    </div>

                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {review.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-zinc-950 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-1 uppercase"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Submission Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-sm sticky top-6 space-y-6">
              <div>
                <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block mb-1">
                  // VERIFIED PURCHASES ONLY
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white">
                  LEAVE YOUR VERDICT
                </h3>
              </div>

              {submitted && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-sm text-emerald-400 font-mono text-xs uppercase tracking-wider">
                  ✓ VERDICT SUBMITTED SUCCESSFULLY. THANK YOU FOR SUPPORTING
                  ZENJI.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. HARUTO K."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="YOU@DOMAIN.COM"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Product Select */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    PRODUCT PURCHASED *
                  </label>
                  <select
                    required
                    value={formData.productPurchased}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productPurchased: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="">SELECT A PIECE</option>
                    {PRODUCTS_LIST.map((prod) => (
                      <option key={prod} value={prod}>
                        {prod}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order Number */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    ORDER NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="E.G. #ZJ-8492"
                    value={formData.orderNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, orderNumber: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Interactive Star Rating */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    STAR RATING *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="text-2xl text-red-500 focus:outline-none transition-transform hover:scale-110"
                      >
                        {star <= (hoveredStar || formData.rating) ? "★" : "☆"}
                      </button>
                    ))}
                    <span className="font-mono text-xs text-zinc-500 uppercase ml-2">
                      {formData.rating
                        ? `${formData.rating}/5`
                        : "SELECT A RATING"}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    REVIEW TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. INSANE COTTON QUALITY & FIT"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Review Body */}
                <div className="space-y-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    YOUR REVIEW *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="TELL THE COMMUNITY ABOUT FABRIC, FIT, PRINT QUALITY..."
                    value={formData.reviewText}
                    onChange={(e) =>
                      setFormData({ ...formData, reviewText: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-4 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors resize-none"
                  />
                </div>

                {/* Tags Picker */}
                <div className="space-y-2 pt-1">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    TAGS (OPTIONAL)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`text-[10px] font-mono px-2.5 py-1 uppercase border transition-all ${
                            isSelected
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-display font-black text-xs uppercase tracking-widest py-3.5 rounded-sm transition-all shadow-lg shadow-red-950/40 active:scale-95 mt-4"
                >
                  SUBMIT REVIEW →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
