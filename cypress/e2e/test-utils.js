import { allRoundPegsAreEmpty, CorrectFeedbackColor } from '../../src/tests/test-constants';

export const checkColorOfAllArrows = (roundIndex) => {
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

export const pickAndVerifyPegsFor1Round = (selectedColors) => {
  for (let i = 0; i < selectedColors.length; i++) {
    cy.get(`[data-testid="pegpicker-${selectedColors[i]}"]`).click();
    cy.get('[data-testid="round-0"]').within(() => {
      cy.get(`[data-testid="roundanswer-${i}-${selectedColors[i]}"]`).should('exist');
    });
  }
};

const checkTheGameBoardIsEmptyOfPegs = () => {
  // get all by classname make sure it's there 36 times
  cy.get('[class*="styled-round-outer-circle"][color="transparent"]').should('have.length', 36);
  cy.get('[class*="styled-feedback-pegs"][color="#4e4e4c"]').should('have.length', 36);
};

export const selectPegsDelete1RoundAndGetFeedback = (selectedColorsNotMatchingSolution, selectedColorsMatchingSolution) => {
  // Pick pegs and check if they appear in round 1
  pickAndVerifyPegsFor1Round(selectedColorsNotMatchingSolution);
  // Delete 1 round
  cy.findByRole('button', { name: 'Delete' }).click();
  // Check pegs from first round are empty after deleting
  for (let i = 0; i < allRoundPegsAreEmpty.length; i++) {
    cy.get('[data-testid="round-0"]').within(() => {
      cy.get(`[data-testid="roundanswer-${i}-${allRoundPegsAreEmpty[i]}"]`).should('exist');
    });
  }
  // Pick pegs matching solution to win after 1 round
  pickAndVerifyPegsFor1Round(selectedColorsMatchingSolution);
  // Press check button
  cy.findByRole('button', { name: 'Check' }).click();
  // Get peg feedback
  const pegFeedback = [CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor, CorrectFeedbackColor];

  cy.get('[data-testid="round-0"]').within(() => {
    for (let i = 0; i < pegFeedback.length; i++) {
      cy.get(`[data-testid="pegfeedback-${i}-${pegFeedback[i]}"]`).should('exist');
    }
  });
};

export const playRoundsAndGetFeedback = (rounds, selectedColors1, feedbackColors1, selectedColors2, feedbackColors2) => {
  for (let i = 0; i < rounds; i++) {
    checkColorOfAllArrows(i);
    for (let j = 0; j < selectedColors1.length; j++) {
      cy.get(`[data-testid="pegpicker-${selectedColors1[j]}"]`).click();
    }

    cy.findByRole('button', { name: 'Check' }).click();
    cy.get(`[data-testid="round-${i}"]`).within(() => {
      for (let k = 0; k < feedbackColors1.length; k++) {
        cy.get(`[data-testid="pegfeedback-${k}-${feedbackColors1[k]}"]`).should('exist');
      }
    });
  }

  for (let i = 0; i < selectedColors2.length; i++) {
    cy.get(`[data-testid="pegpicker-${selectedColors2[i]}"]`).click();
  }

  cy.findByRole('button', { name: 'Check' }).click();
  for (let i = 0; i < feedbackColors2.length; i++) {
    cy.get(`[data-testid="pegfeedback-${i}-${feedbackColors2[i]}"]`).should('exist');
  }
};

const checkGameIsSetupForNewGame = () => {
  // Check solution is hidden
  checkSolution(allRoundPegsAreEmpty);
  // Check arrow is showing at the bottom
  checkColorOfAllArrows(0);
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
