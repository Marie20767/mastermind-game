import { EmptyPegColorsType, PegColorsType } from '../@types';

const PegColors: PegColorsType = {
  Red: '#ac274d',
  Yellow: '#f7d840',
  Blue: '#2b9de5',
  Orange: '#f49633',
  Green: '#06ba7e',
  White: '#fff',
  Purple: '#a99cc7',
};

const PegHexCodes = Object.values(PegColors);

const EmptyPegColors: EmptyPegColorsType = {
  InnerCircle: '#4e4e4c',
  OuterCircle: 'transparent',
};

const FeedbackNumbers = {
  correct: 1,
  incorrect: 2,
  empty: 3,
};

const NumberOfRounds: number = 9;

const NumberOfPegColors: number = 7;

const SolutionLength: number = 4;

const NumberOfRulesPages: number = 4;

export {
  PegColors,
  PegHexCodes,
  EmptyPegColors,
  FeedbackNumbers,
  NumberOfRounds,
  NumberOfPegColors,
  SolutionLength,
  NumberOfRulesPages,
};
