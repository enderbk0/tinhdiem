'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, GraduationCap } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-xl text-white">
            <GraduationCap size={24} />
          </div>
          <span className="font-black text-xl tracking-tight hidden sm:block">
            VN <span className="text-blue-500">Grade</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full w-10 h-10 p-0"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Hướng dẫn
          </Button>
        </div>
      </div>
    </nav>
  );
};
