import { ScoreEntry, SubjectGrade, Subject, AppCriteria } from '../types';

export const round = (num: number, decimal: number = 1): number => {
  const factor = Math.pow(10, decimal);
  return Math.round(num * factor) / factor;
};

export const calculateSubjectAvg = (entry: ScoreEntry, mode: 'detailed' | 'simple' = 'detailed'): number | null => {
  if (mode === 'simple') {
    return typeof entry.gk === 'string' ? parseFloat(entry.gk) : entry.gk;
  }
  
  const txScores = entry.tx.map(v => typeof v === 'string' ? parseFloat(v) : v).filter(v => !isNaN(v));
  const gk = typeof entry.gk === 'string' ? parseFloat(entry.gk) : entry.gk;
  const ck = typeof entry.ck === 'string' ? parseFloat(entry.ck) : entry.ck;

  if (txScores.length === 0 || gk === null || ck === null || isNaN(gk) || isNaN(ck)) {
    return null;
  }

  const sumTX = txScores.reduce((acc, v) => acc + v, 0);
  const avg = (sumTX + gk * 2 + ck * 3) / (txScores.length + 5);
  return round(avg);
};

export const calculateYearAvg = (hk1: number | null, hk2: number | null): number | null => {
  if (hk1 === null || hk2 === null) return null;
  return round((hk1 + hk2 * 2) / 3);
};

export interface ResultSummary {
  subjectAvgs: Record<string, number | 'Đạt' | 'Chưa đạt' | null>;
  overallAvg: number | null;
  rank: string;
  title: string;
}

export const evaluateResult = (
  grades: SubjectGrade[],
  subjects: Subject[],
  criteria: AppCriteria,
  mode: 'tt22' | 'traditional',
  semester: 'hk1' | 'hk2' | 'year',
  inputMode: 'detailed' | 'simple' = 'detailed'
): ResultSummary => {
  const subjectAvgs: Record<string, number | 'Đạt' | 'Chưa đạt' | null> = {};
  let totalScore = 0;
  let scoreCount = 0;
  let allAssessmentPass = true;
  let hasAssessment = false;
  
  const scores: number[] = [];

  subjects.forEach(subject => {
    const grade = grades.find(g => g.subjectId === subject.id);
    if (!grade) {
      subjectAvgs[subject.id] = null;
      return;
    }

    if (subject.type === 'assessment') {
      hasAssessment = true;
      const status = semester === 'year' 
        ? (grade.hk2.gk === 'Đạt' ? 'Đạt' : 'Chưa đạt') // Simple logic for assessment: use HK2 for year
        : (semester === 'hk1' ? (grade.hk1.gk === 'Đạt' ? 'Đạt' : 'Chưa đạt') : (grade.hk2.gk === 'Đạt' ? 'Đạt' : 'Chưa đạt'));
      
      // Note: for assessment subjects, we use GK field to store 'Đạt'/'Chưa đạt' for simplicity in UI
      subjectAvgs[subject.id] = status;
      if (status === 'Chưa đạt') allAssessmentPass = false;
    } else {
      let avg: number | null = null;
      if (semester === 'hk1') {
        avg = calculateSubjectAvg(grade.hk1, inputMode);
      } else if (semester === 'hk2') {
        avg = calculateSubjectAvg(grade.hk2, inputMode);
      } else {
        const h1 = calculateSubjectAvg(grade.hk1, inputMode);
        const h2 = calculateSubjectAvg(grade.hk2, inputMode);
        avg = calculateYearAvg(h1, h2);
      }

      subjectAvgs[subject.id] = avg;
      if (avg !== null) {
        totalScore += avg;
        scoreCount++;
        scores.push(avg);
      }
    }
  });

  const overallAvg = scoreCount > 0 ? round(totalScore / scoreCount) : null;
  
  let rank = 'Chưa xếp loại';
  let title = 'Không';

  if (overallAvg !== null) {
    if (mode === 'tt22') {
      // TT22: Tốt, Khá, Đạt, Chưa đạt
      const above65Count = scores.filter(s => s >= 6.5).length;
      const above80Count = scores.filter(s => s >= 8.0).length;
      const above50Count = scores.filter(s => s >= 5.0).length;
      const minScore = Math.min(...scores);

      if (overallAvg >= 6.5 && above80Count >= 6 && allAssessmentPass) {
        rank = 'Tốt';
        if (overallAvg >= 9.0 && scores.every(s => s >= 6.5)) title = 'Học sinh Xuất sắc';
        else title = 'Học sinh Giỏi';
      } else if (overallAvg >= 5.0 && above65Count >= 6 && allAssessmentPass) {
        rank = 'Khá';
      } else if (overallAvg >= 3.5 && above50Count >= 6) {
        rank = 'Đạt';
      } else {
        rank = 'Chưa đạt';
      }
    } else {
      // Traditional: Xuất sắc, Giỏi, Khá, Trung bình, Yếu, Kém
      const mathAvg = subjectAvgs['math'] as number | null;
      const litAvg = subjectAvgs['literature'] as number | null;
      const coreSubjectHigh = (mathAvg !== null && mathAvg >= criteria.minAvgExcellent) || (litAvg !== null && litAvg >= criteria.minAvgExcellent);
      const coreSubjectGood = (mathAvg !== null && mathAvg >= criteria.minAvgGood) || (litAvg !== null && litAvg >= criteria.minAvgGood);
      const minScore = Math.min(...scores);

      if (overallAvg >= 9.0 && coreSubjectHigh && minScore >= 8.0 && allAssessmentPass) {
        rank = 'Xuất sắc';
        title = 'Học sinh Xuất sắc';
      } else if (overallAvg >= 8.0 && coreSubjectHigh && minScore >= 6.5 && allAssessmentPass) {
        rank = 'Giỏi';
        title = 'Học sinh Giỏi';
      } else if (overallAvg >= 6.5 && coreSubjectGood && minScore >= 5.0 && allAssessmentPass) {
        rank = 'Khá';
      } else if (overallAvg >= 5.0 && minScore >= 3.5 && allAssessmentPass) {
        rank = 'Trung bình';
      } else if (overallAvg >= 3.5 && minScore >= 2.0) {
        rank = 'Yếu';
      } else {
        rank = 'Kém';
      }
    }
  }

  return { subjectAvgs, overallAvg, rank, title };
};
