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
  margin-top: 1.5vh;
  display: flex;
  justify-content: center;

  &.desktop-score {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
    }
  }

  &.mobile-score {
    display: flex;
    margin-bottom: 2.5vh;
    margin-left: 10vh;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export default Score;
