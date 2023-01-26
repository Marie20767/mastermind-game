import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../redux/hooks';

interface Props {
  className: string
}

const Score: React.FC<Props> = ({ className }) => {
  const { gamesWon, gamesLost } = useAppSelector((state) => state.game);

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
    margin-left: 78px;
    margin-top: 6px;

    @media screen and (min-width: 768px) {
      margin-left: 130px;
    }

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }
`;

export default Score;
