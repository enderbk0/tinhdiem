'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useGradeStore } from '@/store/useGradeStore';
import { SUBJECTS_THCS, SUBJECTS_THPT } from '@/constants';
import { evaluateResult } from '@/lib/gradeUtils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Trophy, Star, AlertCircle, Share2, Download, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';

export const StepResult: React.FC = () => {
  const { gradeLevel, grades, criteria, calcMode, resetAll, calculationTarget, inputMode } = useGradeStore();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const subjects = parseInt(gradeLevel || '6') >= 10 ? SUBJECTS_THPT : SUBJECTS_THCS;
  
  // Calculate results for the most relevant target
  const target = calculationTarget.includes('year') ? 'year' : calculationTarget[0];
  const result = useMemo(() => evaluateResult(grades, subjects, criteria, calcMode, target, inputMode), [grades, subjects, criteria, calcMode, target, inputMode]);

  const chartData = useMemo(() => {
    return subjects
      .filter(s => s.type === 'score' && result.subjectAvgs[s.id] !== null)
      .map(s => ({
        name: s.name,
        avg: result.subjectAvgs[s.id] as number
      }));
  }, [subjects, result]);

  const showConfetti = result.title !== 'Không';

  return (
    <div className="space-y-8 pb-20">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-2"
        >
          <Trophy size={48} />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-gray-800 dark:text-white"
        >
          Kết quả học tập
        </motion.h2>
        <p className="text-gray-500 dark:text-gray-400">Chúc mừng bạn đã hoàn thành việc nhập điểm!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center p-8 space-y-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none shadow-2xl">
          <div className="text-center">
            <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px]">Điểm trung bình</p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl font-black mt-1"
            >
              {result.overallAvg !== null && !isNaN(result.overallAvg) ? result.overallAvg.toString() : '--'}
            </motion.div>
          </div>
          
          <div className="w-full h-px bg-blue-400/50" />
          
          <div className="text-center space-y-0.5">
            <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px]">Xếp loại</p>
            <p className="text-xl font-black">{result.rank || 'Chưa xếp loại'}</p>
          </div>

          {result.title !== 'Không' && (
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl w-full text-center flex items-center justify-center gap-2 border border-white/30">
              <Star size={16} className="text-yellow-300 fill-yellow-300" />
              <span className="font-black text-base">{result.title}</span>
              <Star size={16} className="text-yellow-300 fill-yellow-300" />
            </div>
          )}
        </Card>

        {/* Charts */}
        <Card className="lg:col-span-2 p-4 overflow-hidden flex flex-col">
          <h3 className="text-base font-bold mb-4">Biểu đồ môn học</h3>
          <div className="flex-1 w-full min-h-[250px] relative">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                  <XAxis dataKey="name" hide />
                  <YAxis domain={[0, 10]} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                    cursor={{ fill: '#f3f4f6' }}
                  />
                  <Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Table - Optimized for Desktop grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-sm">Chi tiết từng môn</h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase">Target: {target.toUpperCase()}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-800">
          {subjects.map((s) => (
            <div key={s.id} className="bg-white dark:bg-gray-900 p-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">{s.name}</span>
              <span className={cn(
                "font-black text-sm",
                typeof result.subjectAvgs[s.id] === 'number' 
                  ? (result.subjectAvgs[s.id] as number >= 8 ? "text-green-500" : result.subjectAvgs[s.id] as number >= 5 ? "text-blue-500" : "text-red-500")
                  : (result.subjectAvgs[s.id] === 'Đạt' ? "text-green-500" : result.subjectAvgs[s.id] === 'Chưa đạt' ? "text-red-500" : "text-gray-300")
              )}>
                {result.subjectAvgs[s.id] !== null && result.subjectAvgs[s.id] !== undefined ? (result.subjectAvgs[s.id] as any).toString() : '--'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border-2 border-blue-100 dark:border-blue-800/50">
        <AlertCircle className="text-blue-500 shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-300 italic">
          <strong>Lưu ý:</strong> Kết quả tính toán chỉ mang tính chất tham khảo. Có thể có chênh lệch hoặc sai sót nhỏ do làm tròn số hoặc thay đổi quy định của nhà trường.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-8">
        <Button variant="outline" className="gap-2" onClick={() => window.print()}>
          <Download size={20} /> Xuất PDF
        </Button>
        <Button variant="secondary" className="gap-2" onClick={() => {}}>
          <Share2 size={20} /> Chia sẻ
        </Button>
        <Button variant="danger" className="gap-2" onClick={resetAll}>
          <RotateCcw size={20} /> Làm lại từ đầu
        </Button>
      </div>
    </div>
  );
};
