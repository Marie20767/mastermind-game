import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

const PlayNewGame = ({ onClickStartNewGame }) => {
  return (
    <StyledPlayNewGameContainer>
      <button type="button" onClick={onClickStartNewGame}>
        <FontAwesomeIcon icon={faArrowRotateLeft} />
        New game
      </button>
    </StyledPlayNewGameContainer>
  );
};

const StyledPlayNewGameContainer = styled.div`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vh 2vh;
    font-size: 2.5vh;
  }
`;

export default PlayNewGame;
