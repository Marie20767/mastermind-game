import React, { useState } from 'react';
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
import Overlay from './overlays/Overlay';
import sadDogImage from './images/sad-dog.png';
import happyBeeImage from './images/bee.png';
import RulesOverlay from './overlays/RulesOverlay';
import useLocalStorageState from './hooks/useLocalStorageState';
import Score from './game-info/Score';
import GameButtons from './game-info/GameButtons';
import { IsRoundFull, OnClickButton, OnClickPickUserAnswer, PegColor, RoundAnswers, RoundPegFeedback } from './@types';

const App: React.FC = () => {
  const [solution, setSolution] = useLocalStorageState('solution', generateRandomSolution());
  const [allUserAnswers, setAllUserAnswers] = useLocalStorageState('user-answers', generateInitialUserAnswersState());
  const [currentRound, setCurrentRound] = useLocalStorageState('current-round', 0);
  const [showSolution, setShowSolution] = useLocalStorageState('show-solution', false);
  const [allPegFeedback, setAllPegFeedback] = useLocalStorageState('peg-feedback', generateInitialPegFeedbackState());
  const [gamesWon, setGamesWon] = useLocalStorageState('won-games', 0);
  const [gamesLost, setGamesLost] = useLocalStorageState('lost-games', 0);
  const [showLosingMessage, setShowLosingMessage] = useState(false);
  const [showWinningMessage, setShowWinningMessage] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const isRoundFull: IsRoundFull = allUserAnswers[currentRound].every((element: string[]) => element !== null);

  const findFirstNullIndex = (state: string[]): number => {
    return state.findIndex((element) => {
      if (element === null) {
        return true;
      }

      return false;
    });
  };

  const onClickPickUserAnswer: OnClickPickUserAnswer = (color: PegColor) => {
    const updatedRoundAnswers = allUserAnswers[currentRound].map((element: string[], index: number) => {
      // Find the first null element in allUserAnswers
      if (index === findFirstNullIndex(allUserAnswers[currentRound]) && !showSolution) {
        // Replace that null element with the colour of the peg you clicked on
        return color;
      }

      return element;
    });

    // Override the allUserAnswers element at the currentRound index to be updatedRoundAnswers
    const allUpdatedUserAnswers = allUserAnswers.map((roundAnswers: RoundAnswers, index: number) => {
      if (index === currentRound) {
        return updatedRoundAnswers;
      }

      return roundAnswers;
    });

    // Update the state
    setAllUserAnswers(allUpdatedUserAnswers);
  };

  const onClickGiveFeedback: OnClickButton = () => {
    // Get the number of correct color in correct position pegs, correct color in incorrect position pegs and completely incorrect pegs for the currentRound
    const numberOfCorrectPositionPegs: number = getNumberOfCorrectPositionPegs(allUserAnswers[currentRound], solution);
    const numberOfIncorrectPositionPegs: number = getNumberOfIncorrectPositionPegs(allUserAnswers[currentRound], solution);

    const updatedRoundFeedback = getUpdatedRoundFeedback(numberOfIncorrectPositionPegs, numberOfCorrectPositionPegs);

    // Update all the pegFeedback
    const updatedAllPegFeedback = allPegFeedback.map((roundPegFeedback: RoundPegFeedback, index: number) => {
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

    const areRoundAnswersAllCorrect: boolean = updatedAllPegFeedback[currentRound].every((number: number) => number === FeedbackNumbers.correct);

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

  const onClickStartNewGame : OnClickButton = () => {
    setCurrentRound(0);
    setShowSolution(false);
    setSolution(generateRandomSolution());
    setAllPegFeedback(generateInitialPegFeedbackState());
    setAllUserAnswers(generateInitialUserAnswersState());
    setShowLosingMessage(false);
    setShowWinningMessage(false);
  };

  const onClickShowRules: OnClickButton = () => {
    setShowRules(true);
  };

  return (
    <StyledAppContainer>
      <div className="App">
        <GlobalStyle />
        <Score
          className="mobile-score"
          gamesWon={gamesWon}
          gamesLost={gamesLost} />
        <StyledGameContainer>
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
            onClickStartNewGame={onClickStartNewGame}
            onClickShowRules={onClickShowRules} />
        </StyledGameContainer>
        <GameButtons
          className="mobile-game-buttons"
          onClickStartNewGame={onClickStartNewGame}
          onClickShowRules={onClickShowRules} />
      </div>

      <Overlay
        isVisible={showWinningMessage}
        delay={1}
        onClickCloseOverlay={() => setShowWinningMessage(false)}>
        <StyledFeedbackContentContainer>
          <img src={happyBeeImage} alt="Happy bee" />
          <h1>Congratulations!</h1>
          <h1>You won, Mastermind.</h1>
          <button type="button" onClick={onClickStartNewGame}>New Game</button>
        </StyledFeedbackContentContainer>
      </Overlay>

      <Overlay
        isVisible={showLosingMessage}
        delay={1}
        onClickCloseOverlay={() => setShowLosingMessage(false)}>
        <StyledFeedbackContentContainer>
          <img src={sadDogImage} alt="Sad dog" />
          <h1>You lost...</h1>
          <h1>Better luck next time!</h1>
          <button type="button" onClick={onClickStartNewGame}>New Game</button>
        </StyledFeedbackContentContainer>
      </Overlay>

      <RulesOverlay
        setShowRules={setShowRules}
        isVisible={showRules} />
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eceadb;
  height: 100%;
  width: 100%;

  .App {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1800px;
  }
`;

const StyledGameContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;

  @media screen and (min-width: 1024px) {
    margin-top: 0;
  }
`;

const StyledFeedbackContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 25px;

   img {
    margin-bottom: 16px;
    height: 48px;
    width: 48px;

    @media screen and (min-width: 768px) {
      height: 68px;
      width: 68px;
    }
  }

  button {
    margin-top: 30px;
    padding: 9px 14px;
    font-size: 18px;

    @media screen and (min-width: 768px) {
      font-size: 3vh;
    }
  }
`;

export default App;
