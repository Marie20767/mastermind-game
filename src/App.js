import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameBoard from './game-board/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import {
  generateInitialPegFeedbackState,
  generateInitialUserAnswersState,
  generateRandomSolution,
  getNumberOfCorrectPositionPegs,
  getNumberOfIncorrectPositionPegs,
  getUpdatedRoundFeedback,
} from './utils/game-utils';
import { FeedbackNumbers, NumberOfRounds } from './utils/constants';
import GameInfo from './game-info/GameInfo';
import Overlay from './Overlay';
import sadDogImage from './images/sad-dog.png';
import happyBeeImage from './images/bee.png';
import RulesOverlay from './RulesOverlay';

// TODO: fix exit animation for overlays
// For the post feedback game overlay we need a delay for the user to see the solution
// Exit animations for both overlays

// TODO: Make sure the app still works for a first time user
// Fix the screenshot error
// Look into app dying when refreshing too much?
// Custom hooks for useStates

// TODO: Refactor StyledRulesTextContainer content into separate container, call it RulesContent

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  const [allUserAnswers, setAllUserAnswers] = useState(() => {
    const storedUserAnswers = localStorage.getItem('user-answers');

    return storedUserAnswers !== null ? JSON.parse(storedUserAnswers) : generateInitialUserAnswersState();
  });

  const [currentRound, setCurrentRound] = useState(() => {
    const storedCurrentRound = localStorage.getItem('current-round');

    return storedCurrentRound !== null ? JSON.parse(storedCurrentRound) : 0;
  });
  const [showSolution, setShowSolution] = useState(() => {
    const storedShowSolution = localStorage.getItem('show-solution');

    return storedShowSolution !== null ? JSON.parse(storedShowSolution) : false;
  });
  const [allPegFeedback, setAllPegFeedback] = useState(() => {
    const storedPegFeedback = localStorage.getItem('peg-feedback');

    return storedPegFeedback !== null ? JSON.parse(storedPegFeedback) : generateInitialPegFeedbackState();
  });
  const [gamesWon, setGamesWon] = useState(() => {
    const storedWonGames = localStorage.getItem('won-games');

    return storedWonGames !== null ? JSON.parse(storedWonGames) : 0;
  });
  const [gamesLost, setGamesLost] = useState(() => {
    const storedLostGames = localStorage.getItem('lost-games');

    return storedLostGames !== null ? JSON.parse(storedLostGames) : 0;
  });
  const [showLosingMessage, setShowLosingMessage] = useState(false);
  const [showWinningMessage, setShowWinningMessage] = useState(false);
  const [showRules, setShowRules] = useState(false);

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
    // Get the number of correct color in correct position pegs, correct color in incorrect position pegs and completely incorrect pegs for the currentRound
    const numberOfCorrectPositionPegs = getNumberOfCorrectPositionPegs(allUserAnswers[currentRound], solution);
    const numberOfIncorrectPositionPegs = getNumberOfIncorrectPositionPegs(allUserAnswers[currentRound], solution);

    const updatedRoundFeedback = getUpdatedRoundFeedback(numberOfIncorrectPositionPegs, numberOfCorrectPositionPegs);

    // Update all the pegFeedback
    const updatedAllPegFeedback = allPegFeedback.map((roundPegFeedback, index) => {
      if (index === currentRound) {
        return updatedRoundFeedback;
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

  const onClickShowRules = () => {
    setShowRules(true);
  };

  // Handles saving to local storage
  useEffect(() => {
    // Save allUserAnswers to local storage
    localStorage.setItem('user-answers', JSON.stringify(allUserAnswers));

    // Save currentRound to local storage
    localStorage.setItem('current-round', JSON.stringify(currentRound));

    // Save allPegFeedback to local storage
    localStorage.setItem('peg-feedback', JSON.stringify(allPegFeedback));

    // Save gamesWon to local storage
    localStorage.setItem('won-games', JSON.stringify(gamesWon));

    // Save gamesLost to lcoal storage
    localStorage.setItem('lost-games', JSON.stringify(gamesLost));

    // Save showSolution to local storage
    localStorage.setItem('show-solution', JSON.stringify(showSolution));
  }, [allUserAnswers, currentRound, allPegFeedback, gamesWon, gamesLost, showSolution]);

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
        onClickStartNewGame={onClickStartNewGame}
        onClickShowRules={onClickShowRules} />

      {showWinningMessage
        ? (
          <Overlay onClickCloseOverlay={() => setShowWinningMessage(false)}>
            <StyledFeedbackContentContainer>
              <img src={happyBeeImage} alt="Happy bee" />
              <h1>Congratulations!</h1>
              <h1>You won, Mastermind.</h1>
              <button type="button" onClick={onClickStartNewGame}>New Game</button>
            </StyledFeedbackContentContainer>
          </Overlay>
        )
        : null
      }

      {showLosingMessage
        ? (
          <Overlay onClickCloseOverlay={() => setShowLosingMessage(false)}>
            <StyledFeedbackContentContainer>
              <img src={sadDogImage} alt="Sad dog" />
              <h1>You lost...</h1>
              <h1>Better luck next time!</h1>
              <button type="button" onClick={onClickStartNewGame}>New Game</button>
            </StyledFeedbackContentContainer>
          </Overlay>
        )
        : null
      }

      {showRules
        ? <RulesOverlay setShowRules={setShowRules} />
        : null
      }

    </div>

  );
};

const StyledFeedbackContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 3vh;

   img {
    margin-bottom: 2vh;
  }

  button {
    margin-top: 4vh;
    padding: 1vh 2vh;
  }
`;

export default App;
