export type GradeType = 'score' | 'assessment'; // score: 0-10, assessment: Đạt/Chưa đạt

export interface Subject {
  id: string;
  name: string;
  type: GradeType;
  requiredForExcellent?: boolean; // e.g., Toán or Văn >= 8.0?
}

export interface ScoreEntry {
  tx: (number | string)[]; // Thường xuyên
  gk: number | string | null; // Giữa kỳ
  ck: number | string | null; // Cuối kỳ
}

export interface SubjectGrade {
  subjectId: string;
  hk1: ScoreEntry;
  hk2: ScoreEntry;
}

export type GradeLevel = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface AppCriteria {
  minAvgExcellent: number;
  minAvgGood: number;
  noSubjectBelowExcellent: number;
  noSubjectBelowGood: number;
  requireMathOrLiterature: boolean;
  conduct: 'Tốt' | 'Khá' | 'Đạt';
}

export type CalcMode = 'tt22' | 'traditional';
export type CalculationTarget = 'hk1' | 'hk2' | 'year';

export type InputMode = 'detailed' | 'simple';

export interface AppState {
  step: number;
  calculationTarget: CalculationTarget[];
  gradeLevel: GradeLevel | null;
  grades: SubjectGrade[];
  criteria: AppCriteria;
  calcMode: CalcMode;
  inputMode: InputMode;
}
