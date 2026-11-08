import { Chapter } from '../types/index.ts';
import { CHAPTERS_DATA } from '../data/chapterReaderData.ts';

const STORAGE_KEY = 'jkssb_dynamic_chapters_v1';

export function slugifyTopic(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStoredChapters(): Record<string, Chapter> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading stored chapters from localStorage:', err);
    return {};
  }
}

export function getChapterById(idOrSlug: string): Chapter | undefined {
  // 1. Check static J&K GK chapters first
  const staticChapter = CHAPTERS_DATA.find((c) => c.id === idOrSlug);
  if (staticChapter) return staticChapter;

  // 2. Check stored chapters
  const stored = getStoredChapters();
  if (stored[idOrSlug]) return stored[idOrSlug];

  // Try matching by slug
  const slug = slugifyTopic(idOrSlug);
  if (stored[slug]) return stored[slug];

  // Try matching by title or shortTitle
  const foundByTitle = Object.values(stored).find(
    (c) =>
      slugifyTopic(c.title) === slug ||
      slugifyTopic(c.shortTitle) === slug ||
      c.id === idOrSlug
  );
  if (foundByTitle) return foundByTitle;

  return undefined;
}

export function saveChapter(chapter: Chapter): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = getStoredChapters();
    const chapterToSave: Chapter = {
      ...chapter,
      isDynamic: true,
      generatedAt: chapter.generatedAt || new Date().toISOString(),
    };
    stored[chapter.id] = chapterToSave;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (err) {
    console.error('Error saving chapter to localStorage:', err);
  }
}

export function getAllAvailableChapters(): Chapter[] {
  const stored = getStoredChapters();
  const dynamicList = Object.values(stored);
  return [...CHAPTERS_DATA, ...dynamicList];
}
