/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Circle from '../Circle';

const Solution = ({ solution, showSolution }) => {
  return (
    <StyledSolutionContainer>
      {solution.map((color, index) => {
        if (showSolution) {
          return (
            <Circle
              key={`${color}-${index}`}
              color={color}
              margin="0 28px 0 0" />
          );
        }

        return (
          <Circle
            key={`${color}-${index}`}
            color="transparent"
            margin="0 28px 0 0">
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
  justify-content: flex-end;
  margin-left: 204px;
`;

export default Solution;
