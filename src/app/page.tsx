'use client';

import React, { useEffect, useState } from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { Navbar } from '@/components/Navbar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepTarget } from '@/components/wizard/StepTarget';
import { StepGradeLevel } from '@/components/wizard/StepGradeLevel';
import { StepGradesInput } from '@/components/wizard/StepGradesInput';
import { StepCriteria } from '@/components/wizard/StepCriteria';
import { StepResult } from '@/components/wizard/StepResult';
import { motion, AnimatePresence } from 'framer-motion';
import { STEPS } from '@/constants';

export default function Home() {
  const { step } = useGradeStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pt-20 pb-8 md:pt-24">
        {/* Progress Section */}
        <div className="mb-6 space-y-2">
          <ProgressBar progress={progress} />
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider">
              Bước {step + 1}: {STEPS[step].label}
            </span>
            <span className="text-[10px] font-bold text-gray-400">
              {step + 1} / {STEPS.length}
            </span>
          </div>
        </div>

        {/* Wizard Steps */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {step === 0 && <StepTarget />}
              {step === 1 && <StepGradeLevel />}
              {step === 2 && <StepGradesInput />}
              {step === 3 && <StepCriteria />}
              {step === 4 && <StepResult />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-100 dark:border-gray-800 text-center space-y-1">
        <p className="text-gray-400 text-sm font-bold">
          © {new Date().getFullYear()} EnderBK
        </p>
        <p className="text-[10px] text-gray-300 font-medium">
          Licensed under GNU v3.0
        </p>
      </footer>
    </main>
  );
}
