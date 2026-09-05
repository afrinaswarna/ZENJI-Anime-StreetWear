import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-brand-bg border-t border-brand-border text-zinc-400 font-body">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-display text-3xl font-black tracking-widest text-white group-hover:text-brand-primary transition-colors">
                ZENJI<span className="text-brand-primary">.</span>
              </span>
              <span className="text-[10px] font-mono border border-brand-border px-2 py-0.5 rounded text-brand-muted uppercase">
                ストリートウェア
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Anime-inspired streetwear crafted for cyber culture enthusiast. Limited drops, bold designs, and premium quality apparel.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                DROP 01 LIVE NOW
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-display text-xs font-bold text-white tracking-widest uppercase mb-4 border-l-2 border-brand-primary pl-2">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'Shop All', 'New Drops', 'Size Guide', 'Lookbook'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-brand-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-xs font-bold text-white tracking-widest uppercase mb-4 border-l-2 border-brand-primary pl-2">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Oversized Tees', 'Hoodies & Jackets', 'Cargo Pants', 'Headwear', 'Accessories'].map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-brand-primary transition-colors duration-200"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h3 className="font-display text-xs font-bold text-white tracking-widest uppercase border-l-2 border-brand-primary pl-2">
              Join The Culture
            </h3>
            <p className="text-xs text-zinc-400">
              Subscribe to get notified about secret drops and exclusive discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-brand-surface border border-brand-border rounded px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-display text-xs font-bold py-2.5 px-4 rounded transition-colors uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border/60 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 font-mono">
            &copy; {new Date().getFullYear()} ZENJI STREETWEAR. ALL RIGHTS RESERVED.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-xs font-display font-semibold tracking-wider">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
              INSTAGRAM
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
              FACEBOOK
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
              DISCORD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;