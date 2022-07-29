"use strict";
exports.__esModule = true;
exports.getUpdatedRoundFeedback = exports.getNumberOfIncorrectPositionPegs = exports.getNumberOfCorrectPositionPegs = exports.generateInitialPegFeedbackState = exports.generateInitialUserAnswersState = exports.generateRandomSolution = void 0;
var constants_1 = require("./constants");
var generateRandomSolution = function () {
    var randomSolution = [];
    for (var i = 0; i < constants_1.SolutionLength; i++) {
        var randomIndex = Math.floor(Math.random() * constants_1.NumberOfPegColors);
        randomSolution.push(constants_1.PegHexCodes[randomIndex]);
    }
    return randomSolution;
};
exports.generateRandomSolution = generateRandomSolution;
var generateInitialUserAnswersState = function () {
    var initialUserAnswersState = [];
    for (var i = 0; i < constants_1.NumberOfRounds; i++) {
        initialUserAnswersState.push([null, null, null, null]);
    }
    return initialUserAnswersState;
};
exports.generateInitialUserAnswersState = generateInitialUserAnswersState;
var generateInitialPegFeedbackState = function () {
    var initialPegFeedbackState = [];
    for (var i = 0; i < constants_1.NumberOfRounds; i++) {
        initialPegFeedbackState.push([constants_1.FeedbackNumbers.empty, constants_1.FeedbackNumbers.empty, constants_1.FeedbackNumbers.empty, constants_1.FeedbackNumbers.empty]);
    }
    return initialPegFeedbackState;
};
exports.generateInitialPegFeedbackState = generateInitialPegFeedbackState;
var getNumberOfCorrectPositionPegs = function (currentUserAnswer, solution) {
    var numberOfCorrectPositionPegs = 0;
    for (var i = 0; i < constants_1.SolutionLength; i++) {
        // Compare the userAnswer array to the solution array
        if (currentUserAnswer[i] === solution[i]) {
            numberOfCorrectPositionPegs += 1;
        }
    }
    return numberOfCorrectPositionPegs;
};
exports.getNumberOfCorrectPositionPegs = getNumberOfCorrectPositionPegs;
var getNumberOfPegColorInSolution = function (pegColor, solution) {
    var numberOfPegColorInSolution = 0;
    for (var i = 0; i < constants_1.SolutionLength; i++) {
        if (solution[i] === pegColor) {
            numberOfPegColorInSolution += 1;
        }
    }
    return numberOfPegColorInSolution;
};
var getNumberOfCorrectPositionPegsForColor = function (pegColor, currentUserAnswer, solution) {
    var numberOfCorrectPositionPegsForColor = 0;
    for (var i = 0; i < constants_1.SolutionLength; i++) {
        // Check if the color of the userAnswer is the currentColor and if so check if it is the same color as the solution
        if (currentUserAnswer[i] === pegColor && currentUserAnswer[i] === solution[i]) {
            numberOfCorrectPositionPegsForColor += 1;
        }
    }
    return numberOfCorrectPositionPegsForColor;
};
var getNumberOfIncorrectPositionPegsForColor = function (pegColor, currentUserAnswer, solution) {
    var numberOfIncorrectPositionPegsForColor = 0;
    for (var i = 0; i < constants_1.SolutionLength; i++) {
        if (currentUserAnswer[i] === pegColor && currentUserAnswer[i] !== solution[i]) {
            numberOfIncorrectPositionPegsForColor += 1;
        }
    }
    return numberOfIncorrectPositionPegsForColor;
};
var getNumberOfIncorrectPositionPegs = function (currentUserAnswer, solution) {
    var numberOfIncorrectPositionPegs = 0;
    for (var i = 0; i < constants_1.PegHexCodes.length; i++) {
        var currentColor = constants_1.PegHexCodes[i];
        // Find the number of currentColor pegs in the solution
        var numberOfPegColorInSolution = getNumberOfPegColorInSolution(currentColor, solution);
        // Find the number of pegs in the correct position for the currentColor
        var numberOfCorrectPositionPegsForColor = getNumberOfCorrectPositionPegsForColor(currentColor, currentUserAnswer, solution);
        // Find the maximum number of incorrect feedback pegs that could be given for the currentColor
        var maxNumberOfIncorrectFeedbackPegsForColor = numberOfPegColorInSolution - numberOfCorrectPositionPegsForColor;
        // Find the number of incorrect pegs the user placed per currentColor
        var numberOfIncorrectlyPlacedPegsForColor = getNumberOfIncorrectPositionPegsForColor(currentColor, currentUserAnswer, solution);
        // Find the actual number of white feedback pegs that need to be given for the currentColor
        var numberOfActualIncorrectFeedbackPegsForColor = Math.min(maxNumberOfIncorrectFeedbackPegsForColor, numberOfIncorrectlyPlacedPegsForColor);
        // Add the above to the total of white feedback pegs that need to be given
        numberOfIncorrectPositionPegs += numberOfActualIncorrectFeedbackPegsForColor;
    }
    return numberOfIncorrectPositionPegs;
};
exports.getNumberOfIncorrectPositionPegs = getNumberOfIncorrectPositionPegs;
var getUpdatedRoundFeedback = function (numberOfIncorrectPositionPegs, numberOfCorrectPositionPegs) {
    var updatedRoundFeedback = [];
    for (var index = 0; index < numberOfCorrectPositionPegs; index++) {
        updatedRoundFeedback.push(constants_1.FeedbackNumbers.correct);
    }
    for (var index = 0; index < numberOfIncorrectPositionPegs; index++) {
        updatedRoundFeedback.push(constants_1.FeedbackNumbers.incorrect);
    }
    var numberOfCompletelyIncorrectPegs = constants_1.SolutionLength - numberOfCorrectPositionPegs - numberOfIncorrectPositionPegs;
    for (var index = 0; index < numberOfCompletelyIncorrectPegs; index++) {
        updatedRoundFeedback.push(constants_1.FeedbackNumbers.empty);
    }
    return updatedRoundFeedback;
};
exports.getUpdatedRoundFeedback = getUpdatedRoundFeedback;
