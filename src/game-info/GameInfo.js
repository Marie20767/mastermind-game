import styled from 'styled-components';
import Score from './Score';
import GameButtons from './GameButtons';

const GameInfo = ({ gamesWon, gamesLost, onClickStartNewGame, onClickShowRules }) => {
  return (
    <StyledGameInfoContainer>
      <GameButtons
        className="desktop-game-buttons"
        onClickStartNewGame={onClickStartNewGame}
        onClickShowRules={onClickShowRules} />
      <Score
        className="desktop-score"
        gamesWon={gamesWon}
        gamesLost={gamesLost} />
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
