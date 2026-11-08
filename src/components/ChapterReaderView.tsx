import React, { useState, useEffect, useRef } from 'react';
import { NavTab, Chapter, ChapterSection, AIMentorRequest } from '../types/index.ts';
import { CHAPTERS_DATA } from '../data/chapterReaderData.ts';
import { 
  getChapterById, 
  getAllAvailableChapters, 
  saveChapter, 
  slugifyTopic 
} from '../utils/chapterStorage.ts';
import { 
  BookMarked, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  ArrowUp, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  Pin, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  Share2, 
  FileText,
  Search,
  Sparkles,
  Layers,
  Bot,
  RefreshCw,
  Trash2,
  Cpu,
  CheckCircle
} from 'lucide-react';

interface ChapterReaderViewProps {
  initialChapterId?: string;
  initialTopicTitle?: string;
  initialSubjectTitle?: string;
  initialCategory?: string;
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
  onOpenMentor?: (req: AIMentorRequest) => void;
}

export const ChapterReaderView: React.FC<ChapterReaderViewProps> = ({
  initialChapterId,
  initialTopicTitle,
  initialSubjectTitle,
  initialCategory,
  onNavigate,
  onOpenMentor,
}) => {
  // Available chapters: static J&K GK chapters + localStorage dynamic chapters
  const [availableChapters, setAvailableChapters] = useState<Chapter[]>(() => getAllAvailableChapters());

  // Current active chapter ID
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (initialChapterId) return initialChapterId;
    if (initialTopicTitle) return slugifyTopic(initialTopicTitle);
    return CHAPTERS_DATA[0].id;
  });

  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [bookmarkedSections, setBookmarkedSections] = useState<Record<string, boolean>>({});
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  // Dynamic Generation states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(1);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Interactive Quiz Answers state for Practice MCQs
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  // Container refs for scroll spy and progress calculation
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const chipsScrollRef = useRef<HTMLDivElement>(null);

  // Check and load chapter whenever props change
  useEffect(() => {
    const targetIdOrTitle = initialTopicTitle || initialChapterId;
    if (!targetIdOrTitle) return;

    // Check if chapter already exists in static or local storage
    const existing = getChapterById(targetIdOrTitle);
    if (existing) {
      setSelectedChapterId(existing.id);
      setIsGenerating(false);
      setGenerationError(null);
      // Refresh available list in case new chapter was added
      setAvailableChapters(getAllAvailableChapters());
    } else {
      // Not found -> trigger on-the-fly generation!
      generateChapterOnTheFly(
        initialTopicTitle || targetIdOrTitle,
        initialSubjectTitle || 'General Studies',
        initialCategory || 'General'
      );
    }
  }, [initialChapterId, initialTopicTitle]);

  // Function to request dynamic chapter synthesis from backend
  const generateChapterOnTheFly = async (
    topicTitle: string, 
    subjectTitle: string, 
    category: string
  ) => {
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationStep(1);

    // Step progress simulation timer while AI responds
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/mentor/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle,
          subjectTitle,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate chapter (${response.status})`);
      }

      const generatedChapter: Chapter = await response.json();

      // Save to localStorage
      saveChapter(generatedChapter);

      // Update state
      const updatedList = getAllAvailableChapters();
      setAvailableChapters(updatedList);
      setSelectedChapterId(generatedChapter.id);
      setIsGenerating(false);
    } catch (err: any) {
      console.error('Error generating chapter:', err);
      setGenerationError(err?.message || 'Failed to generate chapter. Please retry.');
      setIsGenerating(false);
    } finally {
      clearInterval(stepInterval);
    }
  };

  // Resolve current active chapter object
  const activeChapterIndex = availableChapters.findIndex((c) => c.id === selectedChapterId);
  const activeChapter: Chapter = activeChapterIndex >= 0 
    ? availableChapters[activeChapterIndex] 
    : (availableChapters[0] || CHAPTERS_DATA[0]);

  // Set initial active section when chapter changes
  useEffect(() => {
    if (activeChapter && activeChapter.sections && activeChapter.sections.length > 0) {
      setActiveSectionId(activeChapter.sections[0].id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReadingProgress(0);
    setUserSelectedAnswers({});
    setRevealedExplanations({});
  }, [selectedChapterId, activeChapter?.id]);

  // Reading progress calculation & Back-to-Top visibility & Scroll-spy
  useEffect(() => {
    if (isGenerating || !activeChapter?.sections) return;

    const handleScroll = () => {
      // Back to top threshold
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Reading progress
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalDocHeight) * 100)));
        setReadingProgress(progress);
      }

      // Scroll Spy: Find currently visible section
      const sectionElements = activeChapter.sections
        .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      const scrollPosition = window.scrollY + 180; // Offset for sticky headers
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSectionId(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeChapter, isGenerating]);

  // Keep active chip in view inside the horizontal scrollable chips bar
  useEffect(() => {
    if (!chipsScrollRef.current || !activeSectionId) return;
    const activeChip = chipsScrollRef.current.querySelector(`[data-chip-id="${activeSectionId}"]`) as HTMLElement;
    if (activeChip) {
      const container = chipsScrollRef.current;
      const chipLeft = activeChip.offsetLeft;
      const chipWidth = activeChip.offsetWidth;
      const containerScroll = container.scrollLeft;
      const containerWidth = container.offsetWidth;

      if (chipLeft < containerScroll || chipLeft + chipWidth > containerScroll + containerWidth) {
        container.scrollTo({
          left: chipLeft - containerWidth / 2 + chipWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeSectionId]);

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 150; // offset for sticky navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (secId: string) => {
    setBookmarkedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const toggleChapterComplete = (chId: string) => {
    setCompletedChapters((prev) => ({
      ...prev,
      [chId]: !prev[chId],
    }));
  };

  // Chapter Navigation Handlers
  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      setSelectedChapterId(availableChapters[activeChapterIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (activeChapterIndex < availableChapters.length - 1) {
      setSelectedChapterId(availableChapters[activeChapterIndex + 1].id);
    }
  };

  return (
    <div className="relative pb-24">
      
      {/* 1. TOP BREADCRUMB / HUB RETURN & COMPLETED STATUS */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          onClick={() => onNavigate('study-material')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146c94] hover:text-[#0d3b66] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Study Material Hub</span>
        </button>

        <div className="flex items-center gap-2">
          {activeChapter.isDynamic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-[#146c94] text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#19a7ce]" />
              <span>AI Generated & Locally Cached</span>
            </span>
          )}

          <button
            onClick={() => toggleChapterComplete(activeChapter.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              completedChapters[activeChapter.id]
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completedChapters[activeChapter.id] ? 'Completed ✓' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* 2. STICKY NAVIGATION BAR (Inside Reader) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-8 transition-all">
        
        {/* Top Reading Progress Bar (0% to 100%) */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#146c94] via-[#5886d5] to-[#ffd166] transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Controls Bar: Chapter Switchers & Dropdown */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Chapter Switcher Buttons: Static J&K GK chapters + Dynamically Generated Chapters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full md:max-w-xl">
            {availableChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0d3b66] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title={ch.title}
                >
                  <span>{ch.icon || '📖'}</span>
                  <span>{ch.shortTitle}</span>
                  {ch.isDynamic && (
                    <span className="text-[9px] px-1 py-0.2 bg-[#ffd166] text-[#0d3b66] rounded font-extrabold uppercase">
                      Cached
                    </span>
                  )}
                  {completedChapters[ch.id] && (
                    <span className="text-[10px] w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Jump to Section Dropdown & Progress Readout */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <span className="hidden lg:inline text-xs font-semibold text-slate-500 whitespace-nowrap">
              Progress: <span className="font-mono text-[#0d3b66] font-bold">{readingProgress}%</span>
            </span>

            <div className="relative w-full md:w-72">
              <select
                aria-label="Jump to a section"
                value={activeSectionId}
                onChange={(e) => scrollToSection(e.target.value)}
                disabled={isGenerating}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5886d5] focus:bg-white transition-all cursor-pointer truncate"
              >
                <option value="" disabled>Jump to a section...</option>
                {activeChapter?.sections?.map((sec, idx) => (
                  <option key={sec.id} value={sec.id}>
                    {idx + 1}. {sec.title.replace(/^\d+\.\s*/, '')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Section Chips (Pills with Scroll-Spy Highlight) */}
        {!isGenerating && activeChapter?.sections && (
          <div 
            ref={chipsScrollRef}
            className="px-3.5 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none bg-slate-50/60"
          >
            {activeChapter.sections.map((sec, idx) => {
              const isActive = activeSectionId === sec.id;
              const isBookmarked = !!bookmarkedSections[sec.id];

              return (
                <button
                  key={sec.id}
                  data-chip-id={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#5886d5] text-white shadow-xs font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{idx + 1}</span>
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {sec.title.replace(/^\d+\.\s*/, '')}
                  </span>
                  {isBookmarked && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-300' : 'bg-[#5886d5]'}`} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. GENERATION LOADING STATE (When synthesizing a new chapter) */}
      {isGenerating ? (
        <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-md text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0d3b66] to-[#19a7ce] flex items-center justify-center text-white mx-auto shadow-lg animate-pulse">
            <Bot className="w-9 h-9 text-[#ffd166]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#146c94] text-xs font-extrabold uppercase tracking-wide border border-blue-100">
              JKSSB AI Mentor • On-the-Fly Synthesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b66]">
              Generating Chapter: {initialTopicTitle || 'Selected Topic'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Synthesizing syllabus definitions, comparison tables, high-yield exam points, revision one-liners, and authentic JKSSB MCQs tailored to the examination pattern.
            </p>
          </div>

          {/* Progress Checkpoints */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 max-w-md mx-auto text-left space-y-3">
            <div className="flex items-center gap-3 text-xs">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${generationStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                ✓
              </span>
              <span className={`font-medium ${generationStep >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>
                1. Foundational Core Concepts & Definitions
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${generationStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {generationStep >= 2 ? '✓' : '2'}
              </span>
              <span className={`font-medium ${generationStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>
                2. Structured Timeline & Comparison Data Table
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${generationStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {generationStep >= 3 ? '✓' : '3'}
              </span>
              <span className={`font-medium ${generationStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>
                3. High-Yield 📌 Exam Points & Common Traps
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${generationStep >= 4 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {generationStep >= 4 ? '✓' : '4'}
              </span>
              <span className={`font-medium ${generationStep >= 4 ? 'text-slate-800' : 'text-slate-400'}`}>
                4. 10 Quick Revision One-Liners & 5 Practice MCQs
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#146c94]" />
            <span>Caching in browser localStorage for 0ms instant loading on next visit</span>
          </div>
        </div>
      ) : generationError ? (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center space-y-4 max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-900">Chapter Generation Failed</h3>
          <p className="text-xs text-red-700">{generationError}</p>
          <button
            onClick={() => {
              if (initialTopicTitle) {
                generateChapterOnTheFly(
                  initialTopicTitle,
                  initialSubjectTitle || 'General Studies',
                  initialCategory || 'General'
                );
              }
            }}
            className="px-4 py-2 bg-[#0d3b66] hover:bg-[#146c94] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Retry Chapter Generation
          </button>
        </div>
      ) : (
        <>
          {/* 4. CHAPTER HEADER BANNER */}
          <section className="bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                <span>{activeChapter.icon || '📖'} {activeChapter.category}</span>
                {activeChapter.isDynamic && (
                  <span className="px-1.5 py-0.2 bg-[#ffd166] text-[#0d3b66] text-[10px] font-bold rounded">
                    Auto-Generated
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {activeChapter.title}
              </h1>
              <p className="text-slate-100 text-xs sm:text-sm font-normal leading-relaxed">
                {activeChapter.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-200 pt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#ffd166]" /> {activeChapter.readTime}
                </span>
                <span>•</span>
                <span>{activeChapter.sections.length} Comprehensive Sections</span>
                {activeChapter.generatedAt && (
                  <>
                    <span>•</span>
                    <span className="text-[11px] opacity-80">
                      Saved in Local Cache
                    </span>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* 5. CHAPTER SECTIONS CONTENT STREAM */}
          <div ref={contentContainerRef} className="space-y-8">
            {activeChapter.sections.map((sec, secIdx) => (
              <article
                key={sec.id}
                id={sec.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-200 space-y-6 scroll-mt-36"
              >
                {/* Section H2 Heading with Bottom Border */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <div className="space-y-1">
                    {sec.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#146c94] bg-blue-50 px-2 py-0.5 rounded-md">
                        {sec.badge}
                      </span>
                    )}
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#0d3b66] leading-snug">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Ask AI Mentor button */}
                    <button
                      onClick={() => onOpenMentor?.({
                        mode: 'explain',
                        topic: sec.title,
                        context: `${activeChapter.title} - ${sec.title}. ${sec.content?.[0] || ''}`,
                      })}
                      className="px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#0d3b66] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Ask AI Mentor for explanation and mnemonic"
                    >
                      <Bot className="w-3.5 h-3.5 text-[#146c94]" />
                      <span className="hidden sm:inline">Ask AI Mentor</span>
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => toggleBookmark(sec.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                        bookmarkedSections[sec.id]
                          ? 'bg-blue-50 border-[#5886d5] text-[#5886d5]'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Bookmark this section"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedSections[sec.id] ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Paragraphs */}
                {sec.content && sec.content.length > 0 && (
                  <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-slate-700">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[#5886d5] font-bold mt-1 text-sm">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* RESPONSIVE ZEBRA-STRIPED DATA TABLE WITH BLUE HEADERS (#5886d5) */}
                {sec.table && (
                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    {sec.table.caption && (
                      <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {sec.table.caption}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-[#5886d5] text-white">
                            {sec.table.headers.map((h, hIdx) => (
                              <th 
                                key={hIdx} 
                                className="py-3 px-4 font-bold border-b border-[#4774c2] text-xs uppercase tracking-wider"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr 
                              key={rIdx} 
                              className={rIdx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-[#f8fafc] hover:bg-blue-50/40'}
                            >
                              {row.map((cell, cIdx) => (
                                <td 
                                  key={cIdx} 
                                  className={`py-3 px-4 text-slate-800 leading-relaxed ${cIdx === 0 ? 'font-semibold text-[#0d3b66]' : ''}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUBSECTIONS IF ANY */}
                {sec.subsections && sec.subsections.length > 0 && (
                  <div className="space-y-6 pt-2">
                    {sec.subsections.map((sub, subIdx) => (
                      <div key={subIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <h3 className="text-sm sm:text-base font-bold text-[#0d3b66]">
                          {sub.title}
                        </h3>
                        {sub.paragraphs?.map((sp, spIdx) => (
                          <p key={spIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {sp}
                          </p>
                        ))}
                        {sub.table && (
                          <div className="rounded-lg border border-slate-200 overflow-hidden shadow-2xs mt-2">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-[#5886d5] text-white">
                                  {sub.table.headers.map((sh, shIdx) => (
                                    <th key={shIdx} className="py-2.5 px-3 font-semibold">
                                      {sh}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {sub.table.rows.map((sRow, srIdx) => (
                                  <tr key={srIdx} className={srIdx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                                    {sRow.map((sCell, scIdx) => (
                                      <td key={scIdx} className="py-2.5 px-3 text-slate-800">
                                        {sCell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* CALLOUT COMPONENT 1: "📌 Exam Point" box (Light blue #eef3fc with 5px solid blue left border) */}
                {sec.examPoints && sec.examPoints.length > 0 && (
                  <div className="bg-[#eef3fc] border-l-[5px] border-l-[#5886d5] p-4 rounded-r-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0d3b66] uppercase tracking-wide">
                      <Pin className="w-4 h-4 text-[#5886d5]" />
                      <span>📌 Exam Point</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#0d3b66]">
                      {sec.examPoints.map((ep, epIdx) => (
                        <li key={epIdx} className="flex items-start gap-2">
                          <span className="text-[#5886d5] font-bold mt-0.5">•</span>
                          <span className="leading-relaxed font-medium">{ep}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CALLOUT COMPONENT 2: "Correction / Verification Note" box (Warm gold #fff8e6 with gold border #f5d98b) */}
                {sec.correctionNotes && sec.correctionNotes.length > 0 && (
                  <div className="bg-[#fff8e6] border border-[#f5d98b] p-4 rounded-xl space-y-2 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Correction / Verification Note</span>
                    </div>
                    <div className="space-y-1.5 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {sec.correctionNotes.map((cn, cnIdx) => (
                        <p key={cnIdx}>{cn}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* SAMPLE PYQs / PRACTICE MCQs FOR THIS SECTION */}
                {sec.pyqs && sec.pyqs.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase tracking-wide">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        <span>Practice Questions & Previous Year Questions ({sec.pyqs.length})</span>
                      </div>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        +1.00 / -0.25 Marking
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {sec.pyqs.map((pyq, pIdx) => {
                        const questionKey = `${sec.id}-pyq-${pIdx}`;
                        const isRevealed = revealedExplanations[questionKey];

                        return (
                          <div 
                            key={pIdx} 
                            className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-3 hover:border-purple-300 transition-colors"
                          >
                            <div className="flex items-center justify-between text-[10px] text-purple-700 font-bold">
                              <span>QUESTION #{pIdx + 1}</span>
                              <span className="bg-purple-100 px-2 py-0.5 rounded">{pyq.exam}</span>
                            </div>

                            <div className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                              {pyq.question}
                            </div>

                            <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between">
                              <button
                                onClick={() => {
                                  setRevealedExplanations((prev) => ({
                                    ...prev,
                                    [questionKey]: !prev[questionKey],
                                  }));
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 hover:bg-purple-100 text-purple-900 font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                {isRevealed ? 'Hide Solution' : 'Reveal Answer & Explanation'}
                              </button>

                              <button
                                onClick={() => onOpenMentor?.({
                                  mode: 'explain',
                                  question: pyq.question,
                                  correctAnswer: pyq.answer,
                                  context: `Topic: ${activeChapter.title} - ${sec.title}`,
                                })}
                                className="text-[10px] font-bold text-[#146c94] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Bot className="w-3 h-3" />
                                <span>Explain with AI</span>
                              </button>
                            </div>

                            {isRevealed && (
                              <div className="mt-2 p-3 bg-white rounded-lg border border-purple-200 space-y-1.5 animate-in fade-in slide-in-from-top-1">
                                <div className="text-purple-950 font-bold flex items-start gap-1.5">
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>Answer: {pyq.answer}</span>
                                </div>
                                {pyq.explanation && (
                                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                                    <strong className="text-slate-700">Explanation:</strong> {pyq.explanation}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* 6. PREVIOUS / NEXT CHAPTER NAVIGATION BAR */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {activeChapterIndex > 0 ? (
              <button
                onClick={handlePrevChapter}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {availableChapters[activeChapterIndex - 1].shortTitle}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            <button
              onClick={() => onNavigate('mock-test', { searchQuery: activeChapter.title })}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ffd166] hover:bg-[#ffc63a] text-[#0d3b66] font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice {activeChapter.shortTitle} in Mock Arena</span>
            </button>

            {activeChapterIndex < availableChapters.length - 1 ? (
              <button
                onClick={handleNextChapter}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0d3b66] hover:bg-[#146c94] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Next: {availableChapters[activeChapterIndex + 1].shortTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </>
      )}

      {/* 7. FLOATING "BACK TO TOP" BUTTON (▲) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0d3b66] hover:bg-[#146c94] text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in zoom-in-75"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
