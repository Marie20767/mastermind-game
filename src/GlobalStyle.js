import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root, .App {
  height: 100%;
  width: 100%;
  }

  .App {
    background-color: #eceadb;
    display: flex;
  }

`;

export default GlobalStyle;
