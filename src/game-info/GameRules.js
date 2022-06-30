import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const GameRules = () => {
  return (
    <StyledGameRulesContainer>
      <button type="button">
        <FontAwesomeIcon icon={faQuestion} />
      </button>
    </StyledGameRulesContainer>
  );
};

const StyledGameRulesContainer = styled.div`
  button {
    display: flex;
    margin-left: 2vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 63px;
    height: 63px;
  }
`;

export default GameRules;
