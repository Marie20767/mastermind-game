"use strict";
exports.__esModule = true;
exports.NumberOfRulesPages = exports.SolutionLength = exports.NumberOfPegColors = exports.NumberOfRounds = exports.FeedbackNumbers = exports.EmptyPegColors = exports.PegHexCodes = exports.PegColors = void 0;
var PegColors = {
    Red: '#ac274d',
    Yellow: '#f7d840',
    Blue: '#2b9de5',
    Orange: '#f49633',
    Green: '#06ba7e',
    White: '#fff',
    Purple: '#a99cc7'
};
exports.PegColors = PegColors;
var PegHexCodes = Object.values(PegColors);
exports.PegHexCodes = PegHexCodes;
var EmptyPegColors = {
    InnerCircle: '#4e4e4c',
    OuterCircle: 'transparent'
};
exports.EmptyPegColors = EmptyPegColors;
var FeedbackNumbers = {
    correct: 1,
    incorrect: 2,
    empty: 3
};
exports.FeedbackNumbers = FeedbackNumbers;
var NumberOfRounds = 9;
exports.NumberOfRounds = NumberOfRounds;
var NumberOfPegColors = 7;
exports.NumberOfPegColors = NumberOfPegColors;
var SolutionLength = 4;
exports.SolutionLength = SolutionLength;
var NumberOfRulesPages = 4;
exports.NumberOfRulesPages = NumberOfRulesPages;
