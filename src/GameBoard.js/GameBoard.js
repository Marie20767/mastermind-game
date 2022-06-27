import styled from 'styled-components';
import Round from './Round';
import Solution from './Solution';

const GameBoard = ({ solution, showSolution }) => {
  return (
    <StyledGameBoardContainer>
      <StyledGameBoard>
        <Solution
          solution={solution}
          showSolution={showSolution} />
        <Round />
      </StyledGameBoard>
    </StyledGameBoardContainer>
  );
};

const StyledGameBoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGameBoard = styled.div`
   background-color: #c4cacc;
   height: 95vh;
   width: 70vh;
   border-radius: 5%;
   border: 1.5px solid black;
`;

export default GameBoard;
