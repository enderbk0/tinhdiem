import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

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
          <div className="flex items-center gap-1.5">
            <div className="relative w-6 h-6">
              <Image 
                src="/tinhdiem/logo.png" 
                alt="Logo" 
                width={24} 
                height={24}
                className="dark:invert"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-400 leading-none">EnderBK&apos;s</span>
              <span className="text-sm font-black text-gray-900 dark:text-white leading-none">Labs</span>
            </div>
          </div>
          <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
          <h1 className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Tính điểm và xếp hạng
          </h1>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full w-9 h-9 p-0"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
