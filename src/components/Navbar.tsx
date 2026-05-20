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
    return <div className="h-20" />; // Spacer for fixed island
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl pointer-events-none">
      <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-full px-2 h-12 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-auto transition-colors duration-300">
        {/* Left: Back & Logo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = 'https://enderbk.is-cool.dev/labs'}
            className="p-2 h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-90"
          >
            <ArrowLeft size={18} className="text-gray-500 dark:text-gray-400" />
          </Button>
          
          <div className="flex items-center gap-2 pl-1">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image 
                src="/tinhdiem/enderbk'slabs.png" 
                alt="Logo" 
                width={28} 
                height={28}
                className="object-contain"
                priority
                onError={(e) => {
                  // Fallback to relative path if absolute fails
                  const img = e.target as HTMLImageElement;
                  if (!img.src.includes('tinhdiem/tinhdiem')) {
                     img.src = "enderbk'slabs.png"; 
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Tính điểm
          </h1>
        </div>

        {/* Right: Theme Switcher */}
        <div className="flex items-center pr-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:rotate-45"
          >
            {isDark ? (
              <Sun size={18} className="text-yellow-400 fill-yellow-400/20" />
            ) : (
              <Moon size={18} className="text-blue-500 fill-blue-500/10" />
            )}
          </Button>
        </div>
      </nav>
    </div>
  );
};
