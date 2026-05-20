'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
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
        {/* Left Island: Back + Logo + Title */}
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-full pl-1.5 pr-5 h-12 flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-auto transition-all">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = 'https://enderbk.is-cool.dev/labs'}
            className="p-2 h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 flex items-center justify-center">
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
            <h1 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-100 whitespace-nowrap">
              Tính điểm
            </h1>
          </div>
        </nav>

        {/* Right Island: Theme Toggle */}
        <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-full w-14 h-14 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] pointer-events-auto transition-all active:scale-95">
          <Button
            variant="ghost"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-12 w-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center group bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
          >
            {isDark ? (
              <Sun className="w-7 h-7 text-yellow-400 fill-yellow-400/20 transition-transform group-hover:rotate-45 block" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600 fill-blue-600/10 transition-transform group-hover:-rotate-12 block" />
            )}
          </Button>
        </nav>
      </div>
    </div>
  );
};
