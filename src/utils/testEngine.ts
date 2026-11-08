import { TestSubmission } from '../types/index.ts';

/**
 * Calculates test performance metrics for JKSSB standard negative marking
 * (+1.00 mark for correct answer, -0.25 mark penalty for incorrect answer, 0 for unattempted)
 */
export function calculateTestScore(
  answers: Record<string, number>, // questionId -> selectedOptionIndex
  questions: Array<{ id: string; correctIndex: number }>,
  timeSpentSeconds: number
): TestSubmission {
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    if (selected === undefined || selected === -1) {
      unattemptedCount++;
    } else if (selected === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  }

  // Raw score with 0.25 negative marking
  const rawScore = correctCount * 1.0 - incorrectCount * 0.25;
  const score = Math.max(-50, Math.round(rawScore * 100) / 100);

  const attempted = correctCount + incorrectCount;
  const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;

  return {
    score,
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracy,
    timeSpentSeconds,
  };
}

/**
 * Formats seconds into MM:SS format for timers
 */
export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Normalizes search text for case-insensitive token matching
 */
export function matchesQuery(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const tokens = query.toLowerCase().trim().split(/\s+/);
  const normalizedText = text.toLowerCase();
  return tokens.every((token) => normalizedText.includes(token));
}
