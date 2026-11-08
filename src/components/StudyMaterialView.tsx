import React, { useState, useMemo } from 'react';
import { NavTab, SubjectCategory, AIMentorRequest } from '../types/index.ts';
import { 
  CATEGORIES, 
  TARGET_POSTS, 
  SUBJECTS_DATA 
} from '../data/studyMaterialData.ts';
import { matchesQuery } from '../utils/testEngine.ts';
import { 
  Search, 
  AlertTriangle, 
  BookMarked, 
  ArrowRight, 
  Check, 
  Sparkles, 
  X,
  Layers,
  ChevronRight,
  Bot
} from 'lucide-react';

interface StudyMaterialViewProps {
  initialSearchQuery?: string;
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

export const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({
  initialSearchQuery = '',
  onNavigate,
  onOpenMentor,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeCategory, setActiveCategory] = useState<SubjectCategory>('All Subjects');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Selected post object for highlighting
  const activePost = useMemo(() => {
    return TARGET_POSTS.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  // Filter subjects and topics based on search query, category, and selected post
  const filteredSubjects = useMemo(() => {
    return SUBJECTS_DATA.map((subject) => {
      // Check if subject matches category filter
      const categoryMatches = 
        activeCategory === 'All Subjects' || subject.category === activeCategory;

      // Filter topics based on search query
      const matchingTopics = subject.topics.filter((topic) => {
        if (!searchQuery.trim()) return true;
        return (
          matchesQuery(topic.title, searchQuery) ||
          matchesQuery(topic.tag, searchQuery) ||
          matchesQuery(subject.title, searchQuery)
        );
      });

      const hasMatchingTopics = matchingTopics.length > 0;
      const isRelevantForPost = !activePost || activePost.relevantSubjectIds.includes(subject.id);

      return {
        ...subject,
        topics: matchingTopics,
        categoryMatches,
        hasMatchingTopics,
        isRelevantForPost,
      };
    }).filter((subject) => {
      // Must match category (or has explicit search results) and have matching topics if searching
      if (searchQuery.trim()) {
        return subject.hasMatchingTopics;
      }
      return subject.categoryMatches;
    });
  }, [searchQuery, activeCategory, activePost]);

  const handleTopicClick = (
    topic: { id: string; readerChapterId?: string; title: string },
    subject: { title: string; category: string }
  ) => {
    onNavigate('chapter-reader', {
      chapterId: topic.readerChapterId || topic.id,
      topicTitle: topic.title,
      subjectTitle: subject.title,
      category: subject.category,
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] p-6 sm:p-10 md:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xs">
            <span>📚 JKSSB Study Material Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Study Smarter with <span className="text-[#ffd166]">Topic-Wise Notes</span>
          </h1>
          <p className="text-slate-100 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Comprehensive notes, historical chronicles, high-yield J&K special points, and revision summaries verified against current JKSSB syllabus patterns.
          </p>
        </div>
      </section>

      {/* 2. PREPARATION NOTE BANNER */}
      <section className="rounded-2xl border border-amber-300 bg-amber-50/90 p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-900 space-y-1">
          <div className="font-bold text-amber-950 flex items-center gap-2">
            <span>Aspirant Guidance & Syllabus Verification Advisory</span>
          </div>
          <p className="leading-relaxed">
            Always verify specific marks distributions and sub-topics against the latest official recruitment advertisement notification issued by the Jammu and Kashmir Services Selection Board (JKSSB). Our curriculum is regularly updated to reflect recent notification amendments.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE SEARCH & CATEGORY FILTER CONTROLS */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Real-time search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a topic... e.g. Article 370, Tenses, Percentage, J&K Rivers, Dogra Rule, Double Entry"
            className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#146c94] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#0d3b66] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. "PREPARE FOR YOUR TARGET POST" INTERACTIVE SELECTOR GRID */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d3b66]">
              Prepare for Your Target Post
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select your examination post to highlight the required subjects and high-weightage topics below
            </p>
          </div>
          {selectedPostId && (
            <button
              onClick={() => setSelectedPostId(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline self-start sm:self-auto cursor-pointer"
            >
              Clear Post Selection
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TARGET_POSTS.map((post) => {
            const isSelected = selectedPostId === post.id;
            return (
              <button
                key={post.id}
                onClick={() => setSelectedPostId(isSelected ? null : post.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d3b66] border-[#0d3b66] text-white shadow-md -translate-y-0.5'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                <span className="text-2xl shrink-0">{post.icon}</span>
                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {post.title}
                  </div>
                  <div className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {post.department}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. SUBJECT CARDS GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d3b66]">
            Subject Notes & Topic Library
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredSubjects.length} Subject Modules
          </span>
        </div>

        {filteredSubjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching topics found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or reset the category filter to &quot;All Subjects&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Subjects');
                setSelectedPostId(null);
              }}
              className="px-4 py-2 bg-[#146c94] text-white text-xs font-semibold rounded-lg hover:bg-[#0d3b66] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSubjects.map((subject) => {
              const isHighlighted = activePost && activePost.relevantSubjectIds.includes(subject.id);
              
              return (
                <div
                  key={subject.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                    isHighlighted
                      ? 'border-[#146c94] ring-2 ring-[#146c94]/20 shadow-md'
                      : 'border-slate-200 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Subject Header */}
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-2xs border border-slate-200/60">
                        {subject.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-[#0d3b66]">
                            {subject.title}
                          </h3>
                          {isHighlighted && (
                            <span className="px-2 py-0.5 rounded-md bg-[#146c94] text-white text-[10px] font-bold tracking-wide">
                              TARGET POST SUBJECT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {subject.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Topics List */}
                  <div className="p-4 space-y-1.5 flex-1 max-h-96 overflow-y-auto">
                    {subject.topics.map((topic) => {
                      const hasReader = !!topic.readerChapterId;
                      return (
                        <div
                          key={topic.id}
                          onClick={() => handleTopicClick(topic, subject)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <BookMarked className={`w-4 h-4 shrink-0 transition-colors ${hasReader ? 'text-[#146c94]' : 'text-slate-400 group-hover:text-[#146c94]'}`} />
                            <span className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-[#146c94] truncate">
                              {topic.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-[#146c94] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 group-hover:bg-[#146c94] group-hover:text-white transition-colors">
                              📖 Read Chapter
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenMentor?.({
                                  mode: 'explain',
                                  topic: topic.title,
                                  context: `Subject: ${subject.title} - Category: ${subject.category}`,
                                });
                              }}
                              className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0d3b66] text-[10px] font-bold flex items-center gap-1 border border-blue-200 transition-colors cursor-pointer"
                              title="Ask AI Mentor for explanation and mnemonic"
                            >
                              <Bot className="w-3 h-3 text-[#146c94]" />
                              <span>AI Explain</span>
                            </button>
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {topic.tag}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#146c94] group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Subject Footer Actions */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {subject.topics.length} topics available
                    </span>
                    {subject.id === 'jk-gk' ? (
                      <button
                        onClick={() => onNavigate('chapter-reader')}
                        className="font-semibold text-[#146c94] hover:text-[#0d3b66] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open J&K Chapter Reader</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('mock-test', { searchQuery: subject.title })}
                        className="font-semibold text-[#146c94] hover:text-[#0d3b66] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice Subject Test</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
