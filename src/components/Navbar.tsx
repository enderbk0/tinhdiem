'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-20" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-none">
      <div className="flex justify-between items-center w-full">
        {/* Left Island */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-full pl-1 pr-5 h-12 flex items-center gap-2 shadow-lg pointer-events-auto">
          <button
            onClick={() => window.location.href = 'https://enderbk.is-cool.dev/labs'}
            className="p-2 h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image 
                src="/tinhdiem/enderbk'slabs.png" 
                alt="Logo" 
                width={28} 
                height={28}
                className="object-contain"
                priority
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "enderbk'slabs.png";
                }}
              />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-100">
              Tính điểm
            </span>
          </div>
        </div>

        {/* Right Island - THEME TOGGLE */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-full w-14 h-14 flex items-center justify-center shadow-lg pointer-events-auto">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-11 w-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all active:scale-90 border border-gray-200 dark:border-gray-600 shadow-inner"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun size={26} color="#facc15" strokeWidth={2.5} />
            ) : (
              <Moon size={22} color="#3b82f6" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
