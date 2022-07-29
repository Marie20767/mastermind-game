/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { RoundPegFeedback, RoundAnswers, UserAnswer } from '../@types';
import Circle from '../Circle';
import { EmptyPegColors } from '../utils/constants';
import FeedbackPegs from './FeedbackPegs';

interface Props {
  Icon: React.ReactNode,
  roundAnswers: RoundAnswers,
  roundPegFeedback: RoundPegFeedback
}

const Round: React.FC<Props> = ({ Icon, roundAnswers, roundPegFeedback }) => {
  return (
    <StyledRoundContainer>
      <FeedbackPegs roundPegFeedback={roundPegFeedback} />
      {roundAnswers.map((color: UserAnswer, index: number): React.ReactNode => {
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

  @media screen and (min-width: 768px) {
    margin-bottom: 18px;
  }

  .styled-round-outer-circle {
    margin: 0 8px 0 0;
    height: 30px;
    width: 30px;

    @media screen and (min-width: 768px) {
      margin: 0 18px 0 0;
      height: 60px;
      width: 60px
    }

    @media screen and (min-width: 1024px) {
      margin: 0 28px 0 0;
      height: 48px;
      width: 48px
    }
  }

  .styled-round-inner-circle {
    height: 7px;
    width: 7px;

    @media screen and (min-width: 768px) {
      height: 12px;
      width: 12px;
    }
  }
`;

export default Round;
