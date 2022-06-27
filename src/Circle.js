import styled from 'styled-components';

const Circle = ({ color, clickable, size = 5, onClick, children }) => {
  return (
    <StyledCircle
      color={color}
      clickable={clickable}
      size={size}
      onClick={onClick}>
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
`;

export default Circle;
