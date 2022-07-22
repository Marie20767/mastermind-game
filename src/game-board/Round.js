/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Circle from '../Circle';
import { EmptyPegColors } from '../utils/constants';
import FeedbackPegs from './FeedbackPegs';

const Round = ({ Icon, roundAnswers, roundPegFeedback }) => {
  return (
    <StyledRoundContainer>
      <FeedbackPegs roundPegFeedback={roundPegFeedback} />
      {roundAnswers.map((color, index) => {
        if (color !== null) {
          return (
            <Circle
              key={`${color}-${index}`}
              className="styled-round-outer-circle"
              color={color} />
          );
        }

        return (
          <Circle
            key={`${color}-${index}`}
            className="styled-round-outer-circle"
            color={EmptyPegColors.OuterCircle}>
            <Circle
              color={EmptyPegColors.InnerCircle}
              className="styled-round-inner-circle" />
          </Circle>
        );
      })}
      {Icon}
    </StyledRoundContainer>
  );
};

const StyledRoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;

  @media screen and (min-width: 1024px) {
    margin-bottom: 18px;
  }

  .styled-round-outer-circle {
    margin: 0 8px 0 0;
    height: 34px;
    width: 34px;

    @media screen and (min-width: 1024px) {
      margin: 0 28px 0 0;
      height: 48px;
      width: 48px
    }
  }

  .styled-round-inner-circle {
    height: 7px;
    width: 7px;

    @media screen and (min-width: 1024px) {
      height: 12px;
      width: 12px;
    }
  }
`;

export default Round;
