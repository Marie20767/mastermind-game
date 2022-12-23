import { emptyRoundPegColors, CorrectFeedbackColor, WrongPositionFeedbackColor, WrongFeedbackColor } from '../../src/tests/test-constants';
import { checkArrowIndicatorIsAtCorrectRound, checkSolution, selectPegsDelete1RoundAndGetFeedback, checkOverlayAndStartNewGame, playRoundsAndGetFeedback } from './test-utils';

const solution = ['#f7d840', '#06ba7e', '#2b9de5', '#2b9de5'];

describe('play 1 full game', () => {
  beforeEach(() => {
    cy.setSolution();
  });

  it('wins on the first round', () => {
    // check the setup before playing (arrow showing correctly, solution hidden)
    checkArrowIndicatorIsAtCorrectRound(0);
    checkSolution(emptyRoundPegColors);
    selectPegsDelete1RoundAndGetFeedback(['#fff', '#ac274d', '#fff', '#ac274d'], solution);
    checkSolution(solution);
    checkOverlayAndStartNewGame('Congratulations!', 'Games won: 1', 'Games lost: 0');
  });

  it('wins after 5 rounds', () => {
    const selectedColorsNotMatchingSolution = ['#f7d840', '#fff', '#06ba7e', '#2b9de5'];
    const feedbackColors1 = [CorrectFeedbackColor, CorrectFeedbackColor, WrongPositionFeedbackColor, WrongFeedbackColor];
    const selectedColorsMatchingSolution = solution;
    const feedbackColors2 = [CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor];

    playRoundsAndGetFeedback(4, selectedColorsNotMatchingSolution, feedbackColors1, selectedColorsMatchingSolution, feedbackColors2);
    checkSolution(solution);
    checkOverlayAndStartNewGame('Congratulations!', 'Games won: 1', 'Games lost: 0');
  });

  it('looses the game', () => {
    const selectedColorsNotMatchinSolution1 = ['#fff', '#fff', '#06ba7e', '#ac274d'];
    const feedbackColors1 = [WrongPositionFeedbackColor, WrongFeedbackColor, WrongFeedbackColor, WrongFeedbackColor];
    const selectedColorsNotmatchingSolution2 = ['#06ba7e', '#f7d840', '#f7d840', '#f7d840'];
    const feedbackColors2 = [WrongPositionFeedbackColor, WrongPositionFeedbackColor, WrongFeedbackColor, WrongFeedbackColor];

    playRoundsAndGetFeedback(8, selectedColorsNotMatchinSolution1, feedbackColors1, selectedColorsNotmatchingSolution2, feedbackColors2);
    checkSolution(solution);
    checkOverlayAndStartNewGame('You lost...', 'Games won: 0', 'Games lost: 1');
  });
});

export {};
