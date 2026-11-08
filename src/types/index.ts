export type NavTab = 
  | 'home' 
  | 'study-material' 
  | 'chapter-reader' 
  | 'syllabus' 
  | 'calendar' 
  | 'mock-test';

export type SubjectCategory = 
  | 'All Subjects' 
  | 'J&K' 
  | 'General' 
  | 'English' 
  | 'Mathematics' 
  | 'Reasoning' 
  | 'Computer' 
  | 'Technical';

export interface TargetPost {
  id: string;
  title: string;
  icon: string;
  department: string;
  relevantSubjectIds: string[];
}

export interface TopicItem {
  id: string;
  title: string;
  tag: string;
  readerChapterId?: string; // If it links directly to chapter reader
  isPopular?: boolean;
}

export interface SubjectItem {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  category: SubjectCategory;
  topics: TopicItem[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SectionTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface SectionPYQ {
  question: string;
  exam: string;
  answer: string;
  explanation?: string;
}

export interface SectionSubItem {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: SectionTable;
  examPoints?: string[];
  correctionNotes?: string[];
}

export interface ChapterSection {
  id: string;
  title: string;
  badge?: string;
  content?: string[];
  bullets?: string[];
  table?: SectionTable;
  examPoints?: string[];
  correctionNotes?: string[];
  subsections?: SectionSubItem[];
  pyqs?: SectionPYQ[];
  highYieldPoints?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  category: string;
  readTime: string;
  sectionsCount: number;
  summary: string;
  sections: ChapterSection[];
  quiz?: QuizQuestion[];
  isDynamic?: boolean;
  generatedAt?: string;
  subjectTitle?: string;
}

export interface SyllabusSubject {
  name: string;
  marks?: number;
  topics: string[];
}

export interface SyllabusPost {
  id: string;
  title: string;
  icon: string;
  department: string;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  selectionProcess: string;
  subjects: SyllabusSubject[];
}

export interface CalendarEvent {
  id: string;
  postName: string;
  advtNumber: string;
  department: string;
  tentativeDate: string;
  month: string;
  type: 'OMR Based Exam' | 'CBT Exam' | 'Physical Test (PET/PST)' | 'Type Test';
  status: 'Tentative' | 'Confirmed' | 'Completed';
  syllabusId?: string;
}

export interface MockQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
  examTag: string;
}

export interface MockTestConfig {
  id: string;
  title: string;
  targetExam: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  totalMarks: number;
  questions: MockQuestion[];
}

export interface TestSubmission {
  score: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  timeSpentSeconds: number;
}

export interface AIMentorRequest {
  mode: 'explain' | 'quiz' | 'chat';
  topic?: string;
  question?: string;
  options?: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  context?: string;
  postCategory?: string;
}

export interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip?: string;
}

export interface GeneratedQuizResponse {
  topicTitle: string;
  briefIntro: string;
  questions: GeneratedQuizQuestion[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

