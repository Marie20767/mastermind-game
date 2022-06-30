import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

const PlayNewGame = ({ onClickStartNewGame }) => {
  return (
    <StyledPlayNewGameContainer>
      <button type="button" onClick={onClickStartNewGame}>
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>
    </StyledPlayNewGameContainer>
  );
};

const StyledPlayNewGameContainer = styled.div`
  button {
    display: flex;
    margin-right: 1vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 63px;
    height: 63px;
  }
`;

export default PlayNewGame;
