import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
  // 1. Background images array
  const images = [
    "https://i.ibb.co.com/YBhCwvn2/Water-breathing-4.avif",
    "https://i.ibb.co.com/C5xfkwM2/Hero-Image2.png",
    "https://i.ibb.co.com/B5LCLnPg/Paradise-spirit-4.avif",
    "https://i.ibb.co.com/xSHM1FPd/Limitless-4.avif"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. Auto-slide timer (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  // 3. Navigation handlers for Previous & Next buttons
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] bg-slate-950 flex items-center justify-center overflow-hidden group">
      
      {/* Background Images Layer (Adjusted positioning to show model heads) */}
      {images.map((imgUrl, index) => (
        <div
          key={imgUrl}
          className={`absolute inset-0 w-full h-full bg-cover bg-[center_top_20%] sm:bg-[center_top_15%] transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-0 scale-105 transition-transform duration-[4000ms]' : 'opacity-0 -z-10'
          }`}
          style={{ backgroundImage: `url('${imgUrl}')` }}
        />
      ))}

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/30 z-10" />

      {/* Functional Navigation Buttons (Left & Right) */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-slate-900/40 hover:bg-slate-900/80 text-white border border-slate-700/50 backdrop-blur-md transition-all duration-300 opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-slate-900/40 hover:bg-slate-900/80 text-white border border-slate-700/50 backdrop-blur-md transition-all duration-300 opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Center Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
        
        {/* Main Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[95px] font-black uppercase leading-none tracking-tighter mb-6 drop-shadow-2xl">
          CORE COLLECTION
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 mb-10 leading-relaxed font-body">
          Engineered for the modern urban environment. Our latest drop features heavy-weight fabrics and technical silhouettes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop-all"
            className="w-full sm:w-auto bg-white text-slate-950 px-10 py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:bg-slate-900 hover:text-white border border-white shadow-lg active:scale-95"
          >
            SHOP THE DROP
          </Link>
          <Link
            to="/new-drops"
            className="w-full sm:w-auto border border-white/80 bg-slate-950/40 backdrop-blur-sm text-white px-10 py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-slate-950 active:scale-95"
          >
            New Drops
          </Link>
        </div>

        {/* Slider Dots Indicator */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 transition-all duration-300 ${
                index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;