import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'GeoLight';
    src: local('GeoLight'), url('./assets/fonts/geo-light.ttf') format('truetype');
  }

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

  button, h2, h3, p {
    font-family: 'GeoLight', Helvetica, sans-serif;
  }

  h2 {
    font-size: 3.8vh;
    margin-top: 1vh;
  }

  button {
    background-color: #64a4b8;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 3vh;
    cursor: pointer;
    &:hover {
      background-color: #185f75;
    }
  }

`;

export default GlobalStyle;
