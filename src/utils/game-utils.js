import { PegColorNames } from './constants';
// TODO: create a function called generatedRandomSolution
// that returns an array of 4 random PegColors (can be the name of the colour, or the hex code)

const generateRandomSolution = () => {
  const randomPegColors = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * 6);

    randomPegColors.push(PegColorNames[randomIndex]);
  }

  return randomPegColors;
};

export { generateRandomSolution };
