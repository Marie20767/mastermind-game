import { FeedbackNumbers, NumberOfPegColors, NumberOfRounds, PegHexCodes } from './constants';

const generateRandomSolution = () => {
  const randomSolution = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * NumberOfPegColors);

    randomSolution.push(PegHexCodes[randomIndex]);
  }

  return randomSolution;
};

const generateInitialUserAnswersState = () => {
  const initialUserAnswersState = [];

  for (let i = 0; i < NumberOfRounds; i++) {
    initialUserAnswersState.push([null, null, null, null]);
  }

  return initialUserAnswersState;
};

const generateInitialPegFeedbackState = () => {
  const initialPegFeedbackState = [];

  for (let i = 0; i < NumberOfRounds; i++) {
    initialPegFeedbackState.push([FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty]);
  }

  return initialPegFeedbackState;
};

export { generateRandomSolution, generateInitialUserAnswersState, generateInitialPegFeedbackState };
