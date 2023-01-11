import styled from 'styled-components';
import React from 'react';

import {
  onGameLost,
  onGameWon,
  resetStatesForNewGame,
  setAllPegFeedback,
  setAllUserAnswers,
  setCurrentRound,
  showLosingMessage,
  showWinningMessage } from './redux/reducers/game';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import {
  getNumberOfCorrectPositionPegs,
  getNumberOfIncorrectPositionPegs,
  getUpdatedRoundFeedback,
} from './utils/game-utils';
import { FeedbackNumbers, NumberOfRounds } from './utils/constants';
import {
  OnClickButton,
  OnClickPickUserAnswer,
  PegColor,
  RoundAnswers,
  RoundPegFeedback,
  UserAnswer,
} from './@types';

import sadDogImage from './images/sad-dog.png';
import happyBeeImage from './images/bee.png';

import GameBoard from './game-board/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import GameInfo from './game-info/GameInfo';
import Overlay from './overlays/Overlay';
import RulesOverlay from './overlays/RulesOverlay';
import Score from './game-info/Score';
import GameButtons from './game-info/GameButtons';

const App: React.FC = () => {
  const {
    solutionValue,
    solutionShown,
    gameRulesShown,
    losingMessageIsShown,
    winningMessageIsShown,
    allPegFeedback,
    allUserAnswers,
    currentRound,
  } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const isRoundFull = allUserAnswers[currentRound].every((element: UserAnswer) => element !== null);

  const findFirstNullIndex = (state: any[]): number => {
    return state.findIndex((element) => {
      if (element === null) {
        return true;
      }

      return false;
    });
  };

  const onClickPickUserAnswer: OnClickPickUserAnswer = (color: PegColor) => {
    const updatedRoundAnswers = allUserAnswers[currentRound].map((element: UserAnswer, index: number) => {
      // Find the first null element in allUserAnswers
      if (index === findFirstNullIndex(allUserAnswers[currentRound]) && !solutionShown) {
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
    dispatch(setAllUserAnswers(allUpdatedUserAnswers));
  };

  const onClickGiveFeedback: OnClickButton = () => {
    // Get the number of correct color in correct position pegs, correct color in incorrect position pegs and completely incorrect pegs for the currentRound
    const numberOfCorrectPositionPegs: number = getNumberOfCorrectPositionPegs(allUserAnswers[currentRound], solutionValue);
    const numberOfIncorrectPositionPegs: number = getNumberOfIncorrectPositionPegs(allUserAnswers[currentRound], solutionValue);

    const updatedRoundFeedback = getUpdatedRoundFeedback(numberOfIncorrectPositionPegs, numberOfCorrectPositionPegs);

    // Update all the pegFeedback
    const updatedAllPegFeedback = allPegFeedback.map((roundPegFeedback: RoundPegFeedback, index: number) => {
      if (index === currentRound) {
        return updatedRoundFeedback;
      }

      return roundPegFeedback;
    });

    dispatch(setAllPegFeedback(updatedAllPegFeedback));

    // If the allUserAnswers array is full of colours, go to the next round
    if (isRoundFull && currentRound !== NumberOfRounds - 1) {
      dispatch(setCurrentRound());
    }

    const areCurrentRoundAnswersCorrect: boolean = updatedAllPegFeedback[currentRound].every((number: number) => number === FeedbackNumbers.correct);

    if (isRoundFull && currentRound === NumberOfRounds - 1 && !areCurrentRoundAnswersCorrect) {
      dispatch(onGameLost());
    }

    if (areCurrentRoundAnswersCorrect) {
      dispatch(onGameWon());
    }
  };

  return (
    <StyledAppContainer>
      <div className="App">
        <GlobalStyle />
        <Score className="mobile-score" />
        <StyledGameContainer>
          <Pegpicker
            isRoundFull={isRoundFull}
            onClickPickUserAnswer={onClickPickUserAnswer}
            onClickGiveFeedback={onClickGiveFeedback} />
          <GameBoard />
          <GameInfo />
        </StyledGameContainer>
        <GameButtons className="mobile-game-buttons" />
      </div>

      <Overlay
        isVisible={winningMessageIsShown}
        delay={1}
        onClickCloseOverlay={() => dispatch(showWinningMessage(false))}>
        <StyledFeedbackContentContainer>
          <img src={happyBeeImage} alt="Happy bee" />
          <h1>Congratulations!</h1>
          <h1>You won, Mastermind.</h1>
          <button type="button" onClick={() => dispatch(resetStatesForNewGame())}>New Game</button>
        </StyledFeedbackContentContainer>
      </Overlay>

      <Overlay
        isVisible={losingMessageIsShown}
        delay={1}
        onClickCloseOverlay={() => dispatch(showLosingMessage(false))}>
        <StyledFeedbackContentContainer>
          <img src={sadDogImage} alt="Sad dog" />
          <h1>You lost...</h1>
          <h1>Better luck next time!</h1>
          <button type="button" onClick={() => dispatch(resetStatesForNewGame())}>New Game</button>
        </StyledFeedbackContentContainer>
      </Overlay>

      <RulesOverlay isVisible={gameRulesShown} />
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
      font-size: 23px;
    }
  }
`;

export default App;
