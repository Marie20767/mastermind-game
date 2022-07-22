/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { NumberOfRulesPages } from '../utils/constants';

const RulesOverlayContent = ({ children, rulesPageIndex, setRulesPageIndex }) => {
  const iconProps = {
    color: 'white',
    fontSize: '30px',
  };

  return (
    <>
      <StyledRulesTextContainer>
        {children}
      </StyledRulesTextContainer>
      <StyledIconContainer>
        {rulesPageIndex !== 0
          ? (
            <FontAwesomeIcon
              icon={faAnglesLeft}
              className="icon next"
              onClick={() => setRulesPageIndex(rulesPageIndex - 1)}
              {...iconProps} />
          )
          : null
        }

        {rulesPageIndex !== NumberOfRulesPages - 1
          ? (
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="icon previous"
              onClick={() => setRulesPageIndex(rulesPageIndex + 1)}
              {...iconProps} />
          )
          : null
        }
      </StyledIconContainer>
    </>
  );
};

const StyledRulesTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;

  .previous {
    margin-left: 15px;
  }
`;

export default RulesOverlayContent;
