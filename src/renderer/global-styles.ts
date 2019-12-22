import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: black;
  }

  body > div {
    height: 100%;
    width: 100%;
  }
`;
