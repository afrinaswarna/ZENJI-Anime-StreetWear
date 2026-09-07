import React from 'react';
import { Link } from 'react-router';

const BigSale = () => {
  const saleImages = [
    {
      id: 1,
      url: "https://i.ibb.co.com/LXjxR7sq/Will-of-the-sun-5.avif",
      direction: "-translate-x-12 -translate-y-12", // Top-Left
      alt: "Sale Tee 1"
    },
    {
      id: 2,
      url: "https://i.ibb.co.com/6cpbmzQX/Blue-flame-4.avif",
      direction: "translate-x-12 -translate-y-12",  // Top-Right
      alt: "Sale Tee 2"
    },
    {
      id: 3,
      url: "https://i.ibb.co.com/JW0QfHsj/Demon-blood-4.avif",
      direction: "-translate-x-12 translate-y-12",  // Bottom-Left
      alt: "Sale Tee 3"
    },
    {
      id: 4,
      url: "https://i.ibb.co.com/9kX9d7fy/Warrior-spirit-5.avif",
      direction: "translate-x-12 translate-y-12",   // Bottom-Right
      alt: "Sale Tee 4"
    }
  ];

  return (
    <section className=" text-brand-bg py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border overflow-hidden">
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
              to="/category/sale"
              className="inline-block bg-white text-black hover:bg-brand-primary hover:text-white font-display text-xs font-bold uppercase tracking-widest px-10 py-4 transition-all duration-300 border border-white hover:border-brand-primary"
            >
              SHOP THE SALE ↗
            </Link>
          </div>
        </div>

        {/* Right Side: 4 Images Coming From 4 Directions Animation */}
        <div className="lg:col-span-7 group">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:max-w-none">
            {saleImages.map((img) => (
              <div
                key={img.id}
                className={`relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-700 ease-out transform ${img.direction} group-hover:translate-x-0 group-hover:translate-y-0 opacity-85 group-hover:opacity-100 group-hover:border-zinc-500`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-red-500 font-bold border border-red-500/30">
                  -15%
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BigSale;