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
  /* Make sure no text can be selected */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
  }

  .App {
    background-color: #eceadb;
    display: flex;

    @media screen and (min-width: 1024px) {
      justify-content: space-around;
    }
    
  }

  h1 {
    color: white;
    font-size: 4.2vh;
    letter-spacing: 1.5px;
    font-family: 'GeoLight', Helvetica, sans-serif;
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
    border-radius: 4px;
    font-size: 2vh;
    cursor: pointer;
    &:hover {
      background-color: #185f75;
    }

    @media screen and (min-width: 1024px) {
      font-size: 3vh;
      border-radius: 8px;
    }
  }

`;

export default GlobalStyle;
