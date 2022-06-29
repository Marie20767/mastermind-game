import styled from 'styled-components';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

const Pegpicker = ({ onClickPickUserAnswer, currentRound, allUserAnswers, setAllUserAnswers, onClickGiveFeedback, isArrayFullofColors }) => {
  const onClickDeletePegs = () => {
    const updatedRoundAnswers = allUserAnswers.map((roundAnswers, index) => {
      if (index === currentRound) {
        return [null, null, null, null];
      }

      return roundAnswers;
    });

    setAllUserAnswers(updatedRoundAnswers);
  };

  return (
    <StyledPegpickerContainer>
      <StyledPegsContainer>
        {PegHexCodes.map((color) => {
          return (
            <Circle
              key={color}
              size={7}
              margin="0 0 30px 90px"
              color={color}
              clickable
              onClick={() => onClickPickUserAnswer(color)} />
          );
        })}
      </StyledPegsContainer>
      <StyledButtonContainer>
        <button type="button" onClick={onClickDeletePegs}>Delete</button>
        {/* TODO: When you filled up one round, the check button should be highlighted to show that you need to check your result */}
        <button type="button" onClick={isArrayFullofColors ? onClickGiveFeedback : null}>Check</button>
      </StyledButtonContainer>
    </StyledPegpickerContainer>
  );
};

const StyledPegpickerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPegsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    margin-left: 60px;
    height: 50px;
    padding: 0 1.7vh;
    font-size: 2.5vh;
    margin-bottom: 3vh;
  }
`;

export default Pegpicker;
