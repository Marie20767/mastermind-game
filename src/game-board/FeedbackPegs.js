/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import styled from 'styled-components';
import Circle from '../Circle';
import { EmptyPegColors, FeedbackNumbers, PegColors } from '../utils/constants';

const FeedbackPegs = ({ roundPegFeedback }) => {
  return (
    <StyledFeedbackPegsContainer>
      {roundPegFeedback.map((number, index) => {
        if (number === FeedbackNumbers.empty) {
          return (
            <Circle
              key={`${FeedbackNumbers.empty}-${index}`}
              color={EmptyPegColors.InnerCircle}
              size={1.5}
              margin="0px 5px 5px 0" />
          );
        }

        if (number === FeedbackNumbers.correct) {
          return (
            <Circle
              key={`${FeedbackNumbers.correct}-${index}`}
              color={PegColors.Red}
              size={1.5}
              margin="0px 5px 5px 0" />
          );
        }

        return (
          <Circle
            key={`${FeedbackNumbers.incorrect}-${index}`}
            color="#fff"
            size={1.5}
            margin="0px 5px 5px 0" />
        );
      })}
    </StyledFeedbackPegsContainer>

  );
};

const StyledFeedbackPegsContainer = styled.div`
  /* TODO: align feedback pegs vertically with pegs */
  display: flex;
  width: 34px;
  flex-wrap: wrap;
  margin-right: 30px;
`;

export default FeedbackPegs;
