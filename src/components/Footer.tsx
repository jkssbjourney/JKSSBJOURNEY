import React from 'react';
import { NavTab } from '../types/index.ts';
import { GraduationCap, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0d3b66] text-white border-t border-slate-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#146c94] to-[#19a7ce] flex items-center justify-center text-[#ffd166] shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                JKSSB<span className="text-[#19a7ce] ml-1">JOURNEY</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Your comprehensive exam preparation partner for Jammu and Kashmir Services Selection Board (JKSSB) and other UT competitive examinations.
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 max-w-md">
              <span className="font-bold text-[#ffd166]">Official Disclaimer: </span>
              <span>JKSSB JOURNEY is an independent educational portal. Aspirants should always verify exam schedules and notices against the official portal at </span>
              <a
                href="https://jkssb.nic.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#19a7ce] hover:underline inline-flex items-center gap-0.5 font-semibold"
              >
                <span>jkssb.nic.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#ffd166] uppercase tracking-wider">
              Study Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('study-material')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Study Material Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chapter-reader')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive J&K GK Reader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('syllabus')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Official Syllabus Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  2026 Exam Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mock-test')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mock Test / PYQ Arena
                </button>
              </li>
            </ul>
          </div>

          {/* Important Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#ffd166] uppercase tracking-wider">
              Target Posts
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>Finance Accounts Assistant (FAA)</li>
              <li>Sub-Inspector Executive (J&K Police)</li>
              <li>Sub-Inspector Telecommunication</li>
              <li>Police Constable (Armed / Executive / SDRF)</li>
              <li>Junior Assistant & Stenographer</li>
              <li>Multi Tasking Staff (MTS)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 JKSSB JOURNEY. Built for Jammu & Kashmir Aspirants.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with dedication for competitive excellence</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
