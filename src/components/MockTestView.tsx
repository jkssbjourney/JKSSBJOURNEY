import React, { useState, useEffect, useRef } from 'react';
import { NavTab, MockTestConfig, TestSubmission, AIMentorRequest } from '../types/index.ts';
import { MOCK_TESTS_DATA } from '../data/mockTestData.ts';
import { calculateTestScore, formatTime } from '../utils/testEngine.ts';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Award, 
  Check, 
  X, 
  FileCheck, 
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Sparkles,
  Bot
} from 'lucide-react';

interface MockTestViewProps {
  initialSearchQuery?: string;
  onNavigate: (tab: NavTab, params?: { chapterId?: string; syllabusId?: string; searchQuery?: string }) => void;
  onOpenMentor?: (req: AIMentorRequest) => void;
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  initialSearchQuery,
  onNavigate,
  onOpenMentor,
}) => {
  // Test selection state
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Active test execution state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({ '0': true });
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  // Test result
  const [submissionResult, setSubmissionResult] = useState<TestSubmission | null>(null);

  const activeTest = MOCK_TESTS_DATA.find((t) => t.id === selectedTestId) || null;

  // Auto-select test if initialSearchQuery matches
  useEffect(() => {
    if (initialSearchQuery && !selectedTestId && !isTestActive) {
      const match = MOCK_TESTS_DATA.find(
        (t) => t.title.toLowerCase().includes(initialSearchQuery.toLowerCase()) ||
               t.targetExam.toLowerCase().includes(initialSearchQuery.toLowerCase())
      );
      if (match) setSelectedTestId(match.id);
    }
  }, [initialSearchQuery, selectedTestId, isTestActive]);

  // Timer effect when test is active
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, isSubmitted]);

  const handleStartTest = (test: MockTestConfig) => {
    setSelectedTestId(test.id);
    setIsTestActive(true);
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setVisitedQuestions({ '0': true });
    setSecondsRemaining(test.durationMinutes * 60);
    setTimeSpentSeconds(0);
    setSubmissionResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleClearAnswer = (questionId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => ({ ...prev, [index.toString()]: true }));
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;
    const questionsForScoring = activeTest.questions.map((q) => ({
      id: q.id,
      correctIndex: q.correctIndex,
    }));
    const result = calculateTestScore(userAnswers, questionsForScoring, timeSpentSeconds);
    setSubmissionResult(result);
    setIsSubmitted(true);
    setShowSubmitModal(false);
  };

  const handleExitTest = () => {
    setIsTestActive(false);
    setIsSubmitted(false);
    setSelectedTestId(null);
  };

  // ----------------------------------------------------
  // RENDER 1: ACTIVE LIVE TEST INTERFACE
  // ----------------------------------------------------
  if (isTestActive && activeTest && !isSubmitted) {
    const currentQuestion = activeTest.questions[currentQuestionIndex];
    const isAnswered = userAnswers[currentQuestion.id] !== undefined;
    const isFlagged = !!flaggedQuestions[currentQuestion.id];

    // Counts for summary
    const answeredCount = Object.keys(userAnswers).length;
    const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
    const unattemptedCount = activeTest.questions.length - answeredCount;

    return (
      <div className="space-y-6 pb-16">
        
        {/* Sticky Exam Top Bar */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-50 text-[#0d3b66] font-bold text-sm">
              Q{currentQuestionIndex + 1}/{activeTest.questions.length}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#0d3b66] truncate max-w-xs sm:max-w-md">
                {activeTest.title}
              </h2>
              <div className="text-[11px] text-slate-500">
                Marking: +1.00 Correct · -0.25 Penalty
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Live Countdown Timer */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold shadow-2xs border ${
              secondsRemaining < 180
                ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}>
              <Clock className="w-4 h-4 text-current" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Test Area (Left Question, Right Palette) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Question & Options Zone (Col 1-3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Question Header & Meta */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#146c94] text-xs font-bold">
                  {currentQuestion.subject}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentQuestion.examTag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Ask AI Mentor Button */}
                <button
                  onClick={() => onOpenMentor?.({
                    mode: 'explain',
                    topic: currentQuestion.subject,
                    question: currentQuestion.question,
                    options: currentQuestion.options,
                    selectedAnswer: userAnswers[currentQuestion.id] !== undefined ? currentQuestion.options[userAnswers[currentQuestion.id]] : undefined,
                    postCategory: activeTest.targetExam,
                  })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#146c94]/10 hover:bg-[#146c94]/20 text-[#0d3b66] border border-[#146c94]/20 transition-colors cursor-pointer"
                  title="Ask AI Mentor for explanation, memory trick, or Urdu breakdown"
                >
                  <Bot className="w-3.5 h-3.5 text-[#146c94]" />
                  <span>Ask AI Mentor</span>
                </button>

                {/* Flag Question Button */}
                <button
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isFlagged
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'text-slate-500 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-purple-600' : ''}`} />
                  <span>{isFlagged ? 'Flagged' : 'Review'}</span>
                </button>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-[#146c94] text-[#0d3b66] ring-2 ring-[#146c94]/20 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/70'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-[#0d3b66] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => handleJumpToQuestion(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={currentQuestionIndex === activeTest.questions.length - 1}
                  onClick={() => handleJumpToQuestion(currentQuestionIndex + 1)}
                  className="px-4 py-2 rounded-xl bg-[#0d3b66] text-white text-xs font-semibold hover:bg-[#146c94] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {isAnswered && (
                <button
                  onClick={() => handleClearAnswer(currentQuestion.id)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                >
                  Clear Response
                </button>
              )}
            </div>
          </div>

          {/* Right Question Palette (Col 4) */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-sm font-extrabold text-[#0d3b66] uppercase tracking-wider">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                <span>Unattempted ({unattemptedCount})</span>
              </div>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {activeTest.questions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isFlg = !!flaggedQuestions[q.id];
                const isCurr = currentQuestionIndex === idx;

                let pillColor = "bg-slate-100 text-slate-700 border-slate-200";
                if (isAns) {
                  pillColor = "bg-emerald-500 text-white border-emerald-600";
                } else if (isFlg) {
                  pillColor = "bg-purple-500 text-white border-purple-600";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs border transition-all flex items-center justify-center cursor-pointer ${pillColor} ${
                      isCurr ? 'ring-2 ring-[#0d3b66] ring-offset-1 scale-105' : 'hover:opacity-85'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-[#0d3b66]">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-bold">Ready to Submit Your Test?</h3>
              </div>
              <p className="text-xs text-slate-600">
                You will not be able to change your answers once submitted. Here is your current test status:
              </p>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Total Questions:</span>
                  <span className="font-bold">{activeTest.questions.length}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Answered:</span>
                  <span>{answeredCount}</span>
                </div>
                <div className="flex justify-between text-purple-700 font-semibold">
                  <span>Flagged for Review:</span>
                  <span>{flaggedCount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Unattempted / Skipped:</span>
                  <span>{unattemptedCount}</span>
                </div>
                <div className="flex justify-between text-[#0d3b66] font-semibold border-t border-slate-200 pt-2">
                  <span>Time Remaining:</span>
                  <span className="font-mono">{formatTime(secondsRemaining)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Resume Test
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
                >
                  Yes, Submit & View Score
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 2: POST-SUBMISSION PERFORMANCE ANALYSIS & REVIEW
  // ----------------------------------------------------
  if (isSubmitted && activeTest && submissionResult) {
    return (
      <div className="space-y-8 pb-16">
        
        {/* Scorecard Hero Banner */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Test Completed Successfully
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b66] mt-1">
                Performance Scorecard: {activeTest.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Evaluated under standard JKSSB criteria (+1.00 correct, -0.25 negative marking)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartTest(activeTest)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
              <button
                onClick={handleExitTest}
                className="px-4 py-2.5 rounded-xl bg-[#0d3b66] text-white hover:bg-[#146c94] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Back to Arena</span>
              </button>
            </div>
          </div>

          {/* Metric KPI blocks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Score */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
              <div className="text-xs font-semibold text-slate-500">Your Final Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0d3b66] font-mono mt-1">
                {submissionResult.score} <span className="text-xs text-slate-500 font-normal">/ {activeTest.totalMarks}</span>
              </div>
            </div>

            {/* Accuracy */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="text-xs font-semibold text-slate-500">Accuracy Rate</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-1">
                {submissionResult.accuracy}%
              </div>
            </div>

            {/* Correct */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-semibold text-slate-500">Correct Answers</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1">
                {submissionResult.correctCount}
              </div>
            </div>

            {/* Incorrect */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-semibold text-slate-500">Incorrect (-0.25)</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-red-500 font-mono mt-1">
                {submissionResult.incorrectCount}
              </div>
            </div>

            {/* Unattempted */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center col-span-2 md:col-span-1">
              <div className="text-xs font-semibold text-slate-500">Skipped</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-500 font-mono mt-1">
                {submissionResult.unattemptedCount}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Question-by-Question Solution Review */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d3b66]">
              Detailed Question-by-Question Solutions
            </h2>
            <span className="text-xs font-medium text-slate-500">
              Showing official answer keys & verified explanations
            </span>
          </div>

          <div className="space-y-4">
            {activeTest.questions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;
              const isSkipped = selectedOpt === undefined;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 ${
                    isCorrect
                      ? 'border-emerald-200'
                      : isSkipped
                      ? 'border-slate-200'
                      : 'border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0d3b66]">Q{idx + 1}.</span>
                      <span className="text-xs text-slate-500 font-medium">{q.subject}</span>
                    </div>

                    <div>
                      {isCorrect ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          +1.00 Correct
                        </span>
                      ) : isSkipped ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          0.00 Skipped
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          -0.25 Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-slate-900">
                    {q.question}
                  </div>

                  {/* 4 Options breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      let style = "bg-slate-50 border-slate-200 text-slate-700";
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correctIndex === optIdx;

                      if (isThisCorrect) {
                        style = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                      } else if (isThisSelected) {
                        style = "bg-red-50 border-red-300 text-red-900";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isThisCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isThisSelected && !isThisCorrect && <X className="w-4 h-4 text-red-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-[#0d3b66] space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-[#146c94]" />
                      <span>Official Explanation:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {q.explanation}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-blue-200/60">
                      <button
                        onClick={() => onOpenMentor?.({
                          mode: 'explain',
                          topic: q.subject,
                          question: q.question,
                          options: q.options,
                          selectedAnswer: selectedOpt !== undefined ? q.options[selectedOpt] : undefined,
                          correctAnswer: q.options[q.correctIndex],
                          context: q.explanation,
                          postCategory: activeTest.targetExam,
                        })}
                        className="px-3 py-1.5 rounded-lg bg-[#0d3b66] hover:bg-[#146c94] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Bot className="w-3.5 h-3.5 text-[#ffd166]" />
                        <span>Ask AI Mentor: Explain with Mnemonic & Urdu</span>
                      </button>

                      <button
                        onClick={() => onOpenMentor?.({
                          mode: 'quiz',
                          topic: q.subject,
                          postCategory: activeTest.targetExam,
                        })}
                        className="text-xs font-bold text-[#146c94] hover:text-[#0d3b66] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#146c94]" />
                        <span>Generate 5 Practice MCQs on this topic →</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 3: TEST SELECTION SCREEN (MOCK ARENA OVERVIEW)
  // ----------------------------------------------------
  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] p-6 sm:p-10 md:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xs">
            <span>⏱️ Mock Test & PYQ Arena</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Realistic Exam Practice with <span className="text-[#ffd166]">Instant Scoring</span>
          </h1>
          <p className="text-slate-100 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Timed mock tests and authentic previous year papers equipped with live countdown timers, question review flags, and standard -0.25 negative marking.
          </p>
        </div>
      </section>

      {/* 2. EXAM SELECTOR CARDS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d3b66]">
              Choose Your Practice Test
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a test paper to begin your timed test session
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TESTS_DATA.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#146c94] text-xs font-bold">
                    {test.targetExam}
                  </span>
                  <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">
                    -0.25 Negative
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0d3b66]">
                  {test.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {test.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{test.questionCount} Questions</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{test.durationMinutes} Minutes</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#146c94]" />
                    <span>{test.totalMarks} Marks</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Free Access · Unlimited Retakes</span>
                <button
                  onClick={() => handleStartTest(test)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0d3b66] bg-[#ffd166] hover:bg-[#ffc63a] shadow-xs transition-all hover:shadow hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start Test Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXAM INSTRUCTIONS CARD */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-3">
        <h3 className="text-sm font-bold text-[#0d3b66] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Standard JKSSB Test Instructions & Marking Guidelines</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold">•</span>
            <span>Each question carries <strong>1.00 Mark</strong> for the correct response.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            <span>A penalty of <strong>0.25 Mark</strong> will be deducted for each incorrect answer.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">•</span>
            <span>No marks are awarded or deducted for unattempted/skipped questions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#146c94] font-bold">•</span>
            <span>You can flag questions for review and jump to any question using the Question Palette.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
