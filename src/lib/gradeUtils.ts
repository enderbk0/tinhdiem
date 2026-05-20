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
  let assessmentSelectedCount = 0;
  
  const scores: number[] = [];

  subjects.forEach(subject => {
    const grade = grades.find(g => g.subjectId === subject.id);
    if (!grade) {
      subjectAvgs[subject.id] = null;
      return;
    }

    if (subject.type === 'assessment') {
      hasAssessment = true;
      const statusRaw = semester === 'year' 
        ? grade.hk2.gk 
        : (semester === 'hk1' ? grade.hk1.gk : grade.hk2.gk);
      
      const status = (statusRaw === 'Đạt' || statusRaw === 'Chưa đạt') ? statusRaw : null;
      
      subjectAvgs[subject.id] = status;
      if (status !== null) assessmentSelectedCount++;
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

  // If user hasn't entered enough data, don't rank yet
  if (scoreCount === 0 && assessmentSelectedCount === 0) {
    return { subjectAvgs, overallAvg, rank, title };
  }

  if (mode === 'tt22') {
    // TT22: Tốt, Khá, Đạt, Chưa đạt
    if (scoreCount > 0) {
      const above80Count = scores.filter(s => s >= 8.0).length;
      const above65Count = scores.filter(s => s >= 6.5).length;
      const above50Count = scores.filter(s => s >= 5.0).length;
      const minScore = Math.min(...scores);

      if (overallAvg! >= 6.5 && above80Count >= 6 && allAssessmentPass && minScore >= 5.0) {
        rank = 'Tốt';
        if (overallAvg! >= 9.0 && minScore >= 6.5) title = 'Học sinh Xuất sắc';
        else title = 'Học sinh Giỏi';
      } else if (overallAvg! >= 5.0 && above65Count >= 6 && allAssessmentPass && minScore >= 3.5) {
        rank = 'Khá';
      } else if (above50Count >= 6 && minScore >= 3.5 && (scores.filter(s => s < 5.0).length <= 1 || allAssessmentPass)) {
        // Simple "Đạt" logic: most subjects >= 5.0, no one < 3.5
        rank = 'Đạt';
      } else {
        rank = 'Chưa đạt';
      }
    } else if (hasAssessment && assessmentSelectedCount > 0) {
      // Only assessment subjects
      rank = allAssessmentPass ? 'Đạt' : 'Chưa đạt';
    }
  } else {
    // Traditional: Xuất sắc, Giỏi, Khá, Trung bình, Yếu, Kém
    if (scoreCount > 0) {
      const mathAvg = subjectAvgs['math'] as number | null;
      const litAvg = subjectAvgs['literature'] as number | null;
      const hasCore8 = (mathAvg !== null && mathAvg >= 8.0) || (litAvg !== null && litAvg >= 8.0);
      const hasCore65 = (mathAvg !== null && mathAvg >= 6.5) || (litAvg !== null && litAvg >= 6.5);
      const hasCore5 = (mathAvg !== null && mathAvg >= 5.0) || (litAvg !== null && litAvg >= 5.0);
      const minScore = Math.min(...scores);

      if (overallAvg! >= 9.0 && hasCore8 && minScore >= 8.0 && allAssessmentPass) {
        rank = 'Xuất sắc';
        title = 'Học sinh Xuất sắc';
      } else if (overallAvg! >= 8.0 && hasCore8 && minScore >= 6.5 && allAssessmentPass) {
        rank = 'Giỏi';
        title = 'Học sinh Giỏi';
      } else if (overallAvg! >= 6.5 && hasCore65 && minScore >= 5.0 && allAssessmentPass) {
        rank = 'Khá';
      } else if (overallAvg! >= 5.0 && hasCore5 && minScore >= 3.5 && allAssessmentPass) {
        rank = 'Trung bình';
      } else if (overallAvg! >= 3.5 && minScore >= 2.0) {
        rank = 'Yếu';
      } else {
        rank = 'Kém';
      }
    }
  }

  return { subjectAvgs, overallAvg, rank, title };
};
