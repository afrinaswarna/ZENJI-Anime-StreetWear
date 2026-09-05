import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = 3; // ডামি কার্ট কাউন্ট

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP ALL', path: '/shop' },
    { name: 'HOODIES', path: '/category/hoodies' },
    { name: 'TEES', path: '/category/tees' },
    { name: 'NEW DROPS', path: '/new-drops' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-white group-hover:text-brand-primary transition-colors">
                ZENJI<span className="text-brand-primary group-hover:text-white">.</span>
              </span>
              <span className="text-[10px] font-mono border border-brand-border px-1.5 py-0.5 rounded text-brand-muted uppercase hidden sm:inline-block">
                ゼンンジ
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-display text-xs font-semibold tracking-widest transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-brand-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-primary'
                      : 'text-zinc-300 hover:text-white hover:text-brand-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* 3. Action Icons (Search & Cart) */}
          <div className="flex items-center space-x-5">
            {/* Search Icon */}
            <button
              aria-label="Search"
              className="text-zinc-300 hover:text-brand-primary transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              aria-label="Cart"
              className="relative text-zinc-300 hover:text-brand-primary transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-primary text-white text-[10px] font-bold font-mono h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-300 hover:text-white focus:outline-none p-1"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-surface border-b border-brand-border px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block font-display text-sm font-semibold tracking-wider py-2 transition-colors ${
                  isActive ? 'text-brand-primary' : 'text-zinc-300 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;