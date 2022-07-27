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
              onClick={!showSolution ? () => onClickPickUserAnswer(color) : null} />
          );
        })}
      </StyledPegsContainer>
      <StyledButtonContainer>
        <button
          type="button"
          className={getClassNameForDeleteButton()}
          onClick={!showSolution ? onClickDeletePegs : null}>
          Delete
        </button>
        <button
          type="button"
          className={!isRoundFull || showSolution ? 'disabled' : ''}
          onClick={isRoundFull && !showSolution ? onClickGiveFeedback : null}>
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
  align-items: center;

  @media screen and (min-width: 1024px) {
    flex: 1;
    flex-direction: row;
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
    margin: 0 0 15px 0; 
    width: 34px;
    height: 34px;

    @media screen and (min-width: 768px) {
      width: 60px;
      height: 60px;
      margin: 0 0 30px 0; 
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    height: 33px;
    padding: 0 11px;
    margin-bottom: 7px;
    margin-top: 6px;

    &.disabled {
      background-color: #d3d3d3d6;
      color: #bebdbd;
      cursor: initial;
    }

    @media screen and (min-width: 768px) {
      height: 60px;
      padding: 0 18px;
      margin-bottom: 25px;
    }

    @media screen and (min-width: 1024px) {
      height: 50px;
    }
  }
`;

export default Pegpicker;
