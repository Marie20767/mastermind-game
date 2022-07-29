import { faArrowRotateLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import { OnClickButton } from '../@types';
import GameInfoButton from './GameInfoButton';

interface Props {
  className: string,
  onClickStartNewGame: OnClickButton,
  onClickShowRules: OnClickButton,
}

const GameButtons: React.FC<Props> = ({ className, onClickStartNewGame, onClickShowRules }) => {
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
    margin: 10px 0 25px 100px;

    @media screen and (min-width: 768px) {
      margin: 30px 0 15px 130px;
    }

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export default GameButtons;
