'use client';

import React from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CalculationTarget } from '@/types';
import { Calendar, CheckCircle2 } from 'lucide-react';

const targets: { id: CalculationTarget; label: string; icon: any; description: string }[] = [
  { id: 'hk1', label: 'Học kỳ 1', icon: Calendar, description: 'Tính điểm trung bình và xếp loại cho riêng Học kỳ 1.' },
  { id: 'hk2', label: 'Học kỳ 2', icon: Calendar, description: 'Tính điểm trung bình và xếp loại cho riêng Học kỳ 2.' },
  { id: 'year', label: 'Cả năm', icon: CheckCircle2, description: 'Tính điểm trung bình cả năm dựa trên kết quả HK1 và HK2.' },
];

export const StepTarget: React.FC = () => {
  const { calculationTarget, setCalculationTarget, setStep } = useGradeStore();

  const toggleTarget = (id: CalculationTarget) => {
    if (calculationTarget.includes(id)) {
      setCalculationTarget(calculationTarget.filter((t) => t !== id));
    } else {
      setCalculationTarget([...calculationTarget, id]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-800 dark:text-white"
        >
          Bạn muốn tính điểm gì?
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Chọn một hoặc nhiều mục tiêu tính toán.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {targets.map((t, index) => {
          const Icon = t.icon;
          const isSelected = calculationTarget.includes(t.id);
          
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                selected={isSelected}
                onClick={() => toggleTarget(t.id)}
                className="h-full flex flex-col items-center text-center space-y-2 p-4"
              >
                <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold">{t.label}</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{t.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          disabled={calculationTarget.length === 0}
          onClick={() => setStep(1)}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};
