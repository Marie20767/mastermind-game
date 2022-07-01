import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Overlay = ({ imageSource, imageAlt, title1, title2, onClickStartNewGame }) => {
  // Add a transition for the overlay to come in smoother and give user a second to see solution first
  return (
    <StyledOverlayContainer>
      <StyledOverlay />
      <StyledOverlayContent>
        <FontAwesomeIcon icon={faXmark} color="white" className="close-icon" fontSize="33px" />
        <StyledContentContainer>
          <img src={imageSource} alt={imageAlt} />
          <h2>{title1}</h2>
          <h2>{title2}</h2>
          <button type="button" onClick={onClickStartNewGame}>New Game</button>
        </StyledContentContainer>
      </StyledOverlayContent>
    </StyledOverlayContainer>
  );
};

const StyledOverlayContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const StyledOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  border-radius: 15px;
  background-color: black;
  z-index: 1;

  .close-icon {
    align-self: flex-end;
    margin: 2vh 3vh 0 0;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 3vh;

  img {
    margin-bottom: 1vh;
  }

  button {
    margin-top: 4vh;
    padding: 1vh 2vh;
  }

  h2 {
    color: white;
    font-size: 4.5vh;
    letter-spacing: 1.5px;
  }
`;

export default Overlay;

