'use client';

import React from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { GradeLevel } from '@/types';
import { GraduationCap, School } from 'lucide-react';

const thcs: GradeLevel[] = ['6', '7', '8', '9'];
const thpt: GradeLevel[] = ['10', '11', '12'];

export const StepGradeLevel: React.FC = () => {
  const { gradeLevel, setGradeLevel, setStep } = useGradeStore();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-800 dark:text-white"
        >
          Bạn học lớp mấy?
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Chọn khối lớp để chúng mình chuẩn bị danh sách môn học nhé.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-base font-bold flex items-center gap-2 text-blue-600">
            <School size={18} /> THCS (Cấp 2)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {thcs.map((level) => (
              <Card
                key={level}
                selected={gradeLevel === level}
                onClick={() => setGradeLevel(level)}
                className="py-4 flex flex-col items-center justify-center text-center"
              >
                <span className="text-xl font-black">Lớp {level}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold flex items-center gap-2 text-purple-600">
            <GraduationCap size={18} /> THPT (Cấp 3)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {thpt.map((level) => (
              <Card
                key={level}
                selected={gradeLevel === level}
                onClick={() => setGradeLevel(level)}
                className="py-4 flex flex-col items-center justify-center text-center"
              >
                <span className="text-xl font-black">Lớp {level}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="md" onClick={() => setStep(0)}>
          Quay lại
        </Button>
        <Button
          size="lg"
          disabled={!gradeLevel}
          onClick={() => setStep(2)}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};
