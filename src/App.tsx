import React, { useState, useEffect } from 'react';
import { NavTab, AIMentorRequest } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { HomeView } from './components/HomeView.tsx';
import { StudyMaterialView } from './components/StudyMaterialView.tsx';
import { ChapterReaderView } from './components/ChapterReaderView.tsx';
import { SyllabusView } from './components/SyllabusView.tsx';
import { CalendarView } from './components/CalendarView.tsx';
import { MockTestView } from './components/MockTestView.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { Footer } from './components/Footer.tsx';
import { AIMentorDrawer } from './components/AIMentorDrawer.tsx';
import { TextSelectionToolbar } from './components/TextSelectionToolbar.tsx';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // AI Mentor Drawer state
  const [isMentorOpen, setIsMentorOpen] = useState<boolean>(false);
  const [mentorRequest, setMentorRequest] = useState<AIMentorRequest | null>(null);

  const handleOpenMentor = (req?: AIMentorRequest) => {
    setMentorRequest(req || { mode: 'chat' });
    setIsMentorOpen(true);
  };

  // Cross-view navigation parameters
  const [activeChapterId, setActiveChapterId] = useState<string | undefined>(undefined);
  const [activeTopicTitle, setActiveTopicTitle] = useState<string | undefined>(undefined);
  const [activeSubjectTitle, setActiveSubjectTitle] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [activeSyllabusId, setActiveSyllabusId] = useState<string | undefined>(undefined);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string | undefined>(undefined);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigate = (
    tab: NavTab,
    params?: {
      chapterId?: string;
      syllabusId?: string;
      searchQuery?: string;
      topicTitle?: string;
      subjectTitle?: string;
      category?: string;
    }
  ) => {
    if (params?.chapterId !== undefined) setActiveChapterId(params.chapterId);
    if (params?.topicTitle !== undefined) setActiveTopicTitle(params.topicTitle);
    if (params?.subjectTitle !== undefined) setActiveSubjectTitle(params.subjectTitle);
    if (params?.category !== undefined) setActiveCategory(params.category);
    if (params?.syllabusId !== undefined) setActiveSyllabusId(params.syllabusId);
    if (params?.searchQuery !== undefined) setActiveSearchQuery(params.searchQuery);
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f8fb] text-slate-800 antialiased font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveSearchQuery(undefined);
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentTab === 'study-material' && (
          <StudyMaterialView
            initialSearchQuery={activeSearchQuery}
            onNavigate={handleNavigate}
            onOpenMentor={handleOpenMentor}
          />
        )}

        {currentTab === 'chapter-reader' && (
          <ChapterReaderView
            initialChapterId={activeChapterId}
            initialTopicTitle={activeTopicTitle}
            initialSubjectTitle={activeSubjectTitle}
            initialCategory={activeCategory}
            onNavigate={handleNavigate}
            onOpenMentor={handleOpenMentor}
          />
        )}

        {currentTab === 'syllabus' && (
          <SyllabusView
            initialSyllabusId={activeSyllabusId}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarView
            initialSearchQuery={activeSearchQuery}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'mock-test' && (
          <MockTestView
            initialSearchQuery={activeSearchQuery}
            onNavigate={handleNavigate}
            onOpenMentor={handleOpenMentor}
          />
        )}
      </main>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating Persistent AI Mentor Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-mentor-btn"
          onClick={() => handleOpenMentor({ mode: 'chat' })}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#0d3b66] via-[#146c94] to-[#19a7ce] hover:from-[#146c94] hover:to-[#0d3b66] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border border-white/25 active:scale-95"
          aria-label="Ask JKSSB AI Mentor"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd166] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffd166]"></span>
          </span>
          <Bot className="w-5 h-5 text-[#ffd166] group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm font-bold tracking-tight">Ask JKSSB AI Mentor</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white">
            Gemini
          </span>
        </button>
      </div>

      {/* Global Text Selection Listener Tool */}
      <TextSelectionToolbar onOpenMentor={handleOpenMentor} />

      {/* AI Mentor Assistant Drawer */}
      <AIMentorDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        initialRequest={mentorRequest}
      />

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveSearchQuery(undefined);
        setCurrentTab(tab);
      }} />
    </div>
  );
}
