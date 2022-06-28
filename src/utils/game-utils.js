import { PegHexCodes } from './constants';

const generateRandomSolution = () => {
  const randomSolution = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * 6);

    randomSolution.push(PegHexCodes[randomIndex]);
  }

  return randomSolution;
};

export { generateRandomSolution };
