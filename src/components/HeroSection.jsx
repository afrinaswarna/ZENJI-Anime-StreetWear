import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
  // 1. Array of your provided background images
  const images = [
    "https://i.ibb.co.com/YBhCwvn2/Water-breathing-4.avif",
    "https://i.ibb.co.com/C5xfkwM2/Hero-Image2.png",
    "https://i.ibb.co.com/B5LCLnPg/Paradise-spirit-4.avif",
    "https://i.ibb.co.com/xSHM1FPd/Limitless-4.avif"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. Automatically change image every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4000ms = 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 3. Background Images Layer with Smooth Fade Transition */}
      {images.map((imgUrl, index) => (
        <div
          key={imgUrl}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          style={{ backgroundImage: `url('${imgUrl}')` }}
        />
      ))}

      {/* 4. Dark Overlay (For high text readability) */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* 5. Center Content Layer (Matching your Reference Image) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
        
        {/* Main Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[95px] font-extrabold uppercase leading-none tracking-tighter mb-6 drop-shadow-lg">
          CORE COLLECTION
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-200 mb-10 leading-relaxed font-body">
          Engineered for the modern urban environment. Our latest drop features heavy-weight fabrics and technical silhouettes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-none transition duration-300 hover:bg-black hover:text-white border border-white"
          >
            SHOP THE DROP
          </Link>
          <Link
            to="/lookbook"
            className="w-full sm:w-auto border border-white/80 bg-black/30 backdrop-blur-sm text-white px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-none transition duration-300 hover:bg-white hover:text-black"
          >
            VIEW LOOKBOOK
          </Link>
        </div>

        {/* 6. Slider Dots Indicator */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 transition-all duration-300 ${
                index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
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