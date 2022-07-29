"use strict";
exports.__esModule = true;
var game_utils_1 = require("../src/utils/game-utils");
var checkResults = function (result, expectedResult) {
    if (result === expectedResult) {
        return true;
    }
    return false;
};
var checkResultsArray = function (result, expectedResult) {
    for (var i = 0; i < result.length; i++) {
        if (result[i] !== expectedResult[i]) {
            return false;
        }
    }
    return true;
};
var testNoPegsInTheCorrectPosition = function () {
    var solution = ['#a99cc7', '#fff', '#a99cc7', '#f49633'];
    var userAnswer = ['#06ba7e', '#a99cc7', '#fff', '#ac274d'];
    var result = (0, game_utils_1.getNumberOfCorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 0;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 0 Correct Position Pegs: ', testNoPegsInTheCorrectPosition());
var testOnePegInTheCorrectPosition = function () {
    var solution = ['#2b9de5', '#f7d840', '#f7d840', '#fff'];
    var userAnswer = ['#f7d840', '#a99cc7', '#f7d840', '#f7d840'];
    var result = (0, game_utils_1.getNumberOfCorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 1;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 1 Correct Position Peg: ', testOnePegInTheCorrectPosition());
var testThreePegsInTheCorrectPosition = function () {
    var solution = ['#2b9de5', '#2b9de5', '#f7d840', '#2b9de5'];
    var userAnswer = ['#2b9de5', '#2b9de5', '#2b9de5', '#2b9de5'];
    var result = (0, game_utils_1.getNumberOfCorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 3;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 3 Correct Position Pegs: ', testThreePegsInTheCorrectPosition());
var testNoPegsInTheIncorrectPosition = function () {
    var solution = ['#f7d840', '#f7d840', '#f7d840', '#fff'];
    var userAnswer = ['#f7d840', '#f7d840', '#f7d840', '#f7d840'];
    var result = (0, game_utils_1.getNumberOfIncorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 0;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 0 Incorrect Position Peg: ', testNoPegsInTheIncorrectPosition());
var testOnePegInTheIncorrectPosition = function () {
    var solution = ['#ac274d', '#ac274d', '#fff', '#ac274d'];
    var userAnswer = ['#ac274d', '#2b9de5', '#2b9de5', '#fff'];
    var result = (0, game_utils_1.getNumberOfIncorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 1;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 1 Incorrect Position Peg: ', testOnePegInTheIncorrectPosition());
var testAllPegsInTheIncorrectPosition = function () {
    var solution = ['#fff', '#06ba7e', '#ac274d', '#2b9de5'];
    var userAnswer = ['#06ba7e', '#fff', '#2b9de5', '#ac274d'];
    var result = (0, game_utils_1.getNumberOfIncorrectPositionPegs)(userAnswer, solution);
    var expectedResult = 4;
    return checkResults(result, expectedResult);
};
console.log('>>> Test 4 Incorrect Position Peg: ', testAllPegsInTheIncorrectPosition());
var getPegFeedback3Correct1Incorrect = function () {
    var numberIncorrectPositionPegs = 1;
    var numberCorrectPositionPegs = 3;
    var result = (0, game_utils_1.getUpdatedRoundFeedback)(numberIncorrectPositionPegs, numberCorrectPositionPegs);
    var expectedResult = [1, 1, 1, 2];
    return checkResultsArray(result, expectedResult);
};
console.log('>>> Test 1 Incorrect and 3 Correct Position Pegs:', getPegFeedback3Correct1Incorrect());
var getPegFeedbackAllIncorrectPositionAndColor = function () {
    var numberIncorrectPositionPegs = 0;
    var numberCorrectPositionPegs = 0;
    var result = (0, game_utils_1.getUpdatedRoundFeedback)(numberIncorrectPositionPegs, numberCorrectPositionPegs);
    var expectedResult = [3, 3, 3, 3];
    return checkResultsArray(result, expectedResult);
};
console.log('>>> Test 4 Completely Incorrect Pegs: ', getPegFeedbackAllIncorrectPositionAndColor());
