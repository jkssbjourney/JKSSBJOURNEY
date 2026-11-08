import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTestScore, formatTime, matchesQuery } from './testEngine.ts';

test('calculateTestScore correctly calculates perfect score with zero negative', () => {
  const questions = [
    { id: 'q1', correctIndex: 1 },
    { id: 'q2', correctIndex: 3 },
    { id: 'q3', correctIndex: 0 },
  ];
  const answers = {
    q1: 1,
    q2: 3,
    q3: 0,
  };
  const result = calculateTestScore(answers, questions, 120);
  assert.equal(result.score, 3);
  assert.equal(result.correctCount, 3);
  assert.equal(result.incorrectCount, 0);
  assert.equal(result.unattemptedCount, 0);
  assert.equal(result.accuracy, 100);
});

test('calculateTestScore correctly applies -0.25 negative marking for wrong answers', () => {
  const questions = [
    { id: 'q1', correctIndex: 1 }, // correct (+1)
    { id: 'q2', correctIndex: 3 }, // wrong (-0.25) -> answer was 2
    { id: 'q3', correctIndex: 0 }, // unattempted (0)
    { id: 'q4', correctIndex: 2 }, // wrong (-0.25) -> answer was 1
  ];
  const answers = {
    q1: 1,
    q2: 2,
    q4: 1,
  };
  const result = calculateTestScore(answers, questions, 240);
  // Score: 1 - 0.25 - 0.25 = 0.5
  assert.equal(result.score, 0.5);
  assert.equal(result.correctCount, 1);
  assert.equal(result.incorrectCount, 2);
  assert.equal(result.unattemptedCount, 1);
  // Attempted: 3, correct: 1 -> accuracy 33%
  assert.equal(result.accuracy, 33);
});

test('formatTime formats minutes and seconds correctly', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(600), '10:00');
  assert.equal(formatTime(3600), '60:00');
});

test('matchesQuery checks tokenized query matches', () => {
  assert.equal(matchesQuery('Jammu & Kashmir Reorganisation Act 2019', 'Reorganisation 2019'), true);
  assert.equal(matchesQuery('General Awareness and English', 'General English'), true);
  assert.equal(matchesQuery('Sub-Inspector Police', 'Finance'), false);
});
