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
   margin-left: 15px;

   @media screen and (min-width: 768px) {
    width: 620px;
    height: 900px;
   }

   @media screen and (min-width: 1024px) {
    align-items: center;
    height: 730px;
    margin: 0;
    width: 620px;
   }
`;

const StyledGameTitleContainer = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    position: absolute;
    left: 17px;
    bottom: 60px;
    border-radius: 0 15px 15px 0;
    background-color: #64a4b8;
    height: 770px;
    width: 130px;
  }

  @media screen and (min-width: 1024px) {
    left: 1px;
    height: 600px;
  }
  
`;

const StyledGameTitle = styled.div`
  @media screen and (min-width: 768px) {
    font-family: 'Ubuntu', sans-serif;
    margin-top: 130px;
    font-size: 8vh;
    transform: rotate(-90deg) translateX(-440px);
    -webkit-text-fill-color:  #eceadb;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black; 
  }

  @media screen and (min-width: 1024px) {
    font-size: 10vh;
    margin-top: 0;
  }
`;

export default GameBoard;
