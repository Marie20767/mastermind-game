import styled from 'styled-components';
import { faArrowRotateLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import Score from './Score';
import GameInfoButton from './GameInfoButton';

const GameInfo = ({ gamesWon, gamesLost, onClickStartNewGame, onClickShowRules }) => {
  return (
    <StyledGameInfoContainer>
      <StyledNewGameAndRulesContainer>
        <GameInfoButton onClick={onClickStartNewGame} icon={faArrowRotateLeft} toolTipText="Start new game" />
        <GameInfoButton onClick={onClickShowRules} icon={faQuestion} toolTipText="Check game rules" />
      </StyledNewGameAndRulesContainer>
      <Score
        gamesWon={gamesWon}
        gamesLost={gamesLost} />
    </StyledGameInfoContainer>
  );
};

const StyledGameInfoContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const StyledNewGameAndRulesContainer = styled.div`
  display: flex;
`;

export default GameInfo;
