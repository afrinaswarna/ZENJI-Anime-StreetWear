import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
  const brandPillars = [
    {
      code: "01",
      title: "SAMURAI DISCIPLINE",
      desc: "Rooted in honor, focus, and unwavering conviction. Every stitch and print embodies the warrior spirit.",
    },
    {
      code: "02",
      title: "ANIME ICONOGRAPHY",
      desc: "Inspired by legendary sagas—Jujutsu Kaisen, Demon Slayer, Naruto, One Piece, and Dragon Ball—blended with original samurai art.",
    },
    {
      code: "03",
      title: "HEAVYWEIGHT CRAFT",
      desc: "Crafted exclusively from premium 100% 240gsm cotton with oversized street silhouettes built to withstand time.",
    },
    {
      code: "04",
      title: "ZERO RESTOCKS",
      desc: "Every release is strictly limited edition. When a piece sells out, it enters the vault forever.",
    },
  ];

  const brandStats = [
    { label: "FOUNDED", value: "2024" },
    { label: "ORIGIN", value: "AUSTRALIA" },
    { label: "COTTON GRADE", value: "240 GSM" },
    { label: "RESTOCKS", value: "NEVER" },
  ];

  return (
    <div className=" text-white min-h-screen border-t border-zinc-900 overflow-hidden">
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-zinc-950 relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            ABOUT // ZENJI
          </div>

          <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
            ANIME STREETWEAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
              AUSTRALIA.
            </span>
          </h1>

          <p className="font-mono text-zinc-400 text-sm sm:text-base max-w-2xl uppercase tracking-widest leading-relaxed">
            BORN FROM THE WARRIOR SPIRIT. WE DESIGN FOR THE DREAMERS, FIGHTERS, CREATORS & OUTSIDERS SHAPING THEIR OWN FUTURE.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop-all"
              className="bg-white text-black font-display font-black text-xs uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-lg shadow-white/5"
            >
              EXPLORE THE COLLECTION →
            </Link>
          </div>

        </div>
      </section>

      {/* ---------------- STATS BANNER ---------------- */}
      <section className="bg-zinc-950 border-y border-zinc-900 bg-zinc-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {brandStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block font-display text-2xl sm:text-4xl font-black text-white tracking-wider">
                  {stat.value}
                </span>
                <span className="block font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- OUR MANIFESTO ---------------- */}
      <section className=" py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Manifesto Left Banner / Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800 group">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop"
                alt="Zenji Samurai Concept"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest">
                  [ THE ZENJI PHILOSOPHY ]
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white">
                  WEAR YOUR STORY. <br /> WEAR YOUR SPIRIT.
                </h3>
              </div>
            </div>
          </div>

          {/* Manifesto Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                // OUR STORY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-brand-bg">
                WHAT YOU WEAR SHOULD TELL A STORY.
              </h2>
            </div>

            <div className="space-y-4 font-body text-zinc-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-zinc-800">ZENJI</strong> began with one core belief: standard apparel fades, but a true warrior's story remains eternal. Inspired by samurai discipline, modern anime art, and high-street culture, we build streetwear for those who refuse to fade into the crowd.
              </p>
              <p>
                Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism, and oversized silhouettes. <strong className="text-zinc-800">ZENJI</strong> is more than a label on a heavy cotton tee—it represents the warrior within, the relentless drive to push forward, stay true to oneself, and honor your own arc.
              </p>
            </div>

            {/* Quick Fact Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-bg border border-zinc-800/80 rounded-sm">
                <span className="block font-mono text-xs text-red-500 font-bold uppercase mb-1">
                  PREMIUM FABRICATION
                </span>
                <p className="font-mono text-xs text-zinc-300">
                  100% Heavyweight 240GSM combed cotton engineered for ideal drop-shoulder fit.
                </p>
              </div>

              <div className="p-4 bg-brand-bg border border-zinc-800/80 rounded-sm">
                <span className="block font-mono text-xs text-red-500 font-bold uppercase mb-1">
                  NO RESTOCKS EVER
                </span>
                <p className="font-mono text-xs text-zinc-300">
                  Every piece is limited-edition. Once sold out, it is archived permanently.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- BRAND PILLARS ---------------- */}
      <section className=" border-y border-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">
                // CORE CODE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-brand-bg">
                THE PILLARS OF ZENJI
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-500 max-w-sm uppercase">
              FOUNDED IN 2024 IN AUSTRALIA. SHIPPING NATIONWIDE TO SYDNEY, MELBOURNE, BRISBANE, PERTH & ADELAIDE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandPillars.map((pillar) => (
              <div
                key={pillar.code}
                className="bg-zinc-950 border border-zinc-800 p-6 rounded-sm flex flex-col justify-between hover:border-red-600/50 transition-colors group"
              >
                <div className="space-y-4">
                  <span className="font-mono text-2xl font-black text-zinc-700 group-hover:text-red-500 transition-colors">
                    {pillar.code}
                  </span>
                  <h3 className="font-display text-lg font-black uppercase text-white tracking-wider">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- FAQ / BRAND SPECIFICATIONS ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block">
            // SPECIFICATIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-brand-bg">
            THE DROP PROTOCOL
          </h2>
        </div>

        <div className="space-y-4 font-mono text-xs">
          
          <div className="border border-zinc-800 p-5 rounded-sm bg-brand-bg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-zinc-400 uppercase font-bold">Standard Pricing:</span>
            <span className="text-white font-bold">A$39.99 (Special Drop Sales at A$33.99)</span>
          </div>

          <div className="border border-zinc-800 p-5 rounded-sm bg-brand-bg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-zinc-400 uppercase font-bold">Australian Shipping:</span>
            <span className="text-white font-bold">FREE Shipping on orders over A$100 (1-2 weeks delivery)</span>
          </div>

          <div className="border border-zinc-800 p-5 rounded-sm bg-brand-bg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-zinc-400 uppercase font-bold">Licensing & Art:</span>
            <span className="text-white font-bold">Commercial character licenses & original in-house samurai artwork</span>
          </div>

          <div className="border border-zinc-800 p-5 rounded-sm bg-brand-bg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-zinc-400 uppercase font-bold">Current Release:</span>
            <span className="text-white font-bold">ORIGIN DROP • IN STOCK & SHIPPING NOW</span>
          </div>

        </div>
      </section>

      {/* ---------------- CALL TO ACTION BANNER ---------------- */}
      <section className="border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-zinc-900 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            WEAR THE ARC<span className="text-red-600">.</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto uppercase tracking-widest">
            Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever.
          </p>

          <div className="pt-4">
            <Link
              to="/shop-all"
              className="inline-block bg-red-700 hover:bg-red-600 text-white font-display font-black text-xs uppercase tracking-widest px-10 py-4 rounded-sm transition-all shadow-xl shadow-red-900/20"
            >
              SHOP THE ORIGIN DROP →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;