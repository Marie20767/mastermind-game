import { CurrentUserAnswer, SolutionArray } from '../src/@types';
import { getNumberOfCorrectPositionPegs, getNumberOfIncorrectPositionPegs, getUpdatedRoundFeedback } from '../src/utils/game-utils';

const checkResults = (result: number, expectedResult: number): boolean => {
  if (result === expectedResult) {
    return true;
  }

  return false;
};

const checkResultsArray = (result: number[], expectedResult: number[]): boolean => {
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== expectedResult[i]) {
      return false;
    }
  }

  return true;
};

const testNoPegsInTheCorrectPosition = () => {
  const solution: SolutionArray = ['#a99cc7', '#fff', '#a99cc7', '#f49633'];
  const userAnswer: CurrentUserAnswer = ['#06ba7e', '#a99cc7', '#fff', '#ac274d'];

  const result = getNumberOfCorrectPositionPegs(userAnswer, solution);
  const expectedResult = 0;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 0 Correct Position Pegs: ', testNoPegsInTheCorrectPosition());

const testOnePegInTheCorrectPosition = () => {
  const solution: SolutionArray = ['#2b9de5', '#f7d840', '#f7d840', '#fff'];
  const userAnswer: CurrentUserAnswer = ['#f7d840', '#a99cc7', '#f7d840', '#f7d840'];

  const result = getNumberOfCorrectPositionPegs(userAnswer, solution);
  const expectedResult = 1;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 1 Correct Position Peg: ', testOnePegInTheCorrectPosition());

const testThreePegsInTheCorrectPosition = () => {
  const solution: SolutionArray = ['#2b9de5', '#2b9de5', '#f7d840', '#2b9de5'];
  const userAnswer: CurrentUserAnswer = ['#2b9de5', '#2b9de5', '#2b9de5', '#2b9de5'];

  const result = getNumberOfCorrectPositionPegs(userAnswer, solution);
  const expectedResult = 3;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 3 Correct Position Pegs: ', testThreePegsInTheCorrectPosition());

const testNoPegsInTheIncorrectPosition = () => {
  const solution: SolutionArray = ['#f7d840', '#f7d840', '#f7d840', '#fff'];
  const userAnswer: CurrentUserAnswer = ['#f7d840', '#f7d840', '#f7d840', '#f7d840'];

  const result = getNumberOfIncorrectPositionPegs(userAnswer, solution);

  const expectedResult = 0;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 0 Incorrect Position Peg: ', testNoPegsInTheIncorrectPosition());

const testOnePegInTheIncorrectPosition = () => {
  const solution: SolutionArray = ['#ac274d', '#ac274d', '#fff', '#ac274d'];
  const userAnswer: CurrentUserAnswer = ['#ac274d', '#2b9de5', '#2b9de5', '#fff'];

  const result = getNumberOfIncorrectPositionPegs(userAnswer, solution);

  const expectedResult = 1;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 1 Incorrect Position Peg: ', testOnePegInTheIncorrectPosition());

const testAllPegsInTheIncorrectPosition = () => {
  const solution: SolutionArray = ['#fff', '#06ba7e', '#ac274d', '#2b9de5'];
  const userAnswer: CurrentUserAnswer = ['#06ba7e', '#fff', '#2b9de5', '#ac274d'];

  const result = getNumberOfIncorrectPositionPegs(userAnswer, solution);

  const expectedResult = 4;

  return checkResults(result, expectedResult);
};

console.log('>>> Test 4 Incorrect Position Peg: ', testAllPegsInTheIncorrectPosition());

const getPegFeedback3Correct1Incorrect = () => {
  const numberIncorrectPositionPegs: number = 1;
  const numberCorrectPositionPegs: number = 3;
  const result : number[] = getUpdatedRoundFeedback(numberIncorrectPositionPegs, numberCorrectPositionPegs);

  const expectedResult = [1, 1, 1, 2];

  return checkResultsArray(result, expectedResult);
};

console.log('>>> Test 1 Incorrect and 3 Correct Position Pegs:', getPegFeedback3Correct1Incorrect());

const getPegFeedbackAllIncorrectPositionAndColor = () => {
  const numberIncorrectPositionPegs: number = 0;
  const numberCorrectPositionPegs : number = 0;

  const result: number[] = getUpdatedRoundFeedback(numberIncorrectPositionPegs, numberCorrectPositionPegs);

  const expectedResult = [3, 3, 3, 3];

  return checkResultsArray(result, expectedResult);
};

console.log('>>> Test 4 Completely Incorrect Pegs: ', getPegFeedbackAllIncorrectPositionAndColor());

export {};

