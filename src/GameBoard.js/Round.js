/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Circle from '../Circle';
import { EmptyPegColors } from '../utils/constants';
import FeedbackPegs from './FeedbackPegs';

const Round = ({ roundAnswers, roundPegFeedback }) => {
  return (
    <StyledRoundContainer>
      <FeedbackPegs roundPegFeedback={roundPegFeedback} />
      {roundAnswers.map((color, index) => {
        if (color !== null) {
          return (
            <Circle
              key={`${color}-${index}`}
              color={color}
              margin="0 20px 0 0" />
          );
        }

        return (
          <Circle
            key={`${color}-${index}`}
            color={EmptyPegColors.OuterCircle}
            margin="0 20px 0 0">
            <Circle
              color={EmptyPegColors.InnerCircle}
              size={1.5} />
          </Circle>
        );
      })}
    </StyledRoundContainer>
  );
};

const StyledRoundContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5vh;
`;

export default Round;
