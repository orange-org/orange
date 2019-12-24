import React from "react";
import styled from "styled-components";
import * as styles from "src/renderer/styles";
import bitcoinPng from "src/assets/bitcoin.png";

const Container = styled.div`
  width: 480px;
  height: 320px;
  background-image: url(${bitcoinPng}),
    radial-gradient(circle at top left, white, RGB(247, 247, 247) 85%);
  ${styles.roundedCorners};
  ${styles.shadow};
  ${styles.centerInParent};
`;

export const SplashScreen: React.FC = () => {
  return <Container>I&apos;m the splash!</Container>;
};
