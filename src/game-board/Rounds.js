/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Round from './Round';
import { EmptyPegColors } from '../utils/constants';

const Rounds = ({ allUserAnswers, allPegFeedback, currentRound, showSolution }) => {
  return (
    <StyledRoundsContainer>
      {allUserAnswers.map((roundAnswers, index) => {
        const shouldShowArrow = index === currentRound && !showSolution;

        return (
          <Round
            key={`${roundAnswers.join('-')}-${index}`}
            Icon={(
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                fontSize="33px"
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
  margin-top: 35px;
  margin-left: 140px;
`;

export default Rounds;
