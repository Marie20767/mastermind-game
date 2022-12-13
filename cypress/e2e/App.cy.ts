import { allRoundPegsAreEmpty } from '../../src/tests/test-constants';
import { checkColorOfAllArrowsGameStart, checkSolution, selectPegsDelete1RoundAndGetFeedback, checkOverlayAndStartNewGame } from './test-utils';

const solution = ['#f7d840', '#06ba7e', '#2b9de5', '#2b9de5'];

describe('play 1 full game', () => {
  beforeEach(() => {
    cy.setSolution();
  });

  it('wins on the first round', () => {
    // check the setup before playing (arrow showing correctly, solution hidden)
    checkColorOfAllArrowsGameStart();
    checkSolution(allRoundPegsAreEmpty);
    selectPegsDelete1RoundAndGetFeedback(['#fff', '#ac274d', '#fff', '#ac274d'], solution);
    checkSolution(solution);
    checkOverlayAndStartNewGame();
  });

  // it('wins after 5 rounds', () => {

  // });

  // it('looses the game', () => {

  // });
});

// Examples:
// cy.get(.date).type("2021-02-17")
// cy.wait(2000) -> otherwise the remove happens too fast

export {};
