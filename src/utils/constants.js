const PegColors = {
  Red: '#ac274d',
  Yellow: '#f7d840',
  Blue: '#2b9de5',
  Orange: '#f49633',
  Green: '#06ba7e',
  Purple: '#a99cc7',
};

const PegHexCodes = Object.values(PegColors);

const EmptyPegColors = {
  InnerCircle: '#4e4e4c',
  OuterCircle: 'transparent',
};

const FeedbackNumbers = {
  correct: 1,
  incorrect: 2,
  empty: 3,
};

export { PegColors, PegHexCodes, EmptyPegColors, FeedbackNumbers };
