import styled from 'styled-components';
import Circle from '../Circle';
import { EmptyPegColors } from '../utils/constants';

const Round = () => {
  const roundColors = [];

  return (
    <StyledRoundContainer>
      <Circle
        color={EmptyPegColors.OuterCircle}>
        <Circle
          color={EmptyPegColors.InnerCircle}
          size={3} />
      </Circle>

      <Circle
        color="#4e4e4c"
        emptyPegHole />
      <Circle
        color="#4e4e4c"
        emptyPegHole />
      <Circle
        color="#4e4e4c"
        emptyPegHole />
    </StyledRoundContainer>
  );
};

const StyledRoundContainer = styled.div`
  display: flex;
`;

export default Round;
