import styled from 'styled-components';
import Round from './Round';
import Solution from './Solution';

const GameBoard = ({ userAnswers, solution, showSolution, pegFeedback }) => {
  return (
    <StyledGameBoardContainer>
      <StyledGameBoard>
        <Solution
          solution={solution}
          showSolution={showSolution} />
        <Round
          userAnswers={userAnswers}
          pegFeedback={pegFeedback} />
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
   width: 75vh;
   border-radius: 5%;
   border: 1.5px solid black;
`;

export default GameBoard;
