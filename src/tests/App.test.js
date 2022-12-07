import { beforeEach, describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import App from '../App';
import { CorrectFeedbackColor, WrongFeedbackColor, WrongPositionFeedbackColor } from './test-constants';
import {
  pickUserAnswersForAllRoundsLoosingCase,
  pickUserAnswersForAllRoundsWinningCase,
  pickUserAnswersFor3RoundsWinningCase,
  checkIfSolutionIsShowing,
  play1RoundAndVerifyFeedback,
  pickPegsAndCheckIfDeleted,
  setSolutionToLocalStorage,
} from './test-utils';

describe(App, () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('selects correct peg colors and gives correct feedback when 2 pegs are correct and 2 pegs are wrong', () => {
    const solution = ['#fff', '#f7d840', '#fff', '#2b9de5'];
    const pickedPegColors = ['#fff', '#f7d840', '#06ba7e', '#06ba7e'];
    const feedbackColors = [CorrectFeedbackColor, CorrectFeedbackColor, WrongFeedbackColor, WrongFeedbackColor];

    play1RoundAndVerifyFeedback(solution, pickedPegColors, feedbackColors);
  });

  test('selects correct peg colors and gives correct feedback when all pegs are wrong', () => {
    const solution = ['#a99cc7', '#a99cc7', '#2b9de5', '#fff'];
    const pickedPegColors = ['#f7d840', '#f7d840', '#f7d840', '#f7d840'];
    const feedbackColors = [WrongFeedbackColor, WrongFeedbackColor, WrongFeedbackColor, WrongFeedbackColor];

    play1RoundAndVerifyFeedback(solution, pickedPegColors, feedbackColors);
  });

  test('selects correct peg colors and gives correct feedback when 1 peg is correct, 2 pegs are in incorrect position and 1 is wrong', () => {
    const solution = ['#f7d840', '#2b9de5', '#a99cc7', '#fff'];
    const pickedPegColors = ['#f7d840', '#a99cc7', '#2b9de5', '#f7d840'];
    const feedbackColors = [CorrectFeedbackColor, WrongPositionFeedbackColor, WrongPositionFeedbackColor, WrongFeedbackColor];

    play1RoundAndVerifyFeedback(solution, pickedPegColors, feedbackColors);
  });

  test('shows solution when user lost after 9 rounds', () => {
    const solution = ['fff', '#f49633', '#06ba7e', '#2b9de5'];

    setSolutionToLocalStorage(solution);
    const pickedPegColors = ['#fff', '#fff', '#fff', '#fff'];

    const { getByTestId, getByRole } = render(<App />);

    checkIfSolutionIsShowing(getByTestId, pickUserAnswersForAllRoundsLoosingCase, pickedPegColors, getByRole, solution);
  });

  test('shows solution when user won after 9 rounds', () => {
    const solution = ['#ac274d', '#2b9de5', '#2b9de5', '#f7d840'];

    setSolutionToLocalStorage(solution);
    const pickedColorsForFirst8Rounds = ['#06ba7e', '#f49633', '#fff', '#f49633'];

    const { getByTestId, getByRole } = render(<App />);

    checkIfSolutionIsShowing(getByTestId, pickUserAnswersForAllRoundsWinningCase, pickedColorsForFirst8Rounds, getByRole, solution);
  });

  test('shows solution when user won after 3 rounds', () => {
    const solution = ['#f7d840', '#a99cc7', '#ac274d', '#ac274d'];

    setSolutionToLocalStorage(solution);
    const pickedColorsForFirst2Rounds = ['#f7d840', '#ac274d', '#ac274d', '#ac274d'];

    const { getByTestId, getByRole } = render(<App />);

    checkIfSolutionIsShowing(getByTestId, pickUserAnswersFor3RoundsWinningCase, pickedColorsForFirst2Rounds, getByRole, solution);
  });

  test('deletes current round of pegs after pressing delete and not pressing check', () => {
    const pickedColors = ['#fff', '#fff', '#ac274d', '#ac274d'];

    pickPegsAndCheckIfDeleted(pickedColors);
  });

  test('keeps all round colors after pressing delete when the check button has already been clicked', () => {
    const pickedColors = ['#f7d840', '#06ba7e', '#06ba7e', '#06ba7e'];

    pickPegsAndCheckIfDeleted(pickedColors);
  });

  test('checks the winning overlay is showing when winning', () => {
    const solution = ['#ac274d', '#2b9de5', '#2b9de5', '#f7d840'];

    setSolutionToLocalStorage(solution);
    const { getByText, getByTestId, getByRole } = render(<App />);
    const pickedColorsForFirst8Rounds = ['#06ba7e', '#f49633', '#fff', '#f49633'];

    checkIfSolutionIsShowing(getByTestId, pickUserAnswersForAllRoundsWinningCase, pickedColorsForFirst8Rounds, getByRole, solution);

    const winningTitle = getByText('Congratulations!');

    expect(winningTitle).toBeTruthy();
  });

  test('checks the loosing overlay is showing when loosing', () => {
    const solution = ['#2b9de5', '#ac274d', '#f7d840', '#2b9de5'];

    setSolutionToLocalStorage(solution);
    const { getByText, getByTestId, getByRole } = render(<App />);

    const pickedPegColorsAllRounds = ['#fff', '#f7d840', '#f7d840', '#fff'];

    checkIfSolutionIsShowing(getByTestId, pickUserAnswersForAllRoundsLoosingCase, pickedPegColorsAllRounds, getByRole, solution);

    const loosingTitle = getByText('You lost...');

    expect(loosingTitle).toBeTruthy();
  });
});
