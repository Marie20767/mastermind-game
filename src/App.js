import React, { useState } from 'react';
import GameBoard from './GameBoard.js/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateRandomSolution } from './utils/game-utils';
import { FeedbackNumbers } from './utils/constants';

//
const temp = [
  [null, null, null, null],
  [null, null, null, null],
];

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  // TODO: make this a nested array
  const [userAnswers, setUserAnswers] = useState([[null, null, null, null]]);

  // TODO: add state to track current round
  const [currentRound, setCurrentRound] = useState(0);

  const [showSolution, setShowSolution] = useState(false);
  const [pegFeedback, setPegFeedback] = useState([FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty, FeedbackNumbers.empty]);

  // TODO: create a helper function to get the current answers
  // it returns the current answers array

  const isArrayFullofColors = userAnswers[currentRound].every((element) => element !== null);

  const findFirstNullElement = (state) => {
    return state.findIndex((element) => {
      if (element === null) {
        return true;
      }

      return false;
    });
  };

  const onClickPickUserAnswer = (color) => {
    const updatedUserAnswers = userAnswers.map((element, index) => {
      // Find the first null element in userAnswers
      if (index === findFirstNullElement(userAnswers)) {
        // Replace that null element with the colour of the peg you clicked on
        return color;
      }

      return element;
    });

    // Update the state
    setUserAnswers(updatedUserAnswers);
  };

  const onClickGiveFeedback = () => {
    // TODO:
    // The small peg should become white if I have one correct colour but in the wrong position

    const updatedPegFeedback = [];

    // Compare the userAnswer array to the solution array
    for (let i = 0; i < 4; i++) {
      if (userAnswers[i] === solution[i]) {
        updatedPegFeedback.push(FeedbackNumbers.correct);
      } else {
        updatedPegFeedback.push(FeedbackNumbers.empty);
      }
    }

    // Sort the array so the red colour is first
    const sortedPegFeedback = updatedPegFeedback.sort((a, b) => a - b);

    setPegFeedback(sortedPegFeedback);

    // If the userAnswers array is full of colours, show the solution
    if (isArrayFullofColors) {
      setShowSolution(true);
    }
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker
        onClickPickUserAnswer={onClickPickUserAnswer}
        setUserAnswers={setUserAnswers}
        onClickGiveFeedback={onClickGiveFeedback}
        isArrayFullofColors={isArrayFullofColors} />
      <GameBoard
        userAnswers={userAnswers}
        solution={solution}
        showSolution={showSolution}
        pegFeedback={pegFeedback} />
    </div>
  );
};

export default App;
