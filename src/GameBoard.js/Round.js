/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Circle from '../Circle';
import { EmptyPegColors } from '../utils/constants';
import FeedbackPegs from './FeedbackPegs';

const Round = ({ userAnswers, pegFeedback }) => {
  return (
    <StyledRoundContainer>
      <FeedbackPegs pegFeedback={pegFeedback} />
      {userAnswers.map((color, index) => {
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
  justify-content: flex-end;
  align-items: center;
`;

export default Round;
