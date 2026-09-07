import React, { useState, useEffect } from 'react';

const TeeComboBuilder = () => {
  const [teesCollection, setTeesCollection] = useState([]);
  const [primaryTee, setPrimaryTee] = useState(null);
  const [secondaryTee, setSecondaryTee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setTeesCollection(data);
        if (data.length > 1) {
          setPrimaryTee(data[0]);
          setSecondaryTee(data[1]);
        } else if (data.length === 1) {
          setPrimaryTee(data[0]);
          setSecondaryTee(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data.json:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !primaryTee || !secondaryTee) {
    return (
      <section className="bg-brand-bg text-white py-20 px-4 text-center">
        <p className="font-mono text-sm text-zinc-400">Loading Bundle Builder...</p>
      </section>
    );
  }

  // Calculate prices dynamically
  const rawTotal = primaryTee.price + secondaryTee.price;
  const bundleTotal = (rawTotal * 0.9).toFixed(2);

  return (
    <section className=" text-brand-bg py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-brand-primary tracking-widest uppercase bg-brand-primary/10 px-3 py-1 border border-brand-primary/30">
            // DUAL TEE BUNDLE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight mt-3 text-brand-bg">
            BUILD YOUR 2-TEE PACK
          </h2>
          <p className="text-zinc-400 text-sm mt-2 font-body">
            Select any 2 tees from our collection and get an automatic 10% bundle discount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Selection Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tee #1 Selection */}
            <div>
              <label className="block text-xs font-mono text-zinc-800 uppercase mb-2">
                1. SELECT FIRST TEE
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {teesCollection.map((tee) => (
                  <button
                    key={`tee1-${tee.id}`}
                    onClick={() => setPrimaryTee(tee)}
                    className={`p-3 text-left border transition-all flex flex-col justify-between ${
                      primaryTee.id === tee.id
                        ? 'border-brand-primary bg-zinc-900 text-white'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    <div>
                      <p className="font-display text-xs font-bold truncate text-white">{tee.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono truncate">{tee.colorway}</p>
                    </div>
                    <p className="font-mono text-xs text-brand-primary mt-2">A${tee.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tee #2 Selection */}
            <div>
              <label className="block text-xs font-mono text-zinc-800 uppercase mb-2">
                2. SELECT SECOND TEE
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {teesCollection.map((tee) => (
                  <button
                    key={`tee2-${tee.id}`}
                    onClick={() => setSecondaryTee(tee)}
                    className={`p-3 text-left border transition-all flex flex-col justify-between ${
                      secondaryTee.id === tee.id
                        ? 'border-brand-primary bg-zinc-900 text-white'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    <div>
                      <p className="font-display text-xs font-bold truncate text-white">{tee.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono truncate">{tee.colorway}</p>
                    </div>
                    <p className="font-mono text-xs text-brand-primary mt-2">A${tee.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Visual Preview */}
          <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center sticky top-6">
            <h3 className="font-display text-xs font-bold tracking-widest uppercase mb-4 text-zinc-400">
              YOUR SELECTED BUNDLE
            </h3>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-6">
              {/* Primary Tee Card */}
              <div className="aspect-[3/4] bg-black border border-zinc-800 overflow-hidden relative group">
                <img 
                  src={primaryTee.image} 
                  alt={primaryTee.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                  <span className="text-[10px] font-mono text-zinc-400">TEE 01</span>
                  <p className="text-xs font-bold truncate text-white">{primaryTee.name}</p>
                </div>
              </div>

              {/* Secondary Tee Card */}
              <div className="aspect-[3/4] bg-black border border-zinc-800 overflow-hidden relative group">
                <img 
                  src={secondaryTee.image} 
                  alt={secondaryTee.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                  <span className="text-[10px] font-mono text-zinc-400">TEE 02</span>
                  <p className="text-xs font-bold truncate text-white">{secondaryTee.name}</p>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-800">
              <div>
                <p className="text-xs text-zinc-500 font-mono">
                  TOTAL: <span className="line-through text-red-500">A${rawTotal.toFixed(2)}</span>
                </p>
                <p className="font-display text-2xl font-bold text-white">
                  A${bundleTotal} <span className="text-xs text-green-400 font-mono font-normal">(10% OFF)</span>
                </p>
              </div>
              <button className="bg-white text-black hover:bg-brand-primary hover:text-white px-6 py-3 font-display text-xs font-bold uppercase tracking-widest transition-colors">
                ADD BUNDLE TO CART
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeeComboBuilder;