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
    justify-content: space-around;
  }

  button {
    background-color: #64a4b8;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #185f75;
    }
  }

`;

export default GlobalStyle;
