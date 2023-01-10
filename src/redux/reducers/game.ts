/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PegColor } from '../../@types';
import { getLocalStorageValue } from '../../utils/storage';
import { generateRandomSolution } from '../../utils/game-utils';

interface gameState {
  solutionValue: PegColor[],
  solutionShown: boolean,
  gamesWon: number,
  gamesLost: number,
  gameRulesShown: boolean,
}

const userHasPlayedGameBefore = !!localStorage.getItem('user-answers') || !!localStorage.getItem('won-games') || !!localStorage.getItem('lost-games');

const initialState : gameState = {
  solutionValue: getLocalStorageValue('solution', generateRandomSolution()),
  solutionShown: getLocalStorageValue('show-solution', false),
  gamesWon: getLocalStorageValue('won-games', 0),
  gamesLost: getLocalStorageValue('won-games', 0),
  gameRulesShown: !userHasPlayedGameBefore,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSolution: (state, action) => {
      state.solutionValue = action.payload;
    },

    showSolution: (state, action) => {
      state.solutionShown = action.payload;
    },

    calculateGamesWon: (state, action) => {
      state.gamesWon = action.payload;
    },

    calculateGamesLost: (state, action) => {
      state.gamesLost = action.payload;
    },

    showGamesRules: (state, action) => {
      state.gameRulesShown = action.payload;
    },
  },
});

export const {
  setSolution,
  showSolution,
  calculateGamesWon,
  calculateGamesLost,
  showGamesRules,
} = gameSlice.actions;
export default gameSlice.reducer;
