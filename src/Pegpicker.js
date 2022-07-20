import styled from 'styled-components';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

const Pegpicker = ({
  currentRound,
  allUserAnswers,
  setAllUserAnswers,
  showSolution,
  isRoundFull,
  onClickPickUserAnswer,
  onClickGiveFeedback,

}) => {
  const onClickDeletePegs = () => {
    const updatedRoundAnswers = allUserAnswers.map((roundAnswers, index) => {
      if (index === currentRound) {
        return [null, null, null, null];
      }

      return roundAnswers;
    });

    setAllUserAnswers(updatedRoundAnswers);
  };

  const getClassNameForDeleteButton = () => {
    const areAllPegsEmpty = allUserAnswers[currentRound].every((roundAnswer) => roundAnswer === null);

    if (areAllPegsEmpty || showSolution) {
      return 'disabled';
    }

    return '';
  };

  return (
    <StyledPegpickerContainer>
      <StyledPegsContainer>
        {PegHexCodes.map((color) => {
          return (
            <Circle
              key={color}
              color={color}
              className="styled-pegpicker"
              onClick={() => onClickPickUserAnswer(color)} />
          );
        })}
      </StyledPegsContainer>
      <StyledButtonContainer>
        <button
          type="button"
          className={getClassNameForDeleteButton()}
          onClick={onClickDeletePegs}>
          Delete
        </button>
        <button
          type="button"
          className={!isRoundFull || showSolution ? 'disabled' : ''}
          onClick={isRoundFull ? onClickGiveFeedback : null}>
          Check
        </button>
      </StyledButtonContainer>
    </StyledPegpickerContainer>
  );
};

const StyledPegpickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    flex: 1;
    justify-content: space-evenly;
    display: flex;
    align-items: center;
  }
`;

const StyledPegsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .styled-pegpicker {
    cursor: pointer;   
    margin: 0 0 20px 0; 
    width: 5vh;
    height: 5vh;

    @media screen and (min-width: 1024px) {
      width: 7vh;
      height: 7vh;
      margin: 0 0 30px 0; 
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    height: 30px;
    padding: 0 1vh;
    margin-bottom: 1.5vh;

    &.disabled {
      background-color: #d3d3d3d6;
      color: #bebdbd;
      cursor: initial;
    }

    @media screen and (min-width: 1024px) {
      height: 50px;
      padding: 0 1.7vh;
      margin-bottom: 3vh;
    }
  }
`;

export default Pegpicker;
