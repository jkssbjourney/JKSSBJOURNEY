import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Sparkles, 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Send, 
  Languages, 
  Lightbulb, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight,
  ChevronRight,
  Flame,
  BookOpen,
  Award
} from 'lucide-react';
import { AIMentorRequest, GeneratedQuizResponse, GeneratedQuizQuestion, ChatMessage } from '../types';

interface AIMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequest?: AIMentorRequest | null;
  onOpenQuizArena?: () => void;
}

export const AIMentorDrawer: React.FC<AIMentorDrawerProps> = ({
  isOpen,
  onClose,
  initialRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'explain' | 'quiz' | 'chat'>('explain');
  
  // Explain tab states
  const [explainTopic, setExplainTopic] = useState('');
  const [explainQuestion, setExplainQuestion] = useState('');
  const [explainContext, setExplainContext] = useState('');
  const [explanationResult, setExplanationResult] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explainError, setExplainError] = useState<string | null>(null);
  const [copiedMnemonic, setCopiedMnemonic] = useState(false);

  // Quiz generator states
  const [quizTopic, setQuizTopic] = useState('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuizResponse | null>(null);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Chat tab states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      role: 'assistant',
      content: 'Salam & Namaste, Aspirant! 🌟 I am your dedicated **JKSSB AI Mentor**. You can ask me to break down any tricky topic, explain confusing previous year questions, share memory mnemonics, or test your readiness. What are we studying today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Handle incoming request when opened with context
  useEffect(() => {
    if (initialRequest) {
      if (initialRequest.mode) {
        setActiveTab(initialRequest.mode);
      }
      if (initialRequest.topic) {
        setExplainTopic(initialRequest.topic);
        setQuizTopic(initialRequest.topic);
      }
      if (initialRequest.question) {
        setExplainQuestion(initialRequest.question);
      }
      if (initialRequest.context) {
        setExplainContext(initialRequest.context);
      }

      // Automatically trigger explanation if request provided question or topic
      if (initialRequest.mode === 'explain' && (initialRequest.question || initialRequest.topic)) {
        handleGenerateExplanation(
          initialRequest.topic, 
          initialRequest.question, 
          initialRequest.context, 
          initialRequest.options,
          initialRequest.selectedAnswer,
          initialRequest.correctAnswer
        );
      } else if (initialRequest.mode === 'quiz' && initialRequest.topic) {
        handleGenerateQuiz(initialRequest.topic);
      }
    }
  }, [initialRequest]);

  useEffect(() => {
    if (activeTab === 'chat' && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Handle Explain API call
  const handleGenerateExplanation = async (
    customTopic?: string, 
    customQ?: string, 
    customCtx?: string,
    opts?: string[],
    selAns?: string,
    corrAns?: string
  ) => {
    const topicToUse = customTopic !== undefined ? customTopic : explainTopic;
    const qToUse = customQ !== undefined ? customQ : explainQuestion;
    const ctxToUse = customCtx !== undefined ? customCtx : explainContext;

    if (!topicToUse.trim() && !qToUse.trim() && !ctxToUse.trim()) {
      setExplainError('Please enter a topic, question, or text to explain.');
      return;
    }

    setIsExplaining(true);
    setExplainError(null);
    setExplanationResult(null);

    try {
      const res = await fetch('/api/mentor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          question: qToUse,
          context: ctxToUse,
          options: opts,
          selectedAnswer: selAns,
          correctAnswer: corrAns,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch explanation from server.');
      }
      setExplanationResult(data.explanation);
    } catch (err: any) {
      console.error(err);
      setExplainError(err.message || 'Error communicating with AI Mentor.');
    } finally {
      setIsExplaining(false);
    }
  };

  // Handle Quiz Generation API call
  const handleGenerateQuiz = async (overrideTopic?: string) => {
    const topicToUse = (overrideTopic !== undefined ? overrideTopic : quizTopic).trim();
    if (!topicToUse) {
      setQuizError('Please enter a syllabus topic to generate questions.');
      return;
    }

    setIsGeneratingQuiz(true);
    setQuizError(null);
    setGeneratedQuiz(null);
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQuizIndex(0);

    try {
      const res = await fetch('/api/mentor/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          postCategory: 'JKSSB Graduate / 10+2 Level',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate quiz from server.');
      }

      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('Received empty question set. Please retry.');
      }

      setGeneratedQuiz(data);
    } catch (err: any) {
      console.error(err);
      setQuizError(err.message || 'Error generating quiz with Gemini API.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Handle Chat message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          currentContext: explainTopic ? `Current Topic: ${explainTopic}` : 'JKSSB Exam Portal',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get chat response.');
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '⚠️ I encountered an issue connecting to the AI Mentor service. Please ensure your internet connection is active and retry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Copy helper
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMnemonic(true);
    setTimeout(() => setCopiedMnemonic(false), 2000);
  };

  // Quiz Scoring
  const calculateQuizScore = (questions: GeneratedQuizQuestion[]) => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected === undefined) {
        unattempted++;
      } else if (selected === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const netScore = Math.max(0, correct * 1 - incorrect * 0.25);
    return { correct, incorrect, unattempted, netScore: Number(netScore.toFixed(2)) };
  };

  const sampleQuizTopics = [
    'Treaty of Amritsar 1846',
    'Indus Waters Treaty 1960',
    'Bank Reconciliation Statement (FAA)',
    'Article 370 & Reorganisation Act 2019',
    'National Parks & Sanctuaries of J&K',
    'Rivers & Lakes of Jammu & Kashmir',
    'Subject-Verb Agreement (English)',
    'Coding-Decoding & Number Series',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0d3b66] via-[#146c94] to-[#19a7ce] text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#ffd166] shadow-inner">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white tracking-tight">JKSSB AI Mentor</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ffd166] text-[#0d3b66] uppercase tracking-wider">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Your 24/7 Competitive Exam Success Partner • Instant Explanations & Quizzes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Mentor Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 gap-2 shrink-0">
          <button
            id="tab-mentor-explain"
            onClick={() => setActiveTab('explain')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'explain'
                ? 'border-[#146c94] text-[#0d3b66] bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#146c94]" />
            <span>Explain Topic / Question</span>
          </button>

          <button
            id="tab-mentor-quiz"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#146c94] text-[#0d3b66] bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-[#19a7ce]" />
            <span>Generate Custom Quiz</span>
          </button>

          <button
            id="tab-mentor-chat"
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'border-[#146c94] text-[#0d3b66] bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ffd166]" />
            <span>Ask Doubts</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#f8fafc]">
          
          {/* ======================================================== */}
          {/* TAB 1: EXPLAIN THIS TOPIC / QUESTION */}
          {/* ======================================================== */}
          {activeTab === 'explain' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5 leading-relaxed">
                <Sparkles className="w-4 h-4 text-[#146c94] shrink-0 mt-0.5" />
                <div>
                  <strong>How it works:</strong> Type any topic or paste a confusing question from your test. The AI Mentor will deliver a 4-part breakdown: core concept, exam mnemonic, Roman Urdu/Hindi translation, and typical JKSSB trap alert.
                </div>
              </div>

              {/* Input Form */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Syllabus Topic or Concept
                  </label>
                  <input
                    type="text"
                    value={explainTopic}
                    onChange={(e) => setExplainTopic(e.target.value)}
                    placeholder="e.g. Treaty of Amritsar, Martand Sun Temple, Article 370, Bank Reconciliation"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#146c94]/30 focus:border-[#146c94]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Question (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={explainQuestion}
                    onChange={(e) => setExplainQuestion(e.target.value)}
                    placeholder="Paste full question or options if you want an in-depth answer explanation..."
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#146c94]/30 focus:border-[#146c94]"
                  />
                </div>

                {explainContext && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Attached Context Excerpt
                    </label>
                    <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-200 italic line-clamp-3">
                      "{explainContext}"
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Languages className="w-3.5 h-3.5 text-slate-400" />
                    <span>Includes English & Roman Urdu breakdown</span>
                  </div>

                  <button
                    onClick={() => handleGenerateExplanation()}
                    disabled={isExplaining || (!explainTopic.trim() && !explainQuestion.trim())}
                    className="px-4 py-2 bg-[#0d3b66] hover:bg-[#146c94] text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    {isExplaining ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                        <span>Explain Concept</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {explainError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{explainError}</span>
                </div>
              )}

              {/* Rendered Explanation Output */}
              {explanationResult && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        AI Mentor Explanation
                      </h3>
                    </div>

                    <button
                      onClick={() => handleCopyText(explanationResult)}
                      className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center gap-1 rounded-md hover:bg-slate-100 cursor-pointer"
                    >
                      {copiedMnemonic ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMnemonic ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                    {explanationResult}
                  </div>

                  {/* Quick Bridge to Quiz */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Want to test your retention on this?</span>
                    <button
                      onClick={() => {
                        const targetTopic = explainTopic || 'JKSSB Revision';
                        setQuizTopic(targetTopic);
                        setActiveTab('quiz');
                        handleGenerateQuiz(targetTopic);
                      }}
                      className="px-3 py-1.5 bg-[#146c94]/10 hover:bg-[#146c94]/20 text-[#0d3b66] font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Brain className="w-3.5 h-3.5 text-[#146c94]" />
                      <span>Take 5-Question Quiz on This →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: GENERATE CUSTOM PRACTICE QUIZ */}
          {/* ======================================================== */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              {/* Quiz Generator Input Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Target Syllabus Topic for 5 MCQs
                  </label>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    +1.00 / -0.25 JKSSB Marking
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    placeholder="Enter any topic (e.g. Treaty of Amritsar, Rivers of J&K)..."
                    className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#146c94]/30 focus:border-[#146c94]"
                  />
                  <button
                    onClick={() => handleGenerateQuiz()}
                    disabled={isGeneratingQuiz || !quizTopic.trim()}
                    className="px-4 py-2.5 bg-[#0d3b66] hover:bg-[#146c94] text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-xs shrink-0"
                  >
                    {isGeneratingQuiz ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-3.5 h-3.5 text-[#ffd166]" />
                        <span>Generate Quiz</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Popular fast topic pills */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1.5">Quick Topic Suggestions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleQuizTopics.map((top) => (
                      <button
                        key={top}
                        onClick={() => {
                          setQuizTopic(top);
                          handleGenerateQuiz(top);
                        }}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        {top}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {quizError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{quizError}</span>
                </div>
              )}

              {/* Active Quiz Runner */}
              {generatedQuiz && generatedQuiz.questions.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  
                  {/* Quiz Header */}
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#146c94]" />
                        <span>{generatedQuiz.topicTitle}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{generatedQuiz.briefIntro}</p>
                    </div>

                    <button
                      onClick={() => handleGenerateQuiz()}
                      className="px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1 hover:bg-slate-200 cursor-pointer"
                      title="Regenerate new questions on this topic"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>New 5</span>
                    </button>
                  </div>

                  {!isQuizSubmitted ? (
                    <div className="p-5 space-y-5">
                      {/* Progress dots */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-800">
                          Question {currentQuizIndex + 1} of {generatedQuiz.questions.length}
                        </span>
                        <div className="flex gap-1.5">
                          {generatedQuiz.questions.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentQuizIndex(idx)}
                              className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                                currentQuizIndex === idx
                                  ? 'bg-[#0d3b66] text-white'
                                  : selectedAnswers[idx] !== undefined
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Current Question */}
                      {(() => {
                        const q = generatedQuiz.questions[currentQuizIndex];
                        const userChoice = selectedAnswers[currentQuizIndex];
                        const hasAnsweredCurrent = userChoice !== undefined;

                        return (
                          <div className="space-y-4">
                            <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                              {currentQuizIndex + 1}. {q.question}
                            </h5>

                            {/* 4 Options */}
                            <div className="space-y-2.5">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = userChoice === optIdx;
                                const isCorrect = optIdx === q.correctIndex;

                                let optionStyles = 'border-slate-200 bg-white hover:border-[#146c94] text-slate-800';

                                if (hasAnsweredCurrent) {
                                  if (isCorrect) {
                                    optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                                  } else if (isSelected) {
                                    optionStyles = 'border-rose-400 bg-rose-50/80 text-rose-950 ring-1 ring-rose-400';
                                  } else {
                                    optionStyles = 'border-slate-200 bg-slate-50 opacity-60 text-slate-500';
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={hasAnsweredCurrent}
                                    onClick={() => {
                                      setSelectedAnswers(prev => ({ ...prev, [currentQuizIndex]: optIdx }));
                                    }}
                                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${optionStyles}`}
                                  >
                                    <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                      hasAnsweredCurrent && isCorrect
                                        ? 'bg-emerald-600 text-white'
                                        : hasAnsweredCurrent && isSelected
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}>
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span className="flex-1">{opt}</span>
                                    {hasAnsweredCurrent && isCorrect && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    )}
                                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Instant Explanation Box when answered */}
                            {hasAnsweredCurrent && (
                              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs">
                                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                                  <Lightbulb className="w-4 h-4 text-[#146c94]" />
                                  <span>Official Explanation:</span>
                                </div>
                                <p className="text-slate-800 leading-relaxed">{q.explanation}</p>
                                {q.examTip && (
                                  <div className="p-2 bg-white rounded-lg border border-blue-100 text-[11px] text-blue-950 font-medium">
                                    💡 <strong>Memory Tip:</strong> {q.examTip}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Navigation controls */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <button
                                onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQuizIndex === 0}
                                className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 font-bold text-xs disabled:opacity-40 cursor-pointer hover:bg-slate-50"
                              >
                                ← Previous
                              </button>

                              {currentQuizIndex < generatedQuiz.questions.length - 1 ? (
                                <button
                                  onClick={() => setCurrentQuizIndex(prev => Math.min(generatedQuiz.questions.length - 1, prev + 1))}
                                  className="px-4 py-1.5 bg-[#0d3b66] hover:bg-[#146c94] text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Next</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => setIsQuizSubmitted(true)}
                                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                  <Award className="w-4 h-4" />
                                  <span>Submit & View Results</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* Scorecard View */
                    <div className="p-6 space-y-6">
                      {(() => {
                        const { correct, incorrect, unattempted, netScore } = calculateQuizScore(generatedQuiz.questions);
                        return (
                          <>
                            <div className="text-center space-y-2">
                              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-[#0d3b66] to-[#146c94] text-white shadow-md">
                                <Award className="w-8 h-8 text-[#ffd166]" />
                              </div>
                              <h4 className="text-lg font-bold text-slate-900">Quiz Completed!</h4>
                              <p className="text-xs text-slate-500">
                                Score calculated per JKSSB scheme (+1.00 correct, -0.25 wrong)
                              </p>
                              
                              <div className="text-3xl font-extrabold text-[#0d3b66] pt-1">
                                {netScore} <span className="text-sm font-semibold text-slate-400">/ 5.00</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                                <span className="text-lg font-bold text-emerald-700">{correct}</span>
                                <span className="text-[11px] text-emerald-800 block font-medium">Correct (+{correct})</span>
                              </div>
                              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-center">
                                <span className="text-lg font-bold text-rose-700">{incorrect}</span>
                                <span className="text-[11px] text-rose-800 block font-medium">Wrong (-{(incorrect * 0.25).toFixed(2)})</span>
                              </div>
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                                <span className="text-lg font-bold text-slate-600">{unattempted}</span>
                                <span className="text-[11px] text-slate-600 block font-medium">Skipped (0)</span>
                              </div>
                            </div>

                            {/* Question review list */}
                            <div className="space-y-3 pt-2">
                              <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                                Question Breakdown:
                              </h5>
                              {generatedQuiz.questions.map((q, idx) => {
                                const userOpt = selectedAnswers[idx];
                                const isCorrect = userOpt === q.correctIndex;

                                return (
                                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="font-bold text-slate-800">
                                        Q{idx + 1}. {q.question}
                                      </span>
                                      {userOpt === undefined ? (
                                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold shrink-0">Skipped</span>
                                      ) : isCorrect ? (
                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold shrink-0">Correct +1</span>
                                      ) : (
                                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold shrink-0">Wrong -0.25</span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-emerald-700 font-semibold">
                                      Answer: {q.options[q.correctIndex]}
                                    </p>
                                    <p className="text-[11px] text-slate-600 leading-normal">
                                      {q.explanation}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="pt-2 flex gap-3">
                              <button
                                onClick={() => {
                                  setSelectedAnswers({});
                                  setIsQuizSubmitted(false);
                                  setCurrentQuizIndex(0);
                                }}
                                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                              >
                                Re-attempt Same Quiz
                              </button>
                              <button
                                onClick={() => handleGenerateQuiz()}
                                className="flex-1 py-2.5 rounded-xl bg-[#0d3b66] hover:bg-[#146c94] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Generate Fresh Quiz</span>
                              </button>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: ASK DOUBTS (CHAT) */}
          {/* ======================================================== */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[65vh]">
              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-[#0d3b66] text-white flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-[#ffd166]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#146c94] text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                      <span className={`text-[10px] mt-1.5 block ${msg.role === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex gap-2.5 items-center text-xs text-slate-500 italic p-2">
                    <div className="w-6 h-6 rounded-lg bg-[#0d3b66] text-[#ffd166] flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <span>JKSSB Mentor is typing your answer...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick suggestions when few messages */}
              {chatMessages.length <= 2 && (
                <div className="py-2">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Frequently Asked Doubts:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Mnemonic for Rivers of Kashmir',
                      'Article 370 Timeline summary',
                      'How to manage negative marking?',
                      'Difference between Sadar-i-Riyasat and Governor',
                    ].map((doubt) => (
                      <button
                        key={doubt}
                        onClick={() => {
                          setChatInput(doubt);
                        }}
                        className="px-2 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-slate-900 hover:border-slate-300 cursor-pointer"
                      >
                        {doubt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything about JKSSB syllabus, tips, or doubts..."
                  className="flex-1 text-xs px-3.5 py-2.5 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#146c94]/30 focus:border-[#146c94]"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-2.5 bg-[#0d3b66] hover:bg-[#146c94] text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-xs shrink-0"
                  title="Send Question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
