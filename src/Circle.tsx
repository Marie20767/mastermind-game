import styled from 'styled-components';
import React from 'react';
import { CircleColor, OnClickDiv } from './@types';

interface Props {
  color: CircleColor,
  className: string,
  testId?: string,
  onClick?: OnClickDiv
}

const Circle: React.FC<Props> = ({
  color,
  className,
  testId,
  onClick,
  children,
}) => {
  return (
    <StyledCircle
      color={color}
      className={className}
      data-testid={testId}
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
