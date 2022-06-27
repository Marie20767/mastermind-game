import styled from 'styled-components';

const Circle = ({ color, clickable, size = 5, children }) => {
  return (
    <StyledCircle
      color={color}
      clickable={clickable}
      size={size}>
      {children}
    </StyledCircle>
  );
};

const StyledCircle = styled.div`
  border-radius: 50%;
  border: 1.5px solid black;
  ${(props) => props.clickable ? 'cursor: pointer;' : ''}
  ${(props) => `background-color: ${props.color};`}
  ${(props) => `width: ${props.size}vh; height: ${props.size}vh;`}
`;

export default Circle;
