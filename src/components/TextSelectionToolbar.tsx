import React, { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { AIMentorRequest } from '../types';

interface TextSelectionToolbarProps {
  onOpenMentor: (req: AIMentorRequest) => void;
}

export const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({ onOpenMentor }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        // Selection is cleared
        setPosition(null);
        setSelectedText('');
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 5) {
        setPosition(null);
        setSelectedText('');
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Ensure rect has meaningful dimensions and is in viewport
        if (rect.width > 0 && rect.height > 0) {
          setPosition({
            x: Math.max(10, Math.min(window.innerWidth - 180, rect.left + rect.width / 2 - 80)),
            y: Math.max(10, rect.top - 45 + window.scrollY),
          });
          setSelectedText(text);
        }
      } catch (err) {
        setPosition(null);
      }
    };

    const handleMouseUp = () => {
      // Small timeout to let selection settle
      setTimeout(handleSelectionChange, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // If clicking inside the floating toolbar, do not clear
      const target = e.target as HTMLElement;
      if (target.closest('#selection-mentor-pill')) return;
      setPosition(null);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  if (!position || !selectedText) return null;

  return (
    <div
      id="selection-mentor-pill"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 60,
      }}
      className="animate-in fade-in zoom-in-95 duration-150"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenMentor({
            mode: 'explain',
            context: selectedText,
            topic: selectedText.length > 50 ? `${selectedText.slice(0, 50)}...` : selectedText,
          });
          setPosition(null);
        }}
        className="px-3 py-1.5 rounded-full bg-[#0d3b66] hover:bg-[#146c94] text-white text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <Bot className="w-3.5 h-3.5 text-[#ffd166]" />
        <span>Ask AI Mentor</span>
        <Sparkles className="w-3 h-3 text-[#ffd166]" />
      </button>
    </div>
  );
};
