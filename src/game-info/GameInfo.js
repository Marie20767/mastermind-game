import styled from 'styled-components';
import Score from './Score';
import GameButtons from './GameButtons';

const GameInfo = ({ gamesWon, gamesLost, onClickStartNewGame, onClickShowRules }) => {
  return (
    <StyledGameInfoContainer>
      <GameButtons
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
flex: 1;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`;

export default GameInfo;
