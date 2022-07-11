import styled from 'styled-components';
import Rounds from './Rounds';
import Solution from './Solution';

const GameBoard = ({ allUserAnswers, currentRound, solution, showSolution, allPegFeedback }) => {
  return (
    <StyledGameBoardContainer>
      <StyledGameBoard>
        <StyledGameTitleContainer>
          <StyledGameTitle>
            MASTERMIND
          </StyledGameTitle>
        </StyledGameTitleContainer>
        <Solution
          solution={solution}
          showSolution={showSolution} />
        <Rounds
          allUserAnswers={allUserAnswers}
          currentRound={currentRound}
          allPegFeedback={allPegFeedback}
          showSolution={showSolution} />
      </StyledGameBoard>
    </StyledGameBoardContainer>
  );
};

const StyledGameBoardContainer = styled.div`
  position: relative;
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

const StyledGameTitleContainer = styled.div`
  position: absolute;
  left: 0.20vh;
  bottom: 9.5vh;
  border-radius: 0 15px 15px 0;
  background-color: #64a4b8;
  height: 80vh;
  width: 18vh;
`;

const StyledGameTitle = styled.div`
font-family: 'Ubuntu', sans-serif;
  transform: rotate(-90deg) translateX(-440px);
  font-size: 10vh;
  -webkit-text-fill-color:  #eceadb;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
`;

export default GameBoard;
