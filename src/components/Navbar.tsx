'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme-dependent icons
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between" />
      </nav>
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between relative">
        {/* Back Button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = 'https://enderbk.is-cool.dev/labs'}
            className="p-2 h-9 w-9 rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        {/* Logo & Title centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {/* Logo Icon */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Image 
                src="/tinhdiem/enderbk'slabs.png" 
                alt="Logo Icon" 
                width={28} 
                height={28}
                className="object-contain"
                priority
              />
            </div>
            {/* Logo Text - elabstext.png */}
            <div className="relative h-6 w-24">
              <Image 
                src="/tinhdiem/elabstext.png" 
                alt="EnderBK's Labs" 
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
          </div>
          <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
          <h1 className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap hidden sm:block">
            Tính điểm
          </h1>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="rounded-full w-9 h-9 p-0"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
