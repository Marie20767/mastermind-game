import React, { useState } from 'react';
import GameBoard from './GameBoard.js/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateInitialPegFeedbackState, generateInitialUserAnswersState, generateRandomSolution } from './utils/game-utils';
import { FeedbackNumbers } from './utils/constants';
import GameInfo from './GameInfo.js/GameInfo';

// TODO: at some point:
// Save to local storage so it remembers your game
// For every new round, make it clear with an arrow that you are at the next round because if all pegs are incorrect it looks like the game
// is not working

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  const [allUserAnswers, setAllUserAnswers] = useState(generateInitialUserAnswersState());
  const [currentRound, setCurrentRound] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [allPegFeedback, setAllPegFeedback] = useState(generateInitialPegFeedbackState());
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);

  const isArrayFullofColors = allUserAnswers[currentRound].every((element) => element !== null);

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
    if (isArrayFullofColors && currentRound !== 8) {
      const newCurrentRound = currentRound + 1;

      setCurrentRound(newCurrentRound);
    }

    if (isArrayFullofColors && currentRound === 8) {
      setShowSolution(true);
    }

    const areRoundAnswersAllCorrect = updatedAllPegFeedback[currentRound].every((number) => number === 1);

    if (areRoundAnswersAllCorrect) {
      setShowSolution(true);
    }
  };

  const onClickStartNewGame = () => {
    setSolution(generateRandomSolution());
    setCurrentRound(0);
    setShowSolution(false);
    setSolution(generateRandomSolution());
    setAllPegFeedback(generateInitialPegFeedbackState());
    setAllUserAnswers(generateInitialUserAnswersState);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker
        onClickPickUserAnswer={onClickPickUserAnswer}
        currentRound={currentRound}
        allUserAnswers={allUserAnswers}
        setAllUserAnswers={setAllUserAnswers}
        onClickGiveFeedback={onClickGiveFeedback}
        isArrayFullofColors={isArrayFullofColors} />
      <GameBoard
        allUserAnswers={allUserAnswers}
        solution={solution}
        showSolution={showSolution}
        allPegFeedback={allPegFeedback} />
      <GameInfo
        onClickStartNewGame={onClickStartNewGame}
        gamesWon={gamesWon}
        gamesLost={gamesLost} />
    </div>
  );
};

export default App;
