import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import GameBoard from './game-board/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateInitialPegFeedbackState, generateInitialUserAnswersState, generateRandomSolution } from './utils/game-utils';
import { FeedbackNumbers, NumberOfRounds } from './utils/constants';
import GameInfo from './game-info/GameInfo';
import Overlay from './Overlay';
import welcomingChickImage from './images/chick.png';
import sadDogImage from './images/sad-dog.png';
import happyBeeImage from './images/bee.png';

// TODO: at some point:
// Save to local storage so it remembers your game

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
  const [showRules, setShowRules] = useState(false);
  const [rulesPageIndex, setRulesPageIndex] = useState(0);

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

  const onClickShowRules = () => {
    setShowRules(true);
  };

  const getRulesOverlayContent = () => {
    if (rulesPageIndex === 0) {
      return (
        <>
          <h2>Hi, welcome to Mastermind!</h2>
          <img src={welcomingChickImage} alt="Waving chick" />
          <p>The aim of the game is to find the exact positions of the colours in the secret sequence.</p>
          <FontAwesomeIcon icon={faAnglesRight} className="icon next" onClick={() => setRulesPageIndex(rulesPageIndex + 1)} color="white" fontSize="30px" />
        </>
      );
    }

    if (rulesPageIndex === 1) {
      return (
        <>
          <p>To start the game, click on the <span>coloured balls </span> on the left.</p>
          <p>Click on the <span>Delete</span> button if you wish to delete your sequence and choose different colours.</p>
          <p>Once 4 balls are selected, click on the <span>Check</span> button to get the computer&apos;s response.</p>
          <StyledIconContainer>
            <FontAwesomeIcon icon={faAnglesLeft} className="icon next" onClick={() => setRulesPageIndex(rulesPageIndex - 1)} color="white" fontSize="30px" />
            <FontAwesomeIcon icon={faAnglesRight} className="icon previous" onClick={() => setRulesPageIndex(rulesPageIndex + 1)} color="white" fontSize="30px" />
          </StyledIconContainer>
        </>
      );
    }

    if (rulesPageIndex === 2) {
      return (
        <>
          <p>The small <span>red</span>, <span>white</span> and <span>dark grey</span> balls indicate the computer&apos;s response.</p>
          <p>Red indicates a <span>correct colour</span> in the <span>correct position</span>.</p>
          <p>White indicates a <span>correct colour</span> in the <span>wrong position</span>.</p>
          <p>Dark grey indicates an <span>incorrect colour</span> in the <span>incorrect position</span>.</p>
          <StyledIconContainer>
            <FontAwesomeIcon icon={faAnglesLeft} className="icon next" onClick={() => setRulesPageIndex(rulesPageIndex - 1)} color="white" fontSize="30px" />
            <FontAwesomeIcon icon={faAnglesRight} className="icon previous" onClick={() => setRulesPageIndex(rulesPageIndex + 1)} color="white" fontSize="30px" />
          </StyledIconContainer>
        </>
      );
    }

    if (rulesPageIndex === 3) {
      return (
        <>
          <h3>Special notes:</h3>
          <p>The same colour can be selected up to <span>4 times.</span></p>
          <p>You have <span>9 attempts</span> to find the secret sequence.</p>
          <p>Good luck Mastermind!</p>
          <FontAwesomeIcon icon={faAnglesLeft} className="icon next" onClick={() => setRulesPageIndex(rulesPageIndex - 1)} color="white" fontSize="30px" />
        </>
      );
    }

    return null;
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
        onClickStartNewGame={onClickStartNewGame}
        onClickShowRules={onClickShowRules} />

      {showWinningMessage
        ? (
          <Overlay onClickCloseOverlay={() => setShowWinningMessage(false)}>
            <StyledFeedbackContentContainer>
              <img src={happyBeeImage} alt="Happy bee" />
              <h2>Congratulations!</h2>
              <h2>You won Mastermind.</h2>
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
              <h2>You lost...</h2>
              <h2>Better luck next time!</h2>
              <button type="button" onClick={onClickStartNewGame}>New Game</button>
            </StyledFeedbackContentContainer>
          </Overlay>
        )
        : null
      }

      {showRules
        ? (
          <Overlay onClickCloseOverlay={() => setShowRules(false)}>
            <StyledRulesContainer>
              {getRulesOverlayContent()}
            </StyledRulesContainer>
          </Overlay>
        )
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
    margin-bottom: 1vh;
  }

  button {
    margin-top: 4vh;
    padding: 1vh 2vh;
  }

  h2 {
    color: white;
    font-size: 4.5vh;
    letter-spacing: 1.5px;
    margin-bottom: 2vh;
  }
`;

const StyledRulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    margin-bottom: 3vh;
  }

  h2 {
    margin-top: 4vh;
    margin-bottom: 3vh;
    color: white;
    font-size: 4vh;
    letter-spacing: 1.5px;
  }

  h3 {
    color: white;
    font-size: 3.8vh;
    text-decoration: underline;
    margin-bottom: 2vh;
  }

  .icon {
    margin-top: 2vh;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }

  p {
    color: white;
    font-size: 3.3vh;
    margin: 1.8vh 4vh;
  }

  span {
    color: #64a4b8;
    font-weight: bold;
  }

`;

const StyledIconContainer = styled.div`
  display: flex;

  .previous {
    margin-left: 3vh;
  }
`;

export default App;
