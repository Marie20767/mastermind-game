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
    margin-bottom: 14px;
    height: 50px;
    width: 50px;

    @media screen and (min-width: 768px) {
      height: 90px;
      width: 90px;
      margin-bottom: 25px;
    }

    @media screen and (min-width: 1024px) {
      margin-bottom: 10px;
      height: 80px;
      width: 80px; 
    }
  }

  h2 {
    margin-top: 10px;
    margin-bottom: 23px;
    font-size: 3.2vh;
    color: white;
    letter-spacing: 1.5px;

    @media screen and (min-width: 768px) {
      margin-top: 0px;
      font-size: 4vh; 
    }

    @media screen and (min-width: 1024px) {
      margin-top: 33px;
      margin-bottom: 15px;
    }
  }

  h3 {
    color: white;
    font-size: 3vh;
    text-decoration: underline;
    margin-bottom: 28px;
    
    @media screen and (min-width: 768px) {
      font-size: 3.8vh;
    }
  }

  .icon {
    margin-bottom: 35px;
    font-size: 22px;

    @media screen and (min-width: 768px) {
      font-size: 45px;
    }

    @media screen and (min-width: 1024px) {
      cursor: pointer;
      font-size: 35px;

      &:hover {
      transform: scale(1.2);
      }
    }
  }

  p {
    color: white;
    font-size: 2.7vh;
    margin: 8px 20px;

    @media screen and (min-width: 768px) {
      margin: 10px 30px;
      font-size: 3vh; 
    }

    @media screen and (min-width: 1024px) {
      font-size: 3.3vh;  
      margin: 10px 35px;
    }
  }

  span {
    color: #64a4b8;
    font-weight: bold;
  }
`;

export default RulesOverlay;
