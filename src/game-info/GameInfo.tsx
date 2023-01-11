import React from 'react';
import styled from 'styled-components';

import Score from './Score';
import GameButtons from './GameButtons';

const GameInfo: React.FC = () => {
  return (
    <StyledGameInfoContainer>
      <GameButtons className="desktop-game-buttons" />
      <Score
        className="desktop-score" />
    </StyledGameInfoContainer>
  );
};

const StyledGameInfoContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;

@media screen and (min-width: 1024px) {
  flex: 1;
}
`;

export default GameInfo;
