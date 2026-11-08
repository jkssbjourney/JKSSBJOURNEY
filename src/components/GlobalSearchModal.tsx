import React, { useState, useEffect, useRef } from 'react';
import { NavTab } from '../types/index.ts';
import { SUBJECTS_DATA } from '../data/studyMaterialData.ts';
import { CHAPTERS_DATA } from '../data/chapterReaderData.ts';
import { SYLLABUS_DATA } from '../data/syllabusData.ts';
import { EXAM_CALENDAR_DATA } from '../data/calendarData.ts';
import { matchesQuery } from '../utils/testEngine.ts';
import { Search, X, BookOpen, BookMarked, FileText, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

interface SearchResultItem {
  id: string;
  type: 'topic' | 'chapter' | 'syllabus' | 'calendar';
  title: string;
  subtitle: string;
  badge: string;
  action: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by parent or opened
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: SearchResultItem[] = [];

  if (query.trim().length > 1) {
    // 1. Chapters
    CHAPTERS_DATA.forEach((ch) => {
      if (matchesQuery(ch.title, query) || matchesQuery(ch.summary, query)) {
        results.push({
          id: `ch-${ch.id}`,
          type: 'chapter',
          title: ch.title,
          subtitle: `${ch.category} · ${ch.readTime}`,
          badge: 'Interactive Chapter',
          action: () => {
            onNavigate('chapter-reader', { chapterId: ch.id });
            onClose();
          },
        });
      }
    });

    // 2. Study Topics
    SUBJECTS_DATA.forEach((subject) => {
      subject.topics.forEach((topic) => {
        if (matchesQuery(topic.title, query) || matchesQuery(subject.title, query)) {
          results.push({
            id: `top-${topic.id}`,
            type: 'topic',
            title: topic.title,
            subtitle: `${subject.title} (${topic.tag})`,
            badge: 'Study Note',
            action: () => {
              onNavigate('chapter-reader', {
                chapterId: topic.readerChapterId || topic.id,
                topicTitle: topic.title,
                subjectTitle: subject.title,
                category: subject.category,
              });
              onClose();
            },
          });
        }
      });
    });

    // 3. Syllabus
    SYLLABUS_DATA.forEach((syl) => {
      if (matchesQuery(syl.title, query) || matchesQuery(syl.department, query)) {
        results.push({
          id: `syl-${syl.id}`,
          type: 'syllabus',
          title: `${syl.title} Syllabus`,
          subtitle: `${syl.department} · ${syl.totalMarks} Marks (${syl.durationMinutes} mins)`,
          badge: 'Official Syllabus',
          action: () => {
            onNavigate('syllabus', { syllabusId: syl.id });
            onClose();
          },
        });
      }
    });

    // 4. Calendar Events
    EXAM_CALENDAR_DATA.forEach((cal) => {
      if (matchesQuery(cal.postName, query) || matchesQuery(cal.department, query) || matchesQuery(cal.month, query)) {
        results.push({
          id: `cal-${cal.id}`,
          type: 'calendar',
          title: cal.postName,
          subtitle: `Scheduled: ${cal.tentativeDate} (${cal.type}) · ${cal.status}`,
          badge: 'Exam Date',
          action: () => {
            onNavigate('calendar', { searchQuery: cal.postName });
            onClose();
          },
        });
      }
    });
  }

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'chapter':
        return <BookMarked className="w-4 h-4 text-[#146c94]" />;
      case 'topic':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'syllabus':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'calendar':
        return <CalendarIcon className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 flex items-center px-4 py-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, J&K chapters, syllabus, or exam dates... (e.g. Article 370, FAA, Rivers)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-white border border-slate-200 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3">
          {query.trim().length <= 1 ? (
            <div className="py-8 px-4 text-center">
              <p className="text-sm font-medium text-slate-600">
                Type 2 or more characters to search instantly across JKSSB resources
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['J&K Rivers', 'Article 370', 'Accounts Assistant', 'Dogra Rule', 'Sub-Inspector', 'Hangul'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p className="text-sm">No results found for &ldquo;<span className="font-semibold text-slate-700">{query}</span>&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like &quot;Jhelum&quot;, &quot;FAA&quot;, &quot;Syllabus&quot; or &quot;Calendar&quot;</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Search Results ({results.length})
              </div>
              {results.slice(0, 12).map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100/80 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className="p-2 bg-slate-100 rounded-lg shrink-0 group-hover:bg-white group-hover:shadow-xs transition-all">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-[#146c94] truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#146c94] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Navigate with click or Enter</span>
          <button
            onClick={onClose}
            className="hover:text-slate-800 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
