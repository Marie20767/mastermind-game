import React, { useState } from 'react';
import GameBoard from './GameBoard.js/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateInitialPegFeedbackState, generateInitialUserAnswersState, generateRandomSolution } from './utils/game-utils';
import { FeedbackNumbers } from './utils/constants';

// TODO: at some point:
// - Make it so you can't delete a row that already has feedback

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  const [allUserAnswers, setAllUserAnswers] = useState(generateInitialUserAnswersState());
  const [currentRound, setCurrentRound] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [allPegFeedback, setAllPegFeedback] = useState(generateInitialPegFeedbackState());

  const isArrayFullofColors = allUserAnswers[currentRound].every((element) => element !== null);

  console.log(allUserAnswers);

  const findFirstNullElement = (state) => {
    return state.findIndex((element) => {
      if (element === null) {
        return true;
      }

      return false;
    });
  };

  const onClickPickUserAnswer = (color) => {
    const updatedRoundAnswers = allUserAnswers[currentRound].map((element, index) => {
      // Find the first null element in allUserAnswers
      if (index === findFirstNullElement(allUserAnswers[currentRound])) {
        // Replace that null element with the colour of the peg you clicked on
        return color;
      }

      return element;
    });

    // Override the allUserAnswers element at the currentRound index to be updatedRoundAnswers
    const allUpdatedUserAnswers = allUserAnswers.map((roundAnswers, index) => {
      if (index === currentRound) {
        return updatedRoundAnswers;
      }

      return roundAnswers;
    });

    // Update the state
    setAllUserAnswers(allUpdatedUserAnswers);
  };

  const onClickGiveFeedback = () => {
    // TODO:
    // The small peg should become white if I have one correct colour but in the wrong position
    debugger;
    const updatedRoundPegFeedback = [];

    // Compare the userAnswer array to the solution array
    for (let i = 0; i < 4; i++) {
      if (allUserAnswers[currentRound][i] === solution[i]) {
        updatedRoundPegFeedback.push(FeedbackNumbers.correct);
      } else {
        updatedRoundPegFeedback.push(FeedbackNumbers.empty);
      }
    }

    // Sort the array so the red colour is first
    const sortedRoundPegFeedback = updatedRoundPegFeedback.sort((a, b) => a - b);

    const updatedAllPegFeedback = allPegFeedback.map((roundPegFeedback, index) => {
      if (index === currentRound) {
        return sortedRoundPegFeedback;
      }

      return roundPegFeedback;
    });

    setAllPegFeedback(updatedAllPegFeedback);

    // If the allUserAnswers array is full of colours, go to the next round
    if (isArrayFullofColors) {
      const newCurrentRound = currentRound + 1;

      setCurrentRound(newCurrentRound);
    }
  };

  console.log(allUserAnswers);

  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker
        onClickPickUserAnswer={onClickPickUserAnswer}
        setAllUserAnswers={setAllUserAnswers}
        onClickGiveFeedback={onClickGiveFeedback}
        isArrayFullofColors={isArrayFullofColors} />
      <GameBoard
        allUserAnswers={allUserAnswers}
        solution={solution}
        showSolution={showSolution}
        allPegFeedback={allPegFeedback} />
    </div>
  );
};

export default App;
