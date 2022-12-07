/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { AllUserAnswers, IsRoundFull, OnClickButton, OnClickPickUserAnswer, PegColor, RoundAnswers, SetAllUserAnswers, ShowSolution } from './@types';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

interface Props {
  currentRound: number,
  allUserAnswers: AllUserAnswers,
  setAllUserAnswers: SetAllUserAnswers,
  showSolution: ShowSolution,
  isRoundFull: IsRoundFull,
  onClickPickUserAnswer: OnClickPickUserAnswer,
  onClickGiveFeedback: OnClickButton,
}

const Pegpicker: React.FC<Props> = ({
  currentRound,
  allUserAnswers,
  setAllUserAnswers,
  showSolution,
  isRoundFull,
  onClickPickUserAnswer,
  onClickGiveFeedback,
}) => {
  const onClickDeletePegs: OnClickButton = () => {
    const updatedRoundAnswers = allUserAnswers.map((roundAnswers: RoundAnswers, index: number) => {
      if (index === currentRound) {
        return [null, null, null, null];
      }

      return roundAnswers;
    });

    setAllUserAnswers(updatedRoundAnswers);
  };

  const getClassNameForDeleteButton = (): string => {
    const areAllPegsEmpty = allUserAnswers[currentRound].every((roundAnswer) => roundAnswer === null);

    if (areAllPegsEmpty || showSolution) {
      return 'disabled';
    }

    return '';
  };

  return (
    <StyledPegpickerContainer>
      <StyledPegsContainer>
        {PegHexCodes.map((color: PegColor, index: number): React.ReactNode => {
          return (
            <Circle
              key={`${color}-${index}`}
              testId={`pegpicker-${color}`}
              color={color}
              className="styled-pegpicker"
              onClick={!showSolution ? () => onClickPickUserAnswer(color) : undefined} />
          );
        })}
      </StyledPegsContainer>
      <StyledButtonContainer>
        <button
          type="button"
          className={getClassNameForDeleteButton()}
          onClick={!showSolution ? onClickDeletePegs : undefined}>
          Delete
        </button>
        <button
          type="button"
          className={!isRoundFull || showSolution ? 'disabled' : ''}
          onClick={isRoundFull && !showSolution ? onClickGiveFeedback : undefined}>
          Check
        </button>
      </StyledButtonContainer>
    </StyledPegpickerContainer>
  );
};

const StyledPegpickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1024px) {
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly;
    display: flex;
    align-items: center;
  }
`;

const StyledPegsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .styled-pegpicker {
    cursor: pointer;   
    margin: 0 0 15px 0; 
    width: 34px;
    height: 34px;

    @media screen and (min-width: 768px) {
      width: 55px;
      height: 55px;
      margin: 0 0 30px 0; 
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  button {
    height: 33px;
    padding: 0 11px;
    margin-bottom: 7px;
    margin-top: 6px;

    &.disabled {
      background-color: #d3d3d3d6;
      color: #bebdbd;
      cursor: initial;
    }

    @media screen and (min-width: 768px) {
      height: 60px;
      padding: 0 18px;
      margin-bottom: 25px;
    }

    @media screen and (min-width: 1024px) {
      height: 50px;
    }
  }
`;

export default Pegpicker;
