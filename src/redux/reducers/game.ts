/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AllPegFeedback, AllUserAnswers, PegColor } from '../../@types';
import { getLocalStorageValue } from '../../utils/storage';
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
  gamesLost: getLocalStorageValue('won-games', 0),
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
    setSolution: (state, action) => {
      state.solutionValue = action.payload;
    },

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
    },

    setAllUserAnswers: (state, action) => {
      state.allUserAnswers = action.payload;
    },

    setCurrentRound: (state) => {
      const newCurrentRound = state.currentRound + 1;

      state.currentRound = newCurrentRound;
    },

    resetStatesForNewGame: (state) => {
      state.currentRound = 0;
      state.solutionShown = false;
      state.solutionValue = generateRandomSolution();
      state.allPegFeedback = generateInitialPegFeedbackState();
      state.allUserAnswers = generateInitialUserAnswersState();
      state.winningMessageIsShown = false;
      state.losingMessageIsShown = false;
    },

    onGameLost: (state) => {
      state.solutionShown = true;
      state.losingMessageIsShown = true;

      const newGamesLostScore = state.gamesLost + 1;

      state.gamesLost = newGamesLostScore;
    },

    onGameWon: (state) => {
      state.solutionShown = true;
      state.winningMessageIsShown = true;

      const newGamesWonScore = state.gamesWon + 1;

      state.gamesWon = newGamesWonScore;
    },
  },
});

export const {
  setSolution,
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
