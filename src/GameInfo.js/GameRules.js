import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const GameRules = () => {
  return (
    <StyledGameRulesContainer>
      <button type="button">
        <FontAwesomeIcon icon={faQuestion} />
        Rules
      </button>
    </StyledGameRulesContainer>
  );
};

const StyledGameRulesContainer = styled.div`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vh 2vh;
    font-size: 2.5vh;
  }
`;

export default GameRules;
