import styled from 'styled-components';

// TODO: post game overlay instead of message

const PostGameFeedback = () => {
  return (
    <StyledPostGameFeedbackContainer>
      <h2>You lost! Better luck next time!</h2>
    </StyledPostGameFeedbackContainer>

  );
};

const StyledPostGameFeedbackContainer = styled.div`

`;
export default PostGameFeedback;
