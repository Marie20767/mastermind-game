import React from 'react';
import styled from 'styled-components';

import { faArrowRotateLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../redux/hooks';
import { resetStatesForNewGame, showGamesRules } from '../redux/reducers/game';

import GameInfoButton from './GameInfoButton';

interface Props {
  className: string,
}

const GameButtons: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();

  return (
    <StyledNewGameAndRulesContainer className={className}>
      <GameInfoButton
        onClick={() => dispatch(resetStatesForNewGame())}
        icon={faArrowRotateLeft}
        toolTipText="Start new game"
        testId="restart" />
      <GameInfoButton
        onClick={() => dispatch(showGamesRules(true))}
        icon={faQuestion}
        toolTipText="Check game rules" />
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
