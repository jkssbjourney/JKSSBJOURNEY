import React, { useState, useMemo } from 'react';
import { NavTab, CalendarEvent } from '../types/index.ts';
import { EXAM_CALENDAR_DATA } from '../data/calendarData.ts';
import { matchesQuery } from '../utils/testEngine.ts';
import { 
  Calendar as CalendarIcon, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Copy, 
  Check, 
  BellRing, 
  Filter,
  X
} from 'lucide-react';

interface CalendarViewProps {
  initialSearchQuery?: string;
  onNavigate: (tab: NavTab, params?: { chapterId?: string; syllabusId?: string; searchQuery?: string }) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialSearchQuery = '',
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const months = ['All', 'September 2026', 'October 2026', 'November 2026', 'December 2026'];

  const handleCopyDate = (event: CalendarEvent) => {
    const text = `${event.postName} (${event.department}) - Exam Date: ${event.tentativeDate} [${event.type}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return EXAM_CALENDAR_DATA.filter((item) => {
      const matchMonth = selectedMonth === 'All' || item.month === selectedMonth;
      const matchSearch = 
        !searchQuery.trim() ||
        matchesQuery(item.postName, searchQuery) ||
        matchesQuery(item.department, searchQuery) ||
        matchesQuery(item.advtNumber, searchQuery) ||
        matchesQuery(item.type, searchQuery);

      return matchMonth && matchSearch;
    });
  }, [selectedMonth, searchQuery]);

  // Group filtered events by month
  const groupedByMonth = useMemo(() => {
    const groups: Record<string, CalendarEvent[]> = {};
    filteredEvents.forEach((ev) => {
      if (!groups[ev.month]) {
        groups[ev.month] = [];
      }
      groups[ev.month].push(ev);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#0d3b66] via-[#146c94] to-[#19a7ce] p-6 sm:p-10 md:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xs">
            <span>📅 Official Schedule</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            JKSSB Exam Calendar <span className="text-[#ffd166]">2026</span>
          </h1>
          <p className="text-slate-100 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Consolidated examination calendar for Health & Medical Education, Police Executive, Police Armed, SDRF, Telecommunication, and Finance Cadres.
          </p>
        </div>
      </section>

      {/* 2. WARNING TICKER BANNER */}
      <section className="rounded-2xl border border-amber-300 bg-amber-50/95 p-4 shadow-xs flex items-center gap-3">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-950 font-medium">
          <span className="font-bold">⚠️ NOTE: </span>
          <span>These exam dates are tentative and subject to change • Keep checking the official JKSSB portal (jkssb.nic.in) for final venue notifications and admit card releases.</span>
        </div>
      </section>

      {/* 3. SEARCH & MONTH FILTER BAR */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by post or department (e.g. Accounts Assistant, Sub-Inspector)..."
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

          <div className="text-xs text-slate-500 font-medium self-end sm:self-auto">
            Showing <span className="font-bold text-[#0d3b66]">{filteredEvents.length}</span> scheduled events
          </div>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Month:
          </span>
          {months.map((m) => {
            const isActive = selectedMonth === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#0d3b66] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. SCHEDULE TABLE / CARDS GROUPED BY MONTH */}
      <section className="space-y-8">
        {Object.keys(groupedByMonth).length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No scheduled exams found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or reset the month filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMonth('All');
              }}
              className="px-4 py-2 bg-[#146c94] text-white text-xs font-semibold rounded-lg hover:bg-[#0d3b66] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          Object.entries(groupedByMonth).map(([monthName, events]) => (
            <div key={monthName} className="space-y-4">
              {/* Month Header Banner */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-7 bg-[#146c94] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d3b66]">
                  {monthName}
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {events.length} Exams
                </span>
              </div>

              {/* Table for Desktop & Cards for Mobile */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                        <th className="py-3.5 px-4 sm:px-6">Post Name & Advertisement</th>
                        <th className="py-3.5 px-4 sm:px-6">Department</th>
                        <th className="py-3.5 px-4 sm:px-6">Exam Date</th>
                        <th className="py-3.5 px-4 sm:px-6">Mode / Format</th>
                        <th className="py-3.5 px-4 sm:px-6">Status</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {events.map((event) => {
                        const isCopied = copiedId === event.id;
                        return (
                          <tr 
                            key={event.id}
                            className="hover:bg-blue-50/30 transition-colors"
                          >
                            {/* Post Name & Advt */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-bold text-slate-900 text-sm sm:text-base">
                                {event.postName}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                {event.advtNumber}
                              </div>
                            </td>

                            {/* Department */}
                            <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs sm:text-sm">
                              {event.department}
                            </td>

                            {/* Date */}
                            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                              <div className="font-mono font-bold text-[#0d3b66] text-xs sm:text-sm flex items-center gap-1.5">
                                <CalendarIcon className="w-3.5 h-3.5 text-[#146c94]" />
                                <span>{event.tentativeDate}</span>
                              </div>
                            </td>

                            {/* Type */}
                            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                {event.type}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                  event.status === 'Confirmed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                <span>{event.status}</span>
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                {event.syllabusId && (
                                  <button
                                    onClick={() => onNavigate('syllabus', { syllabusId: event.syllabusId })}
                                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-[#146c94] hover:bg-slate-50 transition-colors cursor-pointer"
                                    title="View Syllabus"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleCopyDate(event)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                                    isCopied
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                  }`}
                                  title="Copy Exam Details"
                                >
                                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-slate-400" />}
                                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};
