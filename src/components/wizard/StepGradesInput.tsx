'use client';

import React, { useState } from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { SUBJECTS_THCS, SUBJECTS_THPT } from '@/constants';
import { SubjectRow } from './SubjectRow';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const StepGradesInput: React.FC = () => {
  const { gradeLevel, grades, updateGrade, setStep, calculationTarget, inputMode, setInputMode } = useGradeStore();
  const [activeSemester, setActiveSemester] = useState<'hk1' | 'hk2'>('hk1');

  const subjects = parseInt(gradeLevel || '6') >= 10 ? SUBJECTS_THPT : SUBJECTS_THCS;

  const showHK1 = calculationTarget.includes('hk1') || calculationTarget.includes('year');
  const showHK2 = calculationTarget.includes('hk2') || calculationTarget.includes('year');

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-800 dark:text-white"
        >
          Nhập điểm của bạn
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Điền điểm số để chúng mình tính toán nhé.</p>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Mode & Semester Selection */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
            {showHK1 && (
              <button
                onClick={() => setActiveSemester('hk1')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeSemester === 'hk1' ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                )}
              >
                Học kỳ 1
              </button>
            )}
            {showHK2 && (
              <button
                onClick={() => setActiveSemester('hk2')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeSemester === 'hk2' ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500"
                )}
              >
                Học kỳ 2
              </button>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
            <button
              onClick={() => setInputMode('detailed')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                inputMode === 'detailed' ? "bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400" : "text-gray-500"
              )}
            >
              Chi tiết (TX, GK, CK)
            </button>
            <button
              onClick={() => setInputMode('simple')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                inputMode === 'simple' ? "bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400" : "text-gray-500"
              )}
            >
              Nhanh (Chỉ nhập ĐTB)
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
          <div className="flex flex-col bg-gray-100 dark:bg-gray-800 gap-px">
            {subjects.map((subject) => {
              const gradeEntry = grades.find((g) => g.subjectId === subject.id) || {
                subjectId: subject.id,
                hk1: { tx: [], gk: null, ck: null },
                hk2: { tx: [], gk: null, ck: null },
              };

              return (
                <div key={subject.id} className="bg-white dark:bg-gray-900">
                  <SubjectRow
                    subject={subject}
                    semester={activeSemester}
                    entry={gradeEntry[activeSemester]}
                    onUpdate={(entry) => updateGrade(subject.id, activeSemester, entry)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button variant="outline" onClick={() => setStep(1)}>
          Quay lại
        </Button>
        <Button
          size="xl"
          onClick={() => setStep(3)}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};
