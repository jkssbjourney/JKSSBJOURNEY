import React, { useState } from 'react';
import { NavTab } from '../types/index.ts';
import { 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  FileText, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Sparkles,
  BookMarked
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'study-material', label: 'Study Material Hub', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-reader', label: 'J&K GK Reader', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'syllabus', label: 'Syllabus Library', icon: <FileText className="w-4 h-4" /> },
    { id: 'calendar', label: 'Exam Calendar', icon: <CalendarIcon className="w-4 h-4" /> },
    { id: 'mock-test', label: 'Mock Arena', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146c94] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] flex items-center justify-center text-white shadow-sm shadow-[#146c94]/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-[#ffd166]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0d3b66] leading-none">
                JKSSB<span className="text-[#19a7ce] ml-1">JOURNEY</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">
                Your Exam Success Partner
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0d3b66] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0d3b66] hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-[#ffd166]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Search Trigger & Start Test CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Open search"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146c94]"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Quick Search</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-300 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Quick Action Button */}
            <button
              onClick={() => handleTabClick('mock-test')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0d3b66] bg-[#ffd166] hover:bg-[#ffc63a] rounded-lg shadow-xs transition-all duration-150 hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0d3b66]" />
              <span>Practice PYQ</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146c94]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-[#0d3b66] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-[#ffd166]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 text-left"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search All Notes & Exams</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
