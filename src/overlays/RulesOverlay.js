import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import welcomingChickImage from '../images/chick.png';
import Overlay from './Overlay';
import RulesOverlayContent from './RulesOverlayContent';
import { OverlayAnimation } from '../animation';
import { NumberOfRulesPages } from '../utils/constants';

const RulesOverlay = ({ isVisible, setShowRules }) => {
  const [rulesPageIndex, setRulesPageIndex] = useState(0);

  const onClickCloseRulesOverlay = () => {
    setShowRules(false);
    setRulesPageIndex(0);
  };

  const getRulesOverlayContent = () => {
    if (rulesPageIndex === 0) {
      return (
        <RulesOverlayContent
          rulesPageIndex={rulesPageIndex}
          setRulesPageIndex={setRulesPageIndex}>
          <h2>Hi, welcome to Mastermind!</h2>
          <img src={welcomingChickImage} alt="Waving chick" />
          <p>The aim of the game is to find the exact positions of the colours in the secret sequence.</p>
        </RulesOverlayContent>
      );
    }

    if (rulesPageIndex === 1) {
      return (
        <RulesOverlayContent
          rulesPageIndex={rulesPageIndex}
          setRulesPageIndex={setRulesPageIndex}>
          <p>To start the game, click on the <span>coloured pegs </span> on the left.</p>
          <p>Click on the <span>Delete</span> button if you wish to delete your sequence and choose different colours.</p>
          <p>Once 4 pegs are selected, click on the <span>Check</span> button to get the computer&apos;s feedback.</p>
        </RulesOverlayContent>
      );
    }

    if (rulesPageIndex === 2) {
      return (
        <RulesOverlayContent
          rulesPageIndex={rulesPageIndex}
          setRulesPageIndex={setRulesPageIndex}>
          <p>The small <span>red</span>, <span>white</span> and <span>dark grey</span> pegs indicate the computer&apos;s feedback.</p>
          <p>Red indicates a <span>correct colour</span> in the <span>correct position</span>.</p>
          <p>White indicates a <span>correct colour</span> in the <span>wrong position</span>.</p>
          <p>Dark grey indicates an <span>incorrect colour</span> in the <span>incorrect position</span>.</p>
        </RulesOverlayContent>
      );
    }

    if (rulesPageIndex === NumberOfRulesPages - 1) {
      return (
        <RulesOverlayContent
          rulesPageIndex={rulesPageIndex}
          setRulesPageIndex={setRulesPageIndex}>
          <h3>Special notes:</h3>
          <p>The same colour can be selected up to <span>4 times.</span></p>
          <p>You have <span>9 attempts</span> to find the secret sequence.</p>
          <p>Good luck Mastermind!</p>
        </RulesOverlayContent>
      );
    }

    return null;
  };

  return (
    <Overlay isVisible={isVisible} onClickCloseOverlay={onClickCloseRulesOverlay}>
      <StyledRulesContainer
        key={`rules-page-${rulesPageIndex}`}
        variants={OverlayAnimation}
        initial="hidden"
        animate="show">
        {getRulesOverlayContent()}
      </StyledRulesContainer>
    </Overlay>
  );
};

const StyledRulesContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;

  img {
    margin-bottom: 3vh;
    height: 64px;
    width: 64px;
  }

  h2 {
    margin-top: 4vh;
    margin-bottom: 3vh;
    color: white;
    font-size: 4vh;
    letter-spacing: 1.5px;
  }

  h3 {
    color: white;
    font-size: 3.8vh;
    text-decoration: underline;
    margin-bottom: 2vh;
  }

  .icon {
    margin-bottom: 3vh;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }

  p {
    color: white;
    font-size: 3.3vh;
    margin: 1.8vh 4vh;
  }

  span {
    color: #64a4b8;
    font-weight: bold;
  }
`;

export default RulesOverlay;