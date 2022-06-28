import styled from 'styled-components';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

const Pegpicker = ({ onClickPickUserAnswer, setUserAnswers, onClickGiveFeedback, isArrayFullofColors }) => {
  const onClickDeletePegs = () => {
    setUserAnswers([null, null, null, null]);
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
`;

export default Pegpicker;
