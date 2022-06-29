import styled from 'styled-components';
import Rounds from './Rounds';
import Solution from './Solution';

const GameBoard = ({ allUserAnswers, solution, showSolution, allPegFeedback }) => {
  return (
    <StyledGameBoardContainer>
      <StyledGameBoard>
        <StyledGameName />
        <Solution
          solution={solution}
          showSolution={showSolution} />
        <Rounds
          allUserAnswers={allUserAnswers}
          allPegFeedback={allPegFeedback} />
      </StyledGameBoard>
    </StyledGameBoardContainer>
  );
};

const StyledGameBoardContainer = styled.div`
  margin-right: 320px;
  margin-left: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGameBoard = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   padding-bottom: 60px;
   padding-top: 30px;
   background-color: #c4cacc;
   height: 95vh;
   width: 90vh;
   border-radius: 5%;
   border: 1.5px solid black;
`;

const StyledGameName = styled.div`
  position: absolute;
  left: 5vh;
  border-radius: 10%;
  background-color: #64a4b8;
  height: 95vh;
  width: 10vh;
`;

export default GameBoard;
