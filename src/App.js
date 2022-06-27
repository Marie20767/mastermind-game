import React, { useState } from 'react';
import GameBoard from './GameBoard.js/GameBoard';
import GlobalStyle from './GlobalStyle';
import Pegpicker from './Pegpicker';
import { generateRandomSolution } from './utils/game-utils';

const App = () => {
  const [solution, setSolution] = useState(generateRandomSolution());
  const [userAnswers, setUserAnswers] = useState([null, null, null, null]);
  const [showSolution, setShowSolution] = useState(false);

  const onClickPickUserAnswer = (color) => {
    // find the first null element
    const indexOfFirstNullElement = userAnswers.findIndex((element) => {
      if (element === null) {
        return true;
      }

      return false;
    });

    // replace that index with the color
    const updatedUserAnswers = userAnswers.map((element, index) => {
      if (index === indexOfFirstNullElement) {
        return color;
      }

      return element;
    });

    // when the userAnswer array is full with colors, show the solution
    setUserAnswers(updatedUserAnswers);
    if (updatedUserAnswers.every((element) => element !== null)) {
      setShowSolution(true);
    }
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Pegpicker onClickPickUserAnswer={onClickPickUserAnswer} />
      <GameBoard
        solution={solution}
        showSolution={showSolution} />
    </div>
  );
};

export default App;
