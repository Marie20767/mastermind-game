import React from 'react';
import GameBoard from './GameBoard.js/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker />
      <GameBoard />
    </div>
  );
};

export default App;
