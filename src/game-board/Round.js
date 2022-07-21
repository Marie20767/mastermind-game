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
  margin-bottom: 2vh;

  @media screen and (min-width: 1024px) {
    margin-bottom: 2.5vh;
  }

  .styled-round-outer-circle {
    margin: 0 8px 0 0;
    height: 34px;
    width: 34px;

    @media screen and (min-width: 1024px) {
      margin: 0 28px 0 0;
      height: 6vh;
      width: 6vh;
    }
  }

  .styled-round-inner-circle {
    height: 1vh;
    width: 1vh;

    @media screen and (min-width: 1024px) {
      height: 1.5vh;
      width: 1.5vh;
    }
  }
`;

export default Round;
