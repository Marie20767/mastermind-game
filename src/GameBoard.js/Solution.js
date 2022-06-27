/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Circle from '../Circle';
import { PegColors } from '../utils/constants';

const Solution = ({ solution, showSolution }) => {
  return (
    <StyledSolutionContainer>
      {solution.map((color, index) => {
        if (showSolution) {
          return (
            <Circle
              key={`${color}-${index}`}
              color={PegColors[color]} />
          );
        }

        return (
          <Circle
            key={`${color}-${index}`}
            color="transparent">
            <FontAwesomeIcon
              icon={faQuestion}
              fontSize="25px" />
          </Circle>
        );
      })}
    </StyledSolutionContainer>
  );
};

const StyledSolutionContainer = styled.div`
  display: flex;
`;

export default Solution;
