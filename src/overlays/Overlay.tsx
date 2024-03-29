import styled from 'styled-components';
import React from 'react';

import { motion, AnimatePresence, Transition } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { OverlayAnimation } from '../animation';

import { OnClickIcon } from '../@types';

interface Props {
  delay?: number,
  onClickCloseOverlay: OnClickIcon,
  isVisible: boolean,
}

const Overlay: React.FC<Props> = ({
  children,
  isVisible = false,
  delay = 0,
  onClickCloseOverlay,
}) => {
  return (
    <AnimatePresence>
      {isVisible
        ? (
          <StyledOverlayContainer
            transition={{ delay } as Transition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.65,
              },
            }}>
            <StyledOverlay />
            <StyledOverlayContent
              key="overlay"
              variants={OverlayAnimation}
              initial="hidden"
              animate="show"
              exit="exit">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={onClickCloseOverlay}
                color="white"
                className="close-icon"
                fontSize="33px" />
              {children}
            </StyledOverlayContent>
          </StyledOverlayContainer>

        )
        : null
      }
    </AnimatePresence>
  );
};

const StyledOverlayContainer = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;

  // Use padding top to centre overlay for mobile to fix bug on Android devices
  // where content appears off screen until interaction (possibly a framer motion bug)
  padding-top: 20%;

  @media screen and (min-height: 680px) and (max-width: 768px) {
    padding-top: 32%;
  }

  @media screen and (min-width: 768px) {
    align-items: center;
    padding-top: 0;
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const StyledOverlayContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 380px;
  width: 88%;
  border-radius: 15px;
  background-color: black;
  z-index: 1;

  @media screen and (min-height: 640px) and (max-width: 768px) {
    height: 460px;
  }

  @media screen and (min-width: 768px) {
    height: 50%;
  }

  @media screen and (min-width: 1024px) {
    width: 50%;
  }

  .close-icon {
    align-self: flex-end;
    margin: 16px 23px 0 0;
    font-size: 28px;

    @media screen and (min-width: 768px) {
      font-size: 50px;
      margin: 25px 30px 0 0;
    }

    @media screen and (min-width: 1024px) {
      cursor: pointer;
      font-size: 35px;
      margin: 16px 23px 0 0;

      &:hover {
      transform: scale(1.2);
      }
    }
  }
`;

export default Overlay;

