'use client';

import React from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Settings, ShieldCheck, History, HelpCircle } from 'lucide-react';

export const StepCriteria: React.FC = () => {
  const { criteria, setCriteria, calcMode, setCalcMode, setStep } = useGradeStore();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-800 dark:text-white"
        >
          Thiết lập tiêu chí
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Chọn cách bạn muốn chúng mình đánh giá kết quả học tập.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mode Selection */}
        <Card
          selected={calcMode === 'tt22'}
          onClick={() => setCalcMode('tt22')}
          className="flex flex-col items-center text-center space-y-2 p-4"
        >
          <div className={cn("p-3 rounded-xl", calcMode === 'tt22' ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400")}>
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-base font-bold">Thông tư 22/2021</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Phân loại: Tốt, Khá, Đạt, Chưa đạt. Chương trình mới.</p>
        </Card>

        <Card
          selected={calcMode === 'traditional'}
          onClick={() => setCalcMode('traditional')}
          className="flex flex-col items-center text-center space-y-2 p-4"
        >
          <div className={cn("p-3 rounded-xl", calcMode === 'traditional' ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400")}>
            <History size={24} />
          </div>
          <h3 className="text-base font-bold">Kiểu truyền thống</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Phân loại: Giỏi, Khá, TB, Yếu, Kém. Tiêu chuẩn cũ.</p>
        </Card>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border-2 border-gray-100 dark:border-gray-800 space-y-4">
        <h3 className="font-bold text-base flex items-center gap-2">
          <Settings size={18} className="text-gray-400" /> Tùy chỉnh chi tiết
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block">
              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase">Điểm tối thiểu (Giỏi)</span>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={criteria.minAvgExcellent}
                onChange={(e) => setCriteria({ minAvgExcellent: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
              />
              <div className="flex justify-between text-lg font-black text-blue-500 mt-1">
                <span>{criteria.minAvgExcellent}</span>
                <span className="text-[10px] text-gray-400">Điểm TB</span>
              </div>
            </label>

            <label className="block">
              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase">Điểm tối thiểu (Khá)</span>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={criteria.minAvgGood}
                onChange={(e) => setCriteria({ minAvgGood: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
              />
              <div className="flex justify-between text-lg font-black text-green-500 mt-1">
                <span>{criteria.minAvgGood}</span>
                <span className="text-[10px] text-gray-400">Điểm TB</span>
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <p className="text-sm font-bold">Toán/Văn</p>
                <p className="text-[10px] text-gray-500">Bắt buộc 1 môn đạt mức giỏi.</p>
              </div>
              <button
                onClick={() => setCriteria({ requireMathOrLiterature: !criteria.requireMathOrLiterature })}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  criteria.requireMathOrLiterature ? "bg-blue-500" : "bg-gray-300"
                )}
              >
                <div className={cn(
                  "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all",
                  criteria.requireMathOrLiterature ? "left-5.5" : "left-0.5"
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <p className="text-sm font-bold">Hạnh kiểm</p>
                <p className="text-[10px] text-gray-500">Mức xếp loại rèn luyện.</p>
              </div>
              <select
                value={criteria.conduct}
                onChange={(e) => setCriteria({ conduct: e.target.value as any })}
                className="bg-white dark:bg-gray-700 border-none rounded-lg font-bold px-2 py-1 text-xs outline-none"
              >
                <option value="Tốt">Tốt</option>
                <option value="Khá">Khá</option>
                <option value="Đạt">Đạt</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="md" onClick={() => setStep(2)}>
          Quay lại
        </Button>
        <Button
          size="lg"
          onClick={() => setStep(4)}
        >
          Xem kết quả
        </Button>
      </div>
    </div>
  );
};
