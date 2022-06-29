import styled from 'styled-components';
import PlayNewGame from './PlayNewGame';
import GameRules from './GameRules';
import Score from './Score';
import PostGameFeedback from './PostGameFeedback';

const GameInfo = ({ onClickStartNewGame, gamesWon, gamesLost }) => {
  return (
    <StyledGameInfoContainer>
      <PlayNewGame onClickStartNewGame={onClickStartNewGame} />
      <GameRules />
      <PostGameFeedback />
      <Score
        gamesWon={gamesWon}
        gamesLost={gamesLost} />
    </StyledGameInfoContainer>
  );
};

const StyledGameInfoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export default GameInfo;
