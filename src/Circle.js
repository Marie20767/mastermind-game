import styled from 'styled-components';

const Circle = ({ color, clickable, size = 6, onClick, children, margin }) => {
  return (
    <StyledCircle
      color={color}
      clickable={clickable}
      size={size}
      onClick={onClick}
      margin={margin}>
      {children}
    </StyledCircle>
  );
};

const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1.5px solid black;
  ${(props) => props.clickable ? 'cursor: pointer;' : ''}
  ${(props) => `background-color: ${props.color};`}
  ${(props) => `width: ${props.size}vh; height: ${props.size}vh;`}
  ${(props) => props.margin ? `margin: ${props.margin}` : ''}
`;

export default Circle;
