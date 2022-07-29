/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import styled from 'styled-components';
import { RoundPegFeedback } from '../@types';
import Circle from '../Circle';
import { EmptyPegColors, FeedbackNumbers, PegColors } from '../utils/constants';

interface Props {
  roundPegFeedback: RoundPegFeedback
}

const FeedbackPegs: React.FC<Props> = ({ roundPegFeedback }) => {
  const [firstPeg, secondPeg, ...lastTwoFeedbackPegs] = roundPegFeedback;
  const firstTwoFeedbackPegs = [firstPeg, secondPeg];

  const renderFeedbackPegs = (feedbackPegs: RoundPegFeedback) => {
    return feedbackPegs.map((number: number, index: number): React.ReactNode => {
      if (number === FeedbackNumbers.empty) {
        return (
          <Circle
            key={`${FeedbackNumbers.empty}-${index}`}
            className="styled-feedback-pegs"
            color={EmptyPegColors.InnerCircle} />
        );
      }

      if (number === FeedbackNumbers.correct) {
        return (
          <Circle
            key={`${FeedbackNumbers.correct}-${index}`}
            className="styled-feedback-pegs"
            color={PegColors.Red} />
        );
      }

      return (
        <Circle
          key={`${FeedbackNumbers.incorrect}-${index}`}
          className="styled-feedback-pegs"
          color="#fff" />
      );
    });
  };

  return (
    <StyledFeedbackContainer>
      <StyledFeedbackPegsSubContainer>
        {renderFeedbackPegs(firstTwoFeedbackPegs)}
      </StyledFeedbackPegsSubContainer>
      <StyledFeedbackPegsSubContainer>
        {renderFeedbackPegs(lastTwoFeedbackPegs)}
      </StyledFeedbackPegsSubContainer>
    </StyledFeedbackContainer>
  );
};

const StyledFeedbackContainer = styled.div`
  margin-top: 4px;
`;

const StyledFeedbackPegsSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 25px;
  margin-left: 8px;

  @media screen and (min-width: 1024px) {
    display: flex;
    width: 34px;
    margin-right: 30px;
  }

  .styled-feedback-pegs {
    height: 9px;
    width: 9px;
    margin: 0 3px 3px 0;

    @media screen and (min-width: 768px) {
      margin: 0 5px 5px 0;
      height: 14px;
      width: 14px;
    }

    @media screen and (min-width: 1024px) {
      height: 12px;
      width: 12px;
    }
  }

`;

export default FeedbackPegs;
