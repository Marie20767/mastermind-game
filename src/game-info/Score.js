import styled from 'styled-components';

const Score = ({ gamesWon, gamesLost, className }) => {
  return (
    <StyledScoreContainer className={className}>
      <h2>Games won: {gamesWon}</h2>
      <h2>Games lost: {gamesLost} </h2>
    </StyledScoreContainer>
  );
};

const StyledScoreContainer = styled.div`
  margin-top: 2.5vh;
  display: flex;
  justify-content: space-evenly;
  margin-top: 3vh;

  &.desktop-score {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
    }
  }

  &.mobile-score {
    display: flex;
    margin-bottom: 4vh;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export default Score;
