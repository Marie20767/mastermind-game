/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import Round from './Round';

const Rounds = ({ allUserAnswers, allPegFeedback }) => {
  return (
    <StyledRoundsContainer>
      {allUserAnswers.map((roundAnswers, index) => {
        return (
          <Round
            key={`${roundAnswers.join('-')}-${index}`}
            roundAnswers={roundAnswers}
            roundPegFeedback={allPegFeedback[index]} />
        );
      })}
    </StyledRoundsContainer>
  );
};

const StyledRoundsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 35px;
  margin-left: 140px;
`;

export default Rounds;
