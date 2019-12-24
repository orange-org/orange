import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: black;
  }

  body > div {
    height: 100%;
    width: 100%;
    font-family: system-ui, -apple-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;
