/* eslint-disable quote-props */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AllPegFeedback, AllUserAnswers, PegColor } from '../../@types';
import { getLocalStorageValue, localStorageSetItems } from '../../utils/storage';
import { generateInitialPegFeedbackState, generateInitialUserAnswersState, generateRandomSolution } from '../../utils/game-utils';

interface gameState {
  solutionValue: PegColor[],
  solutionShown: boolean,
  gamesWon: number,
  gamesLost: number,
  gameRulesShown: boolean,
  losingMessageIsShown: boolean,
  winningMessageIsShown: boolean,
  allPegFeedback: AllPegFeedback,
  allUserAnswers: AllUserAnswers,
  currentRound: number,
}

const userHasPlayedGameBefore = !!localStorage.getItem('user-answers') || !!localStorage.getItem('won-games') || !!localStorage.getItem('lost-games');

const initialState : gameState = {
  solutionValue: getLocalStorageValue('solution', generateRandomSolution()),
  solutionShown: getLocalStorageValue('show-solution', false),
  gamesWon: getLocalStorageValue('won-games', 0),
  gamesLost: getLocalStorageValue('lost-games', 0),
  gameRulesShown: !userHasPlayedGameBefore,
  losingMessageIsShown: false,
  winningMessageIsShown: false,
  allPegFeedback: getLocalStorageValue('peg-feedback', generateInitialPegFeedbackState()),
  allUserAnswers: getLocalStorageValue('user-answers', generateInitialUserAnswersState()),
  currentRound: getLocalStorageValue('current-round', 0),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    showGamesRules: (state, action) => {
      state.gameRulesShown = action.payload;
    },

    showLosingMessage: (state, action) => {
      state.losingMessageIsShown = action.payload;
    },

    showWinningMessage: (state, action) => {
      state.winningMessageIsShown = action.payload;
    },

    setAllPegFeedback: (state, action) => {
      state.allPegFeedback = action.payload;
      localStorage.setItem('peg-feedback', JSON.stringify(action.payload));
    },

    setAllUserAnswers: (state, action) => {
      state.allUserAnswers = action.payload;
      localStorage.setItem('user-answers', JSON.stringify(action.payload));
    },

    setCurrentRound: (state) => {
      const newCurrentRound = state.currentRound + 1;

      state.currentRound = newCurrentRound;
      localStorage.setItem('current-round', JSON.stringify(newCurrentRound));
    },

    onGameLost: (state) => {
      state.solutionShown = true;
      state.losingMessageIsShown = true;

      const newGamesLostScore = state.gamesLost + 1;

      state.gamesLost = newGamesLostScore;
      localStorage.setItem('lost-games', JSON.stringify(newGamesLostScore));
      localStorage.setItem('show-solution', JSON.stringify(true));
    },

    onGameWon: (state) => {
      state.solutionShown = true;
      localStorage.setItem('show-solution', JSON.stringify(true));
      state.winningMessageIsShown = true;

      const newGamesWonScore = state.gamesWon + 1;

      state.gamesWon = newGamesWonScore;
      localStorage.setItem('won-games', JSON.stringify(newGamesWonScore));
      localStorage.setItem('show-solution', JSON.stringify(true));
    },

    resetStatesForNewGame: (state) => {
      state.currentRound = 0;
      state.solutionShown = false;
      state.solutionValue = generateRandomSolution();
      state.allPegFeedback = generateInitialPegFeedbackState();
      state.allUserAnswers = generateInitialUserAnswersState();
      state.winningMessageIsShown = false;
      state.losingMessageIsShown = false;

      localStorageSetItems({
        'current-round': 0,
        'show-solution': false,
        'solution': state.solutionValue,
        'peg-feedback': state.allPegFeedback,
        'user-answers': state.allUserAnswers,
      });
    },
  },
});

export const {
  showGamesRules,
  showLosingMessage,
  showWinningMessage,
  setAllPegFeedback,
  setAllUserAnswers,
  setCurrentRound,
  resetStatesForNewGame,
  onGameLost,
  onGameWon,
} = gameSlice.actions;
export default gameSlice.reducer;
