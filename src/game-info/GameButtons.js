import { faArrowRotateLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import GameInfoButton from './GameInfoButton';

const GameButtons = ({ className, onClickStartNewGame, onClickShowRules }) => {
  return (
    <StyledNewGameAndRulesContainer className={className}>
      <GameInfoButton onClick={onClickStartNewGame} icon={faArrowRotateLeft} toolTipText="Start new game" />
      <GameInfoButton onClick={onClickShowRules} icon={faQuestion} toolTipText="Check game rules" />
    </StyledNewGameAndRulesContainer>
  );
};

const StyledNewGameAndRulesContainer = styled.div`
  display: flex;

  &.desktop-game-buttons {
    display: none;

    @media screen and (min-width: 1024px) {
      display: flex;
    }
  }

  &.mobile-game-buttons {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 3vh 0 3vh 10vh;

    @media screen and (min-width: 1024px) {
      display: none;
      margin: 3vh 0;
    }
  }
`;

export default GameButtons;
