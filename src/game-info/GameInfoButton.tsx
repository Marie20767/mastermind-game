import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import React from 'react';
import { IconType, OnClickButton } from '../@types';

interface Props {
  toolTipText: string,
  onClick: OnClickButton,
  icon: IconType
}

const GameInfoButton: React.FC<Props> = ({ icon, toolTipText, onClick }) => {
  return (
    <Button data-tip data-for={toolTipText} onClick={onClick} type="button">
      <ReactTooltip id={toolTipText} place="top" effect="solid">
        <span>{toolTipText}</span>
      </ReactTooltip>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  margin-right: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  @media screen and (min-width: 768px) {
    width: 85px;
    height: 85px;
  }

  @media screen and (min-width: 1024px) {
    width: 76px;
    height: 76px;
  }


  .__react_component_tooltip {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
      font-size: 2vh;
      padding: 8px 13px;
    }
  }
`;

export default GameInfoButton;
