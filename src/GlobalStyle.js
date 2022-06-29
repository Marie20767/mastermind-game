import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
/* TODO: choose fonts */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root, .App {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  }

  .App {
    background-color: #eceadb;
    display: flex;
    justify-content: center;
  }

  button {
    background-color: transparent;
    border: 3px solid #c4cacc;
    cursor: pointer;
    &:hover {
      background-color: #c4cacc;
      color: white;
    }
  }

`;

export default GlobalStyle;
