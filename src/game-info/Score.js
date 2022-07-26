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
  margin-top: 25px;
  display: flex;
  justify-content: space-evenly;

  &.desktop-score {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
      margin-top: 15px;
    }
  }

  &.mobile-score {
    display: flex;
    margin-left: 75px;

    @media screen and (min-width: 768px) {
      margin-left: 130px;
    }

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export default Score;
