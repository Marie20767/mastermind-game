import React, { useState } from 'react';
import GameBoard from './game-board/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateInitialPegFeedbackState, generateInitialUserAnswersState, generateRandomSolution } from './utils/game-utils';
import { FeedbackNumbers, NumberOfRounds } from './utils/constants';
import GameInfo from './game-info/GameInfo';
import Overlay from './Overlay';
import chickImage from './images/chick.png';
import sadDogImage from './images/sad-dog.png';

// TODO: at some point:
// Save to local storage so it remembers your game

// Finish game over overlay: when you click on the x button the overlay should close
// Add rules overlay

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  const [allUserAnswers, setAllUserAnswers] = useState(generateInitialUserAnswersState());
  const [currentRound, setCurrentRound] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [allPegFeedback, setAllPegFeedback] = useState(generateInitialPegFeedbackState());
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [showLosingMessage, setShowLosingMessage] = useState(false);
  const [showWinningMessage, setShowWinningMessage] = useState(false);

  const isRoundFull = allUserAnswers[currentRound].every((element) => element !== null);

  const findFirstNullIndex = (state) => {
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
      if (index === findFirstNullIndex(allUserAnswers[currentRound])) {
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
    if (isRoundFull && currentRound !== NumberOfRounds - 1) {
      const newCurrentRound = currentRound + 1;

      setCurrentRound(newCurrentRound);
    }

    const areRoundAnswersAllCorrect = updatedAllPegFeedback[currentRound].every((number) => number === FeedbackNumbers.correct);

    if (isRoundFull && currentRound === NumberOfRounds - 1 && !areRoundAnswersAllCorrect) {
      setShowSolution(true);
      const newGamesLostScore = gamesLost + 1;

      setGamesLost(newGamesLostScore);
      setShowLosingMessage(true);
    }

    if (areRoundAnswersAllCorrect) {
      setShowSolution(true);
      const newGamesWonScore = gamesWon + 1;

      setGamesWon(newGamesWonScore);
      setShowWinningMessage(true);
    }
  };

  const onClickStartNewGame = () => {
    setCurrentRound(0);
    setShowSolution(false);
    setSolution(generateRandomSolution());
    setAllPegFeedback(generateInitialPegFeedbackState());
    setAllUserAnswers(generateInitialUserAnswersState());
    setShowLosingMessage(false);
    setShowWinningMessage(false);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker
        showSolution={showSolution}
        currentRound={currentRound}
        allUserAnswers={allUserAnswers}
        setAllUserAnswers={setAllUserAnswers}
        isRoundFull={isRoundFull}
        onClickPickUserAnswer={onClickPickUserAnswer}
        onClickGiveFeedback={onClickGiveFeedback} />
      <GameBoard
        allUserAnswers={allUserAnswers}
        currentRound={currentRound}
        solution={solution}
        showSolution={showSolution}
        allPegFeedback={allPegFeedback} />
      <GameInfo
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        showLosingMessage={showLosingMessage}
        showWinningMessage={showWinningMessage}
        onClickStartNewGame={onClickStartNewGame} />

      {showWinningMessage
        ? (
          <Overlay
            imageSource={chickImage}
            imageAlt="Celebrating chick"
            title1="Congratulations!"
            title2="You won Mastermind."
            onClickStartNewGame={onClickStartNewGame} />
        )
        : null
      }

      {showLosingMessage
        ? (
          <Overlay
            imageSource={sadDogImage}
            imageAlt="Sad dog"
            title1="You lost..."
            title2="Better luck next time!"
            onClickStartNewGame={onClickStartNewGame} />
        )
        : null
      }
    </div>
  );
};

export default App;
