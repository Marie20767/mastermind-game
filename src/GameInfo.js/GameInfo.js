import styled from 'styled-components';
import PlayNewGame from './PlayNewGame';
import GameRules from './GameRules';
import Score from './Score';
import PostGameFeedback from './PostGameFeedback';

const GameInfo = ({ onClickStartNewGame, gamesWon, gamesLost, showWinningMessage, showLosingMessage }) => {
  return (
    <StyledGameInfoContainer>
      <StyledNewGameAndRulesContainer>
        <PlayNewGame onClickStartNewGame={onClickStartNewGame} />
        <GameRules />
      </StyledNewGameAndRulesContainer>
      <PostGameFeedback
        showWinningMessage={showWinningMessage}
        showLosingMessage={showLosingMessage} />
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

const StyledNewGameAndRulesContainer = styled.div`
  display: flex;
`;

export default GameInfo;
