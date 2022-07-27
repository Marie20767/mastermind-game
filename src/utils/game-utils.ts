import { FeedbackNumbers, NumberOfPegColors, NumberOfRounds, PegHexCodes, SolutionLength } from './constants';
import { CurrentUserAnswer, PegColor, Solution } from '../@types';

const generateRandomSolution = (): string[] => {
  const randomSolution = [];

  for (let i = 0; i < SolutionLength; i++) {
    const randomIndex: number = Math.floor(Math.random() * NumberOfPegColors);

    randomSolution.push(PegHexCodes[randomIndex]);
  }

  return randomSolution;
};

const generateInitialUserAnswersState = (): null[][] => {
  const initialUserAnswersState = [];

  for (let i = 0; i < NumberOfRounds; i++) {
    initialUserAnswersState.push([null, null, null, null]);
  }

  return initialUserAnswersState;
};

const generateInitialPegFeedbackState = (): number[][] => {
  const initialPegFeedbackState = [];

  for (let i = 0; i < NumberOfRounds; i++) {
    initialPegFeedbackState.push([FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty]);
  }

  return initialPegFeedbackState;
};

const getNumberOfCorrectPositionPegs = (currentUserAnswer: CurrentUserAnswer, solution: Solution): number => {
  let numberOfCorrectPositionPegs = 0;

  for (let i = 0; i < SolutionLength; i++) {
    // Compare the userAnswer array to the solution array
    if (currentUserAnswer[i] === solution[i]) {
      numberOfCorrectPositionPegs += 1;
    }
  }

  return numberOfCorrectPositionPegs;
};

const getNumberOfPegColorInSolution = (pegColor: PegColor, solution: Solution): number => {
  let numberOfPegColorInSolution = 0;

  for (let i = 0; i < SolutionLength; i++) {
    if (solution[i] === pegColor) {
      numberOfPegColorInSolution += 1;
    }
  }

  return numberOfPegColorInSolution;
};

const getNumberOfCorrectPositionPegsForColor = (pegColor: PegColor, currentUserAnswer: CurrentUserAnswer, solution: Solution): number => {
  let numberOfCorrectPositionPegsForColor = 0;

  for (let i = 0; i < SolutionLength; i++) {
    // Check if the color of the userAnswer is the currentColor and if so check if it is the same color as the solution
    if (currentUserAnswer[i] === pegColor && currentUserAnswer[i] === solution[i]) {
      numberOfCorrectPositionPegsForColor += 1;
    }
  }

  return numberOfCorrectPositionPegsForColor;
};

const getNumberOfIncorrectPositionPegsForColor = (pegColor: PegColor, currentUserAnswer: CurrentUserAnswer, solution: Solution): number => {
  let numberOfIncorrectPositionPegsForColor = 0;

  for (let i = 0; i < SolutionLength; i++) {
    if (currentUserAnswer[i] === pegColor && currentUserAnswer[i] !== solution[i]) {
      numberOfIncorrectPositionPegsForColor += 1;
    }
  }

  return numberOfIncorrectPositionPegsForColor;
};

const getNumberOfIncorrectPositionPegs = (currentUserAnswer: CurrentUserAnswer, solution: Solution) => {
  let numberOfIncorrectPositionPegs = 0;

  for (let i = 0; i < PegHexCodes.length; i++) {
    const currentColor = PegHexCodes[i];

    // Find the number of currentColor pegs in the solution
    const numberOfPegColorInSolution = getNumberOfPegColorInSolution(currentColor, solution);

    // Find the number of pegs in the correct position for the currentColor
    const numberOfCorrectPositionPegsForColor = getNumberOfCorrectPositionPegsForColor(currentColor, currentUserAnswer, solution);

    // Find the maximum number of incorrect feedback pegs that could be given for the currentColor
    const maxNumberOfIncorrectFeedbackPegsForColor = numberOfPegColorInSolution - numberOfCorrectPositionPegsForColor;

    // Find the number of incorrect pegs the user placed per currentColor
    const numberOfIncorrectlyPlacedPegsForColor = getNumberOfIncorrectPositionPegsForColor(currentColor, currentUserAnswer, solution);

    // Find the actual number of white feedback pegs that need to be given for the currentColor
    const numberOfActualIncorrectFeedbackPegsForColor = Math.min(maxNumberOfIncorrectFeedbackPegsForColor, numberOfIncorrectlyPlacedPegsForColor);

    // Add the above to the total of white feedback pegs that need to be given
    numberOfIncorrectPositionPegs += numberOfActualIncorrectFeedbackPegsForColor;
  }

  return numberOfIncorrectPositionPegs;
};

const getUpdatedRoundFeedback = (numberOfIncorrectPositionPegs: number, numberOfCorrectPositionPegs: number): number[] => {
  const updatedRoundFeedback = [];

  for (let index = 0; index < numberOfCorrectPositionPegs; index++) {
    updatedRoundFeedback.push(FeedbackNumbers.correct);
  }

  for (let index = 0; index < numberOfIncorrectPositionPegs; index++) {
    updatedRoundFeedback.push(FeedbackNumbers.incorrect);
  }

  const numberOfCompletelyIncorrectPegs = SolutionLength - numberOfCorrectPositionPegs - numberOfIncorrectPositionPegs;

  for (let index = 0; index < numberOfCompletelyIncorrectPegs; index++) {
    updatedRoundFeedback.push(FeedbackNumbers.empty);
  }

  return updatedRoundFeedback;
};

export {
  generateRandomSolution,
  generateInitialUserAnswersState,
  generateInitialPegFeedbackState,
  getNumberOfCorrectPositionPegs,
  getNumberOfIncorrectPositionPegs,
  getUpdatedRoundFeedback,
};
