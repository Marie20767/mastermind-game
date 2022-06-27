import styled from 'styled-components';
import Circle from './Circle';
import { PegHexCodes } from './utils/constants';

const Pegpicker = () => {
  return (
    <StyledPegpickerContainer>
      {PegHexCodes.map((color) => {
        return (
          <Circle
            key={color}
            color={color}
            clickable />
        );
      })}
    </StyledPegpickerContainer>
  );
};

const StyledPegpickerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default Pegpicker;
