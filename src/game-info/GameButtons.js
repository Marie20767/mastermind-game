import { faArrowRotateLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import GameInfoButton from './GameInfoButton';

const GameButtons = ({ onClickStartNewGame, onClickShowRules }) => {
  return (
    <StyledNewGameAndRulesContainer>
      <GameInfoButton onClick={onClickStartNewGame} icon={faArrowRotateLeft} toolTipText="Start new game" />
      <GameInfoButton onClick={onClickShowRules} icon={faQuestion} toolTipText="Check game rules" />
    </StyledNewGameAndRulesContainer>
  );
};

const StyledNewGameAndRulesContainer = styled.div`
  display: flex;
`;

export default GameButtons;
