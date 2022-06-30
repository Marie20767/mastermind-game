import styled from 'styled-components';

const Score = ({ gamesWon, gamesLost }) => {
  return (
    <StyledScoreContainer>
      <h2>Games won: {gamesWon}</h2>
      <h2>Games lost: {gamesLost} </h2>
    </StyledScoreContainer>

  );
};

const StyledScoreContainer = styled.div`
  margin-top: 2.5vh;
`;

export default Score;
