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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGameBoard = styled.div`
   display: flex;
   flex-direction: column;
   padding: 30px 8px 15px 8px;
   background-color: #c4cacc;
   border-radius: 5%;
   border: 1.5px solid black;
   margin-left: 2vh;

   @media screen and (min-width: 1024px) {
    align-items: center;
    height: 95vh;
    margin: 0;
    width: 80vh;
   }
`;

const StyledGameTitleContainer = styled.div`
  display: none;
  @media screen and (min-width: 1024px) {
    display: block;
    position: absolute;
    left: 0.20vh;
    bottom: 9.5vh;
    border-radius: 0 15px 15px 0;
    background-color: #64a4b8;
    height: 80vh;
    width: 18vh;
  }
  
`;

const StyledGameTitle = styled.div`
  @media screen and (min-width: 1024px) {
    /* display: block; */
    font-family: 'Ubuntu', sans-serif;
    transform: rotate(-90deg) translateX(-440px);
    font-size: 10vh;
    -webkit-text-fill-color:  #eceadb;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black; 
  }
`;

export default GameBoard;
