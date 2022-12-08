import { fireEvent, render, within } from '@testing-library/react';
import { expect } from '@jest/globals';
import { EmptyRoundColor } from './test-constants';
import App from '../App';

export const setSolutionToLocalStorage = (colorArray) => {
  window.localStorage.setItem('solution', JSON.stringify(colorArray));
};

export const play1RoundAndVerifyFeedback = (pickedPegColors, getByTestId, getByRole, feedbackColors) => {
  pickPegsAndVerifySelection(pickedPegColors, getByTestId);
  pressCheckButton(getByRole);

  const round1 = getByTestId('round-0');

  checkFeedbackPegDisplay(feedbackColors, round1);
};

export const verifyPegColorForRounds = (pickedPegColors, round) => {
  for (let i = 0; i < pickedPegColors.length; i++) {
    const pegFromRoundAnswer = within(round).getByTestId(`roundanswer-${i}-${pickedPegColors[i]}`);

    expect(pegFromRoundAnswer).toBeTruthy();
  }
};

export const pickPegsAndVerifySelection = (pickedPegColors, getByTestId) => {
  for (let i = 0; i < pickedPegColors.length; i++) {
    const pegColourFromPegPicker = getByTestId(`pegpicker-${pickedPegColors[i]}`);

    fireEvent.click(pegColourFromPegPicker);

    const pegFromRoundAnswer = getByTestId(`roundanswer-${i}-${pickedPegColors[i]}`);

    expect(pegFromRoundAnswer).toBeTruthy();
  }
};

export const pickPegs = (pickedPegColors, getByTestId) => {
  for (let i = 0; i < pickedPegColors.length; i++) {
    const pegColourFromPegPicker = getByTestId(`pegpicker-${pickedPegColors[i]}`);

    fireEvent.click(pegColourFromPegPicker);
  }
};

export const pressRestartGameButton = (container) => {
  const desktopGameButtonsContainer = container.getElementsByClassName('desktop-game-buttons');
  const restartButton = within(desktopGameButtonsContainer[0]).getByTestId('restart');

  fireEvent.click(restartButton);
};

export const pressCheckButton = (getByRole) => {
  const checkButton = getByRole('button', { name: 'Check' });

  fireEvent.click(checkButton);
};

export const pressDeleteButton = (getByRole) => {
  const deletePegsButton = getByRole('button', { name: 'Delete' });

  fireEvent.click(deletePegsButton);
};

export const checkFeedbackPegDisplay = (feedbackColors, round1) => {
  for (let i = 0; i < feedbackColors.length; i++) {
    const feedbackPeg = within(round1).getByTestId(`pegfeedback-${i}-${feedbackColors[i]}`);

    expect(feedbackPeg).toBeTruthy();
  }
};

export const checkSolution = (solution, getByTestId) => {
  for (let i = 0; i < solution.length; i++) {
    const solutionPeg = getByTestId(`solution-${i}-${solution[i]}`);

    expect(solutionPeg).toBeTruthy();
  }
};

export const pickPegsAndCheckIfDeleted = (pickedColors) => {
  const { getByTestId, getByRole } = render(<App />);

  pickUserAnswersFor2Rounds(pickedColors, getByTestId, getByRole);
  pressDeleteButton(getByRole);

  verifyRoundsWereNotDeleted(getByTestId, pickedColors);
};

export const pickUserAnswersForAllRoundsLoosingCase = (pickedPegColors, getByTestId, getByRole) => {
  for (let i = 0; i < 9; i++) {
    pickPegs(pickedPegColors, getByTestId);
    pressCheckButton(getByRole);
  }
};

export const pickUserAnswersForAllRoundsWinningCase = (pickedPegColors, getByTestId, getByRole) => {
  for (let i = 0; i < 8; i++) {
    pickPegs(pickedPegColors, getByTestId);
    pressCheckButton(getByRole);
  }

  const lastRoundPickedColors = ['#ac274d', '#2b9de5', '#2b9de5', '#f7d840'];

  pickPegs(lastRoundPickedColors, getByTestId);
  pressCheckButton(getByRole);
};

export const pickUserAnswersFor2Rounds = (pickedPegColors, getByTestId, getByRole) => {
  for (let i = 0; i < 3; i++) {
    pickPegs(pickedPegColors, getByTestId);
    pressCheckButton(getByRole);
  }
};

export const pickUserAnswersFor3RoundsWinningCase = (pickedPegColors, getByTestId, getByRole) => {
  pickUserAnswersFor2Rounds(pickedPegColors, getByTestId, getByRole);

  const lastRoundPickedColors = ['#f7d840', '#a99cc7', '#ac274d', '#ac274d'];

  pickPegs(lastRoundPickedColors, getByTestId);
  pressCheckButton(getByRole);
};

export const pickUserAnswersFor3RoundsWithoutCheckingLastSelection = (pickedPegColors, getByTestId, getByRole) => {
  for (let i = 0; i < 3; i++) {
    pickPegs(pickedPegColors, getByTestId);
    pressCheckButton(getByRole);
  }

  pickPegs(pickedPegColors, getByTestId);
};

export const verifyRoundsWereNotDeleted = (getByTestId, pickedPegColors) => {
  for (let i = 0; i < 3; i++) {
    const round = getByTestId(`round-${i}`);

    verifyPegColorForRounds(pickedPegColors, round);
  }
};

export const verifiyPegsAfterDeleting1Round = (pickedPegColors, getByTestId) => {
  verifyRoundsWereNotDeleted(getByTestId, pickedPegColors);

  const emptyRoundColors = [EmptyRoundColor, EmptyRoundColor, EmptyRoundColor, EmptyRoundColor];

  const round = getByTestId('round-3');

  verifyPegColorForRounds(emptyRoundColors, round);
};

export const checkIfSolutionIsShowing = (getByTestId, pickUserAnswers, pickedColors, getByRole, solution) => {
  checkSolution([EmptyRoundColor, EmptyRoundColor, EmptyRoundColor, EmptyRoundColor], getByTestId);

  pickUserAnswers(pickedColors, getByTestId, getByRole);

  checkSolution(solution, getByTestId);
};
