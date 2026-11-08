import { Chapter } from '../types/index.ts';
import { HISTORY_CHAPTER } from './chapters/historyData.ts';
import { FLORA_FAUNA_CHAPTER } from './chapters/floraFaunaData.ts';
import { RIVERS_LAKES_CHAPTER } from './chapters/riversLakesData.ts';

export const CHAPTERS_DATA: Chapter[] = [
  HISTORY_CHAPTER,
  FLORA_FAUNA_CHAPTER,
  RIVERS_LAKES_CHAPTER,
];
