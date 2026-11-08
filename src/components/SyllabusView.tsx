import React, { useState, useMemo, useEffect } from 'react';
import { NavTab, SyllabusPost } from '../types/index.ts';
import { SYLLABUS_DATA } from '../data/syllabusData.ts';
import { matchesQuery } from '../utils/testEngine.ts';
import { 
  FileText, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Award, 
  AlertCircle, 
  BookOpen, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SyllabusViewProps {
  initialSyllabusId?: string;
  onNavigate: (tab: NavTab, params?: { chapterId?: string; syllabusId?: string; searchQuery?: string }) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  initialSyllabusId,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    // By default expand first item or initialSyllabusId
    if (initialSyllabusId) {
      return { [initialSyllabusId]: true };
    }
    return { [SYLLABUS_DATA[0].id]: true };
  });

  useEffect(() => {
    if (initialSyllabusId) {
      setExpandedIds((prev) => ({ ...prev, [initialSyllabusId]: true }));
      setTimeout(() => {
        document.getElementById(`syl-${initialSyllabusId}`)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [initialSyllabusId]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    SYLLABUS_DATA.forEach((s) => (all[s.id] = true));
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return SYLLABUS_DATA;
    return SYLLABUS_DATA.filter((post) => {
      const matchPost = 
        matchesQuery(post.title, searchQuery) ||
        matchesQuery(post.department, searchQuery);
      
      const matchSubjectOrTopic = post.subjects.some((subj) => 
        matchesQuery(subj.name, searchQuery) ||
        subj.topics.some((t) => matchesQuery(t, searchQuery))
      );

      return matchPost || matchSubjectOrTopic;
    });
  }, [searchQuery]);

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] p-6 sm:p-10 md:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xs">
            <span>📋 Official JKSSB Curriculum Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Comprehensive <span className="text-[#ffd166]">Syllabus Library</span>
          </h1>
          <p className="text-slate-100 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Detailed breakdown of post-wise exam patterns, marks allocation, negative marking scheme, and topic-by-topic syllabi approved by the board.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & CONTROLS BAR */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus... e.g. Junior Assistant, Accounts Assistant, SI, Electronics"
            className="w-full pl-12 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#146c94] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expand / Collapse All */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-xs font-semibold text-slate-600">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </section>

      {/* 3. ACCORDION LIST OF POST SYLLABI */}
      <section className="space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No syllabus matches found</h3>
            <p className="text-xs text-slate-500">
              Try searching with another post name or topic keyword.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#146c94] text-white text-xs font-semibold rounded-lg hover:bg-[#0d3b66] transition-colors"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isExpanded = !!expandedIds[post.id];
            return (
              <div
                key={post.id}
                id={`syl-${post.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Accordion Card Header */}
                <div
                  onClick={() => toggleExpand(post.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span className="text-3xl p-2.5 rounded-xl bg-blue-50 border border-slate-200/60 shrink-0">
                      {post.icon}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#0d3b66]">
                          {post.title}
                        </h2>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {post.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                        <span className="flex items-center gap-1 font-semibold text-[#0d3b66]">
                          <Award className="w-3.5 h-3.5 text-amber-500" /> Total Marks: {post.totalMarks}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> Duration: {post.durationMinutes} Minutes
                        </span>
                        <span className="text-red-600 font-medium">
                          {post.negativeMarking}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isExpanded
                          ? 'bg-[#0d3b66] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide Syllabus' : 'View Syllabus'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Accordion Body */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/40 p-5 sm:p-7 space-y-6 animate-in fade-in duration-150">
                    
                    {/* Selection Process Banner */}
                    <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-[#0d3b66] flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-[#146c94] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Selection Process & Exam Scheme: </span>
                        <span>{post.selectionProcess}</span>
                      </div>
                    </div>

                    {/* 2-Column Grid of Subject Cards with Bulleted Topic Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {post.subjects.map((subj, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                                {subj.name}
                              </h3>
                              {subj.marks !== undefined && (
                                <span className="px-2.5 py-0.5 rounded-md bg-[#146c94] text-white text-xs font-mono font-bold shrink-0">
                                  {subj.marks} Marks
                                </span>
                              )}
                            </div>

                            {/* Bulleted Topics */}
                            <ul className="mt-3 space-y-2 text-xs text-slate-600">
                              {subj.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2">
                                  <span className="text-[#146c94] font-bold mt-0.5 shrink-0">•</span>
                                  <span className="leading-relaxed">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <button
                              onClick={() => onNavigate('study-material', { searchQuery: subj.name.split(' ')[0] })}
                              className="text-[11px] font-semibold text-[#146c94] hover:text-[#0d3b66] flex items-center gap-1 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Study Related Notes</span>
                            </button>
                            <button
                              onClick={() => onNavigate('mock-test', { searchQuery: post.title })}
                              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                            >
                              <span>Practice Questions</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
