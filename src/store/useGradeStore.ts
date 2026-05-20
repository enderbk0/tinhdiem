import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, GradeLevel, CalculationTarget, SubjectGrade, AppCriteria, CalcMode, ScoreEntry, InputMode } from '../types';

interface GradeStore extends AppState {
  setStep: (step: number) => void;
  setCalculationTarget: (targets: CalculationTarget[]) => void;
  setGradeLevel: (level: GradeLevel | null) => void;
  updateGrade: (subjectId: string, semester: 'hk1' | 'hk2', entry: Partial<ScoreEntry>) => void;
  resetGrades: () => void;
  setCriteria: (criteria: Partial<AppCriteria>) => void;
  setCalcMode: (mode: CalcMode) => void;
  setInputMode: (mode: InputMode) => void;
  resetAll: () => void;
}

const initialCriteria: AppCriteria = {
  minAvgExcellent: 8.0,
  minAvgGood: 6.5,
  noSubjectBelowExcellent: 6.5,
  noSubjectBelowGood: 5.0,
  requireMathOrLiterature: true,
  conduct: 'Tốt',
};

const initialState: AppState = {
  step: 0,
  calculationTarget: ['year'],
  gradeLevel: null,
  grades: [],
  criteria: initialCriteria,
  calcMode: 'tt22',
  inputMode: 'detailed',
};

export const useGradeStore = create<GradeStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      setCalculationTarget: (calculationTarget) => set({ calculationTarget }),

      setGradeLevel: (gradeLevel) => set({ gradeLevel, grades: [] }), // Reset grades when changing level

      updateGrade: (subjectId, semester, entry) =>
        set((state) => {
          const existingGradeIndex = state.grades.findIndex((g) => g.subjectId === subjectId);
          let newGrades = [...state.grades];

          if (existingGradeIndex > -1) {
            newGrades[existingGradeIndex] = {
              ...newGrades[existingGradeIndex],
              [semester]: { ...newGrades[existingGradeIndex][semester], ...entry },
            };
          } else {
            const newGrade: SubjectGrade = {
              subjectId,
              hk1: { tx: [], gk: null, ck: null },
              hk2: { tx: [], gk: null, ck: null },
              [semester]: { tx: [], gk: null, ck: null, ...entry },
            };
            newGrades.push(newGrade);
          }

          return { grades: newGrades };
        }),

      resetGrades: () => set({ grades: [] }),

      setCriteria: (criteria) =>
        set((state) => ({ criteria: { ...state.criteria, ...criteria } })),

      setCalcMode: (calcMode) => set({ calcMode }),

      setInputMode: (inputMode) => set({ inputMode }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'vn-grade-calculator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
