import React, { useState } from 'react';
import { NavTab } from '../types/index.ts';
import { 
  BookOpen, 
  FileText, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Trophy, 
  TrendingUp, 
  MessageSquareQuote, 
  ArrowRight, 
  Check, 
  Sparkles,
  Users,
  Award,
  Layers,
  ChevronRight,
  BookMarked
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (
    tab: NavTab, 
    params?: { 
      chapterId?: string; 
      syllabusId?: string; 
      searchQuery?: string;
      topicTitle?: string;
      subjectTitle?: string;
      category?: string;
    }
  ) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenSearch }) => {
  // Interactive Daily GK Question state
  const [dailyQuizSelected, setDailyQuizSelected] = useState<number | null>(null);
  const [dailyQuizSubmitted, setDailyQuizSubmitted] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const dailyQuestion = {
    question: "Under the J&K Reorganisation Act 2019, the High Court of Jammu and Kashmir functions as the Common High Court for:",
    options: [
      "Only the Union Territory of Jammu and Kashmir",
      "UT of Jammu & Kashmir and UT of Ladakh",
      "UT of Jammu & Kashmir and Himachal Pradesh",
      "UT of Jammu & Kashmir and Punjab",
    ],
    correctIndex: 1,
    explanation: "Section 75 of the Jammu and Kashmir Reorganisation Act, 2019 designates the High Court of Jammu and Kashmir as the Common High Court for both the Union Territory of Jammu & Kashmir and the Union Territory of Ladakh.",
  };

  const notificationsList = [
    { id: 1, title: "Exam Calendar for Various Posts Released for 2026", date: "Just Now", tag: "Calendar", type: "urgent" },
    { id: 2, title: "Junior Stenographer Skill Test / Admit Card Released", date: "Today", tag: "Admit Card", type: "new" },
    { id: 3, title: "Conduct of PST/PET for Forest, Ecology and Environment Dept", date: "Yesterday", tag: "Physical Test", type: "info" },
    { id: 4, title: "Revised Syllabus released for Sub-Inspector and Police Constables", date: "2 days ago", tag: "Syllabus", type: "new" },
    { id: 5, title: "Finance Accounts Assistant (FAA) Examination Date Schedule Announced", date: "3 days ago", tag: "Exam Date", type: "info" },
  ];

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] p-6 sm:p-10 md:p-14 lg:p-16">
        {/* Decorative background subtle glow or shapes */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-[#ffd166]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Translucent pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xs">
            <span>🎯 Your JKSSB Success Partner</span>
          </div>

          {/* Bold headline with gold highlight */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
            Crack JKSSB Exams with <span className="text-[#ffd166] underline decoration-wavy decoration-[#ffd166]/40 underline-offset-8">Confidence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Study material, previous year papers, mock tests, syllabus & exam calendar — everything you need, in one place.
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => onNavigate('mock-test')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0d3b66] bg-[#ffd166] hover:bg-[#ffc73b] shadow-lg shadow-[#0d3b66]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 Start a Mock Test</span>
              <ArrowRight className="w-4 h-4 text-[#0d3b66]" />
            </button>

            <button
              onClick={() => onNavigate('study-material')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 hover:border-white/50 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#ffd166]" />
              <span>📚 Browse Study Material</span>
            </button>
          </div>

          {/* Trust badges row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-200">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#ffd166]" /> Standard JKSSB Negative Marking (-0.25)
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#ffd166]" /> Verified Post-Wise Syllabi
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#ffd166]" /> Authentic 2026 Exam Schedule
            </span>
          </div>
        </div>
      </section>

      {/* 2. LIVE NOTIFICATION TICKER */}
      <section className="rounded-xl border border-amber-200 bg-[#fff4e0] px-3 sm:px-4 py-2.5 flex items-center shadow-xs overflow-hidden">
        {/* Orange LATEST Badge */}
        <button 
          onClick={() => setNotificationModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 text-white font-bold text-xs tracking-wide shrink-0 shadow-xs hover:bg-orange-700 transition-colors cursor-pointer"
        >
          <span>📢 LATEST</span>
        </button>

        {/* Marquee Content */}
        <div className="overflow-hidden relative w-full ml-3 py-0.5">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-8">
            <span 
              onClick={() => onNavigate('calendar')} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              📅 Exam Calendar for Various Posts Released
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => setNotificationModalOpen(true)} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              📄 Junior Stenographer Admit Card Released
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => onNavigate('calendar')} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              🏃 Conduct of PST/PET for Forest, Ecology and Environment Department
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => onNavigate('syllabus')} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              📋 New Syllabus released for various posts
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => onNavigate('calendar')} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              💰 Accounts Assistant FAA on Nov 15 & Police SI on Nov 29
            </span>
            
            {/* Duplicated for seamless infinite loop */}
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => onNavigate('calendar')} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              📅 Exam Calendar for Various Posts Released
            </span>
            <span className="text-amber-400 font-bold">•</span>
            <span 
              onClick={() => setNotificationModalOpen(true)} 
              className="cursor-pointer hover:underline flex items-center gap-1"
            >
              📄 Junior Stenographer Admit Card Released
            </span>
          </div>
        </div>
      </section>

      {/* 3. ANIMATED STATS COUNTER ROW */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { count: "12,000+", label: "Students Preparing", icon: <Users className="w-5 h-5 text-[#146c94]" />, bg: "bg-blue-50" },
          { count: "850+", label: "Mock Tests & Quizzes", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50" },
          { count: "300+", label: "Previous Papers & Notes", icon: <Layers className="w-5 h-5 text-[#0d3b66]" />, bg: "bg-slate-100" },
          { count: "25+", label: "Post Categories Covered", icon: <Award className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg} shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#0d3b66] font-mono tracking-tight">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. QUICK ACCESS GRID (6 INTERACTIVE CARDS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#146c94] uppercase tracking-wider">Everything you need</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b66] tracking-tight">
              Quick Access Hub
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Click any section below to jump directly into your preparation module
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Study Material */}
          <div
            onClick={() => onNavigate('study-material')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#146c94] flex items-center justify-center group-hover:bg-[#146c94] group-hover:text-white transition-colors duration-200">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#146c94] transition-colors">
                📚 Study Material
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Subject-wise curated notes for J&K GK, Reasoning, Mathematics, English, General Science & Accounts.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#146c94]">
              <span>Explore 12+ Subjects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Previous Papers */}
          <div
            onClick={() => onNavigate('mock-test')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                📝 Previous Papers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Year-wise & post-wise question papers with official answer keys and step-by-step verified solutions.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>Solve PYQ Arena</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Mock Tests */}
          <div
            onClick={() => onNavigate('mock-test')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                ⏱️ Mock Tests
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Timed tests matching real JKSSB examination interface with instant scoring and negative marking.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Take Free Mock Test</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Syllabus */}
          <div
            onClick={() => onNavigate('syllabus')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                📋 Syllabus Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Post-wise topic breakdowns, section marks weightage, selection criteria and exam patterns.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>View All 6+ Syllabi</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Notifications */}
          <div
            onClick={() => setNotificationModalOpen(true)}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                🔔 Notifications & Updates
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Latest updates on admit cards, answer keys, results, press releases and recruitment notifications.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-red-600">
              <span>View Live Board Notice</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Exam Calendar */}
          <div
            onClick={() => onNavigate('calendar')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:bg-[#19a7ce] group-hover:text-white transition-colors duration-200">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#19a7ce] transition-colors">
                📅 Exam Calendar 2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Track exam dates, physical endurance test schedules, and upcoming deadlines through December 2026.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#19a7ce]">
              <span>View Full Schedule</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. "WHY STUDENTS LOVE US" 4-COLUMN FEATURE GRID */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#146c94] uppercase tracking-wider">Features Built for Success</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b66] tracking-tight">
            Why Students Love JKSSB JOURNEY
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Interactive learning tools designed specifically to boost speed, accuracy, and retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature 1: Daily GK Quiz with Interactive Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                🔥 Daily GK Quiz
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test your knowledge with today’s featured question. Click an option to check!
              </p>
            </div>

            {/* Micro Quiz Widget */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-2.5">
              <div className="font-semibold text-slate-800 line-clamp-2">
                {dailyQuestion.question}
              </div>
              <div className="space-y-1.5">
                {dailyQuestion.options.map((opt, idx) => {
                  let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                  if (dailyQuizSubmitted) {
                    if (idx === dailyQuestion.correctIndex) {
                      btnStyle = "bg-emerald-500 text-white border-emerald-500 font-bold";
                    } else if (dailyQuizSelected === idx) {
                      btnStyle = "bg-red-500 text-white border-red-500";
                    }
                  } else if (dailyQuizSelected === idx) {
                    btnStyle = "bg-blue-100 border-[#146c94] text-[#0d3b66] font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={dailyQuizSubmitted}
                      onClick={() => {
                        setDailyQuizSelected(idx);
                        setDailyQuizSubmitted(true);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] transition-colors ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {dailyQuizSubmitted && (
                <div className="mt-2 text-[11px] p-2 bg-blue-50 text-[#0d3b66] rounded-lg border border-blue-100">
                  <div className="font-bold">
                    {dailyQuizSelected === dailyQuestion.correctIndex ? '✅ Correct Answer!' : '❌ Incorrect!'}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-1">
                    {dailyQuestion.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature 2: Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                🏆 Leaderboard
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Benchmark your scores against top J&K aspirants in real-time.
              </p>
            </div>

            {/* Leaderboard snapshot */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-2">
              <div className="text-[11px] font-semibold text-slate-500 flex justify-between">
                <span>Top Scorers (FAA Mock)</span>
                <span>Score</span>
              </div>
              {[
                { rank: 1, name: "Irfan Lone (Anantnag)", score: "14.25 / 15", medal: "🥇" },
                { rank: 2, name: "Pooja Sharma (Jammu)", score: "13.75 / 15", medal: "🥈" },
                { rank: 3, name: "Zubair Ahmad (Baramulla)", score: "13.50 / 15", medal: "🥉" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{user.medal}</span>
                    <span className="font-semibold text-slate-800 truncate">{user.name}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 shrink-0 ml-1">{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 3: Progress Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#146c94] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                📈 Progress Tracker
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluate your syllabus readiness across all sections before D-Day.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>J&K Special GK</span>
                  <span className="text-[#146c94]">82%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#146c94] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>General English & Vocab</span>
                  <span className="text-emerald-600">75%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Reasoning & Quantitative</span>
                  <span className="text-amber-600">68%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Doubt Forum */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                💬 Doubt Forum
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with fellow aspirants to clarify tricky concepts and exam doubts.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs space-y-2">
              <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-[10px] text-[#146c94] font-semibold">Q: Article 370 Timeline?</div>
                <div className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                  &quot;What is the exact date when the Reorganisation Act came into force?&quot;
                </div>
                <div className="text-[9px] text-slate-400 mt-1 flex justify-between">
                  <span>Answered: 31 Oct 2019</span>
                  <span>14 Replies</span>
                </div>
              </div>
              <button
                onClick={onOpenSearch}
                className="w-full py-1 text-center text-xs font-semibold text-[#146c94] hover:text-[#0d3b66] transition-colors"
              >
                Search Community Doubts →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl bg-gradient-to-r from-[#0d3b66] via-[#146c94] to-[#19a7ce] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your Success Journey?
          </h2>
          <p className="text-slate-100 text-xs sm:text-base leading-relaxed">
            Join thousands of Jammu & Kashmir aspirants studying topic-wise notes, attempting authentic mock tests, and tracking their exam calendar.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('mock-test')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0d3b66] bg-[#ffd166] hover:bg-[#ffc63a] shadow-lg shadow-[#0d3b66]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started — It&apos;s Free</span>
              <ArrowRight className="w-4 h-4 text-[#0d3b66]" />
            </button>
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS MODAL */}
      {notificationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📢</span>
                <h3 className="font-bold text-lg text-[#0d3b66]">Latest JKSSB Board Notices</h3>
              </div>
              <button
                onClick={() => setNotificationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {notificationsList.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full text-[10px]">
                      {n.tag}
                    </span>
                    <span className="text-slate-400 text-[10px]">{n.date}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900">
                    {n.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
              <span>Source: Official JKSSB Portal notices</span>
              <button
                onClick={() => setNotificationModalOpen(false)}
                className="px-4 py-2 bg-[#0d3b66] text-white rounded-lg font-semibold hover:bg-[#146c94] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
