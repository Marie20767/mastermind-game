/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { NumberOfRulesPages } from '../utils/constants';
import { SetNumberFunction } from '../@types';

interface Props {
  rulesPageIndex: number,
  setRulesPageIndex: SetNumberFunction
}

const RulesOverlayContent: React.FC<Props> = ({ children, rulesPageIndex, setRulesPageIndex }) => {
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
              className="icon previous"
              onClick={() => setRulesPageIndex(rulesPageIndex - 1)}
              {...iconProps} />
          )
          : null
        }

        {rulesPageIndex !== NumberOfRulesPages - 1
          ? (
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="icon next"
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

  .next {
    margin-left: 15px;
  }
`;

export default RulesOverlayContent;
