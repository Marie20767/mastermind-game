import styled from 'styled-components';

const Circle = ({
  color,
  clickable,
  className,
  onClick,
  children,
}) => {
  return (
    <StyledCircle
      color={color}
      className={className}
      clickable={clickable}
      onClick={onClick}>
      {children}
    </StyledCircle>
  );
};

const StyledCircle = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1.5px solid black;
  ${(props) => `background-color: ${props.color};`}
`;

export default Circle;
