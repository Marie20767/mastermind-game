/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../redux/hooks';
import { PegColor } from '../@types';
import Circle from '../Circle';

const Solution: React.FC = () => {
  const { solutionValue, solutionShown } = useAppSelector((state) => state.game);

  return (
    <StyledSolutionContainer>
      {solutionValue.map((color: PegColor, index: number): React.ReactNode => {
        if (solutionShown) {
          return (
            <Circle
              key={`${color}-${index}`}
              testId={`solution-${index}-${color}`}
              className="styled-solution-pegs"
              color={color} />
          );
        }

        return (
          <Circle
            key={`transparent-${index}`}
            testId={`solution-${index}-transparent`}
            className="styled-solution-pegs"
            color="transparent">
            <FontAwesomeIcon
              className="question-mark-icon"
              icon={faQuestion} />
          </Circle>
        );
      })}
    </StyledSolutionContainer>
  );
};

const StyledSolutionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 24px;

  @media screen and (min-width: 768px) {
    margin-right: 59px
  }

  @media screen and (min-width: 1024px) {
    margin-left: 176px;
    margin-right: 0;
  }

  .styled-solution-pegs {
    margin: 0 8px 13px 0;
    height: 30px;
    width: 30px;

    @media screen and (min-width: 768px) {
      margin: 0 18px 0 0;
      height: 60px;
      width: 60px;
    }

    @media screen and (min-width: 1024px) {
      margin: 0 28px 0 0;
      height: 48px;
      width: 48px;
    }
  }

  .question-mark-icon {
    font-size: 18px;

    @media screen and (min-width: 768px) {
      font-size: 30px
    }

    @media screen and (min-width: 1024px) {
      font-size: 25px
    }
  }
`;

export default Solution;
