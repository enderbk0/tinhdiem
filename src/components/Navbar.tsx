'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-20" />; // Initial spacer
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl pointer-events-none">
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-4 h-14 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.15)] pointer-events-auto transition-all duration-300">
        {/* Left Side: Back + Logo + Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = 'https://enderbk.is-cool.dev/labs'}
            className="p-2 h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-90"
          >
            <ArrowLeft size={22} className="text-gray-600 dark:text-gray-300" />
          </Button>
          
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1 shadow-sm">
              <Image 
                src="/tinhdiem/enderbk'slabs.png" 
                alt="Logo" 
                width={28} 
                height={28}
                className="object-contain"
                priority
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (!img.src.includes('tinhdiem/tinhdiem')) {
                     img.src = "enderbk'slabs.png"; 
                  }
                }}
              />
            </div>
            <h1 className="text-sm font-black uppercase tracking-wider text-gray-800 dark:text-gray-100">
              Tính điểm
            </h1>
          </div>
        </div>

        {/* Right Side: Theme Switcher */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-11 w-11 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200/50 dark:border-gray-600/50 shadow-sm"
          >
            {isDark ? (
              <Sun size={24} className="text-yellow-400 fill-yellow-400/20" />
            ) : (
              <Moon size={22} className="text-blue-600 fill-blue-600/10" />
            )}
          </Button>
        </div>
      </nav>
    </div>
  );
};
