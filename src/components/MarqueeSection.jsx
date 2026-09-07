import React from 'react';

const MarqueeSection = () => {
  const brandStatements = [
    "FREE EXPRESS SHIPPING ON ORDERS OVER $150",
    "ENGINEERED FOR URBAN EXPLORATION",
    "HEAVYWEIGHT PREMIUM FABRICS",
    "AUTOMATIC 10% OFF DUAL TEE BUNDLES",
    "LIMITED EDITION DROP",
    "MADE FOR EVERYDAY WEAR",
  ];

  return (
    <section className="w-full bg-black border-y border-zinc-800 py-6 overflow-hidden select-none">
      
      {/* Row 1: Forward Moving Marquee */}
      <div className="flex overflow-hidden whitespace-nowrap mb-3">
        <div className="animate-marquee flex items-center space-x-8">
          {[...brandStatements, ...brandStatements].map((text, idx) => (
            <div key={`row1-${idx}`} className="flex items-center space-x-8">
              <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-widest text-zinc-200">
                {text}
              </span>
              <span className="text-zinc-600 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Moving Marquee (Highlighted Style) */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee-reverse flex items-center space-x-8">
          {[...brandStatements, ...brandStatements].map((text, idx) => (
            <div key={`row2-${idx}`} className="flex items-center space-x-8">
              <span className="font-mono text-sm sm:text-base font-semibold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors duration-300">
                // {text}
              </span>
              <span className="text-zinc-700 text-xs">///</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default MarqueeSection;