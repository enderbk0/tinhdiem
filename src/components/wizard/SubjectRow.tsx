'use client';

import React from 'react';
import { Subject, ScoreEntry } from '@/types';
import { Button } from '@/components/ui/Button';
import { Plus, Minus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateSubjectAvg } from '@/lib/gradeUtils';
import { useGradeStore } from '@/store/useGradeStore';

interface SubjectRowProps {
  subject: Subject;
  semester: 'hk1' | 'hk2';
  entry: ScoreEntry;
  onUpdate: (entry: Partial<ScoreEntry>) => void;
}

export const SubjectRow: React.FC<SubjectRowProps> = ({ subject, semester, entry, onUpdate }) => {
  const { inputMode } = useGradeStore();
  const avg = subject.type === 'score' ? calculateSubjectAvg(entry, inputMode) : null;

  const handleTXChange = (index: number, value: string) => {
    const newTX = [...entry.tx];
    newTX[index] = value;
    onUpdate({ tx: newTX });
  };

  const addTX = () => {
    onUpdate({ tx: [...entry.tx, ''] });
  };

  const removeTX = (index: number) => {
    onUpdate({ tx: entry.tx.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-2 md:p-3 h-full">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Subject Name & Info */}
        <div className="w-full md:w-1/4">
          <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 leading-tight">{subject.name}</h4>
          {subject.requiredForExcellent && (
            <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold uppercase w-fit mt-0.5 block">Môn chủ đạo</span>
          )}
        </div>

        {/* Inputs Section */}
        <div className="flex-1">
          {subject.type === 'score' ? (
            <div className="flex flex-wrap gap-3 items-end">
              {inputMode === 'detailed' ? (
                <>
                  <div className="flex flex-wrap gap-1 items-end">
                    <span className="text-[8px] font-black uppercase text-gray-400 mb-1.5 mr-1">TX:</span>
                    {entry.tx.map((score, i) => (
                      <div key={i} className="relative group">
                        <input
                          type="text"
                          value={score}
                          onChange={(e) => handleTXChange(i, e.target.value)}
                          className="w-8 h-8 text-center text-xs font-bold bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 outline-none transition-all"
                          placeholder="0"
                        />
                        <button
                          onClick={() => removeTX(i)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Minus size={8} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addTX}
                      className="w-8 h-8 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase text-gray-400 mb-0.5">GK</span>
                      <input
                        type="text"
                        value={entry.gk || ''}
                        onChange={(e) => onUpdate({ gk: e.target.value })}
                        className="w-10 h-8 text-center text-xs font-bold bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 outline-none transition-all"
                        placeholder="GK"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black uppercase text-gray-400 mb-0.5">CK</span>
                      <input
                        type="text"
                        value={entry.ck || ''}
                        onChange={(e) => onUpdate({ ck: e.target.value })}
                        className="w-10 h-8 text-center text-xs font-bold bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg focus:border-purple-500 outline-none transition-all"
                        placeholder="CK"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <span className="text-[8px] font-black uppercase text-gray-400">Điểm trung bình {semester.toUpperCase()}:</span>
                  <input
                    type="text"
                    value={entry.gk || ''}
                    onChange={(e) => onUpdate({ gk: e.target.value })}
                    className="max-w-[100px] h-8 px-2 text-xs font-bold bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg focus:border-blue-500 outline-none transition-all"
                    placeholder="0.0"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg max-w-[160px]">
              {['Đạt', 'Chưa đạt'].map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdate({ gk: status })}
                  className={cn(
                    'flex-1 py-1 px-2 rounded-md text-[10px] font-bold transition-all',
                    entry.gk === status
                      ? status === 'Đạt'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'text-gray-500'
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Final Avg display */}
        <div className="w-12 text-right">
          {subject.type === 'score' ? (
            <div className={cn(
              "text-lg font-black",
              avg === null ? "text-gray-300" : avg >= 8 ? "text-green-500" : avg >= 5 ? "text-blue-500" : "text-red-500"
            )}>
              {avg !== null && !isNaN(avg) ? avg : '--'}
            </div>
          ) : (
            <div className={cn(
              "text-[10px] font-black uppercase",
              entry.gk === 'Đạt' ? "text-green-500" : entry.gk === 'Chưa đạt' ? "text-red-500" : "text-gray-300"
            )}>
              {entry.gk || '--'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
