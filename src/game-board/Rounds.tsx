/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Round from './Round';
import { EmptyPegColors } from '../utils/constants';
import { AllPegFeedback, AllUserAnswers, RoundAnswers, ShowSolution } from '../@types';

interface Props {
  allUserAnswers: AllUserAnswers,
  allPegFeedback: AllPegFeedback,
  currentRound: number,
  showSolution: ShowSolution,
}

const Rounds: React.FC<Props> = ({
  allUserAnswers,
  allPegFeedback,
  currentRound,
  showSolution,
}) => {
  return (
    <StyledRoundsContainer>
      {allUserAnswers.map((roundAnswers: RoundAnswers, index: number): React.ReactNode => {
        const shouldShowArrow: boolean = index === currentRound && !showSolution;

        return (
          <Round
            key={`${roundAnswers.join('-')}-${index}`}
            Icon={(
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className="left-arrow-round"
                color={shouldShowArrow ? EmptyPegColors.InnerCircle : 'transparent'} />
            )}
            roundAnswers={roundAnswers}
            roundPegFeedback={allPegFeedback[index]} />
        );
      })}
    </StyledRoundsContainer>
  );
};

const StyledRoundsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  .left-arrow-round {
    font-size: 20px;
    margin-left: 4px;
  }

  @media screen and (min-width: 768px) {
    margin-left: 140px;
    margin-top: 35px;

    .left-arrow-round {
      font-size: 40px;
      margin-left: 0;
    }
  }

  @media screen and (min-width: 1024px) {
    
    .left-arrow-round {
      font-size: 33px;
    }
  }

`;

export default Rounds;
