import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const GameInfoButton = ({ icon, toolTipText, onClick }) => {
  return (
    <Button data-tip data-for={toolTipText} type="button">
      <ReactTooltip id={toolTipText} place="top" effect="solid">
        <span>{toolTipText}</span>
      </ReactTooltip>
      <FontAwesomeIcon
        icon={icon}
        onClick={onClick} />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  margin-right: 2vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 63px;
  height: 63px;

  .__react_component_tooltip {
    font-size: 2vh;
    padding: 8px 13px;
  }
`;

export default GameInfoButton;
