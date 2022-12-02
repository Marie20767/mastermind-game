import { describe, expect, test } from '@jest/globals';
import {
  getNumberOfCorrectPositionPegs,
  getNumberOfPegColorInSolution,
  getNumberOfCorrectPositionPegsForColor,
  getNumberOfIncorrectPositionPegsForColor,
  getNumberOfIncorrectPositionPegs,
  getUpdatedRoundFeedback,
} from '../utils/game-utils';

describe('peg feedback', () => {
  // Orange, white, purple, orange
  const solution = ['#f49633', '#fff', '#a99cc7', '#f49633'];
  const currentAnswer = ['#fff', '#f49633', '#fff', '#f49633'];

  test('gets number of pegs in the correct position', () => {
    expect(getNumberOfCorrectPositionPegs(currentAnswer, solution)).toBe(1);
  });

  test('gets number of pegs of a certain colour in the solution', () => {
    expect(getNumberOfPegColorInSolution('#fff', solution)).toBe(1);
    expect(getNumberOfPegColorInSolution('#f49633', solution)).toBe(2);
    expect(getNumberOfPegColorInSolution('#a99cc7', solution)).toBe(1);
  });

  test('gets number of correct pegs for a certain colour', () => {
    expect(getNumberOfCorrectPositionPegsForColor('#fff', currentAnswer, solution)).toBe(0);
    expect(getNumberOfCorrectPositionPegsForColor('#f49633', currentAnswer, solution)).toBe(1);
    expect(getNumberOfCorrectPositionPegsForColor('#a99cc7', currentAnswer, solution)).toBe(0);
  });

  test('gets number of incorrect position pegs for a certain colour', () => {
    expect(getNumberOfIncorrectPositionPegsForColor('#fff', currentAnswer, solution)).toBe(2);
    expect(getNumberOfIncorrectPositionPegsForColor('#f49633', currentAnswer, solution)).toBe(1);
    expect(getNumberOfIncorrectPositionPegsForColor('#a99cc7', currentAnswer, solution)).toBe(0);
  });

  test('gets total number of pegs in the incorrect position', () => {
    expect(getNumberOfIncorrectPositionPegs(currentAnswer, solution)).toBe(2);
  });

  test('gets total number of correct, incorrect and completely incorrect feedback pegs', () => {
    expect(getUpdatedRoundFeedback(2, 1)).toEqual([1, 2, 2, 3]);
  });
});
