import { Subject } from "../types";

export const SUBJECTS_THCS: Subject[] = [
  { id: 'math', name: 'Toán', type: 'score', requiredForExcellent: true },
  { id: 'literature', name: 'Ngữ văn', type: 'score', requiredForExcellent: true },
  { id: 'english', name: 'Tiếng Anh', type: 'score' },
  { id: 'science', name: 'Khoa học tự nhiên', type: 'score' },
  { id: 'history_geography', name: 'Lịch sử & Địa lý', type: 'score' },
  { id: 'civic_education', name: 'GDCD', type: 'score' },
  { id: 'informatics', name: 'Tin học', type: 'score' },
  { id: 'technology', name: 'Công nghệ', type: 'score' },
  { id: 'physical_education', name: 'Giáo dục thể chất', type: 'assessment' },
  { id: 'arts', name: 'Nghệ thuật', type: 'assessment' }, // Thường bao gồm Âm nhạc, Mỹ thuật
  { id: 'experience', name: 'HĐ trải nghiệm, hướng nghiệp', type: 'assessment' },
  { id: 'local_education', name: 'Nội dung giáo dục địa phương', type: 'assessment' },
];

export const SUBJECTS_THPT: Subject[] = [
  { id: 'math', name: 'Toán', type: 'score', requiredForExcellent: true },
  { id: 'literature', name: 'Ngữ văn', type: 'score', requiredForExcellent: true },
  { id: 'english', name: 'Tiếng Anh', type: 'score' },
  { id: 'physics', name: 'Vật lý', type: 'score' },
  { id: 'chemistry', name: 'Hóa học', type: 'score' },
  { id: 'biology', name: 'Sinh học', type: 'score' },
  { id: 'history', name: 'Lịch sử', type: 'score' },
  { id: 'geography', name: 'Địa lý', type: 'score' },
  { id: 'economic_legal', name: 'GD Kinh tế & Pháp luật', type: 'score' },
  { id: 'informatics', name: 'Tin học', type: 'score' },
  { id: 'technology', name: 'Công nghệ', type: 'score' },
  { id: 'defense_education', name: 'GD Quốc phòng & An ninh', type: 'score' },
  { id: 'physical_education', name: 'Giáo dục thể chất', type: 'assessment' },
  { id: 'experience', name: 'HĐ trải nghiệm, hướng nghiệp', type: 'assessment' },
  { id: 'local_education', name: 'Nội dung giáo dục địa phương', type: 'assessment' },
];

export const STEPS = [
  { id: 'target', label: 'Mục tiêu' },
  { id: 'grade', label: 'Khối lớp' },
  { id: 'input', label: 'Nhập điểm' },
  { id: 'criteria', label: 'Tiêu chí' },
  { id: 'result', label: 'Kết quả' },
];
