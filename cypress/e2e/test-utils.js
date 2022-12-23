import { emptyRoundPegColors, CorrectFeedbackColor } from '../../src/tests/test-constants';

export const checkArrowIndicatorIsAtCorrectRound = (roundIndex) => {
  for (let i = 0; i < 8; i++) {
    const expectedArrowColor = i === roundIndex ? '#4e4e4c' : 'transparent';

    cy.get(`[data-testid=round-${i}]`).within(() => {
      cy.get('svg').should('have.attr', 'color', expectedArrowColor);
    });
  }
};

export const checkSolution = (solution) => {
  for (let i = 0; i < solution.length; i++) {
    cy.get(`[data-testid="solution-${i}-${solution[i]}"]`).should('exist');
  }
};

const pickPegsForRound = (selectedColors) => {
  for (let i = 0; i < selectedColors.length; i++) {
    cy.get(`[data-testid="pegpicker-${selectedColors[i]}"]`).click();
  }
};

const verifyPegsForRound = (selectedColors, roundIndex) => {
  for (let i = 0; i < selectedColors.length; i++) {
    cy.get(`[data-testid="round-${roundIndex}"]`).within(() => {
      cy.get(`[data-testid="roundanswer-${i}-${selectedColors[i]}"]`).should('exist');
    });
  }
};

const pickAndVerifyPegsForRound = (selectedColors, roundIndex) => {
  pickPegsForRound(selectedColors);
  verifyPegsForRound(selectedColors, roundIndex);
};

const checkTheGameBoardIsEmptyOfPegs = () => {
  // get all by classname make sure it's there 36 times
  cy.get('[class*="styled-round-outer-circle"][color="transparent"]').should('have.length', 36);
  cy.get('[class*="styled-feedback-pegs"][color="#4e4e4c"]').should('have.length', 36);
};

const verifyFeedbackForRound = (roundIndex, feedbackColors) => {
  cy.get(`[data-testid="round-${roundIndex}"]`).within(() => {
    for (let i = 0; i < feedbackColors.length; i++) {
      cy.get(`[data-testid="pegfeedback-${i}-${feedbackColors[i]}"]`).should('exist');
    }
  });
};

export const selectPegsDelete1RoundAndGetFeedback = (selectedColorsNotMatchingSolution, selectedColorsMatchingSolution) => {
  // Pick pegs and check if they appear in round 1
  pickAndVerifyPegsForRound(selectedColorsNotMatchingSolution, 0);
  // Delete 1 round
  cy.findByRole('button', { name: 'Delete' }).click();
  // Check pegs from first round are empty after deleting
  verifyPegsForRound(emptyRoundPegColors, 0);

  // Pick pegs matching solution to win after 1 round
  pickAndVerifyPegsForRound(selectedColorsMatchingSolution, 0);
  // Press check button
  cy.findByRole('button', { name: 'Check' }).click();
  // Get peg feedback
  const pegFeedback = [CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor];

  verifyFeedbackForRound(0, pegFeedback);
};

export const playRoundsAndGetFeedback = (rounds, selectedColors1, feedbackColors1, selectedColors2, feedbackColors2) => {
  for (let i = 0; i < rounds; i++) {
    checkArrowIndicatorIsAtCorrectRound(i);
    pickPegsForRound(selectedColors1);

    cy.findByRole('button', { name: 'Check' }).click();
    verifyFeedbackForRound(i, feedbackColors1);
  }

  pickPegsForRound(selectedColors2);
  cy.findByRole('button', { name: 'Check' }).click();
  verifyFeedbackForRound(rounds, feedbackColors2);
};

const checkGameIsSetupForNewGame = () => {
  // Check solution is hidden
  checkSolution(emptyRoundPegColors);
  // Check arrow is showing at the bottom
  checkArrowIndicatorIsAtCorrectRound(0);
  // Check that the round pegs are all empty and no feedback is showing
  checkTheGameBoardIsEmptyOfPegs();
};

export const checkOverlayAndStartNewGame = (title, gamesWonScore, gamesLostScore) => {
  // Check correct overlay is showing and click on 'New Game'
  cy.findByText(title).should('exist');
  cy.findByRole('button', { name: 'New Game' }).click();

  // Check scores
  cy.get('[class*="desktop-score"]').within(() => {
    cy.findByText(gamesWonScore).should('exist');
    cy.findByText(gamesLostScore).should('exist');
  });

  checkGameIsSetupForNewGame();
};
