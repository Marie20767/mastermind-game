import styled from 'styled-components';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

const Pegpicker = ({
  onClickPickUserAnswer,
  currentRound, allUserAnswers,
  setAllUserAnswers,
  onClickGiveFeedback,
  isArrayFullofColors,
  showSolution,
}) => {
  const onClickDeletePegs = () => {
    const updatedRoundAnswers = allUserAnswers.map((roundAnswers, index) => {
      //  currentRound !== 8 to make sure you can't delete pegs after last round
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
              size={7}
              margin="0 0 30px 0px"
              color={color}
              clickable
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
          className={!isArrayFullofColors ? 'disabled' : ''}
          onClick={isArrayFullofColors ? onClickGiveFeedback : null}>
          Check
        </button>
      </StyledButtonContainer>
    </StyledPegpickerContainer>
  );
};

const StyledPegpickerContainer = styled.div`
  flex: 1;
  justify-content: space-evenly;
  display: flex;
  align-items: center;
`;

const StyledPegsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    height: 50px;
    padding: 0 1.7vh;
    margin-bottom: 3vh;

    &.disabled {
      background-color: #d3d3d3d6;
      color: #bebdbd;
      cursor: initial;
    }
  }
`;

export default Pegpicker;
