import styled from 'styled-components';
import Rounds from './Rounds';
import Solution from './Solution';

const GameBoard = ({ allUserAnswers, solution, showSolution, allPegFeedback }) => {
  return (
    <StyledGameBoardContainer>
      <StyledGameBoard>
        <StyledGameTitle />
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
  position: relative;
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
   width: 80vh;
   border-radius: 5%;
   border: 1.5px solid black;
`;

const StyledGameTitle = styled.div`
  position: absolute;
  left: 0.20vh;
  bottom: 9.5vh;
  border-radius: 0 15px 15px 0;
  background-color: #64a4b8;
  height: 80vh;
  width: 18vh;
`;

export default GameBoard;
