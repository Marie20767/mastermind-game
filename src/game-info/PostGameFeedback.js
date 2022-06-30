import styled from 'styled-components';

// TODO: post game overlay instead of message

const PostGameFeedback = ({ showWinningMessage, showLosingMessage }) => {
  const getFeedbackMessage = () => {
    if (showWinningMessage) {
      return 'You won Mastermind!';
    } if (showLosingMessage) {
      return 'You lost. Better luck next time!';
    }

    return '';
  };

  return (
    <StyledPostGameFeedbackContainer>
      <h2>{getFeedbackMessage()}</h2>
    </StyledPostGameFeedbackContainer>

  );
};

const StyledPostGameFeedbackContainer = styled.div`

`;
export default PostGameFeedback;
