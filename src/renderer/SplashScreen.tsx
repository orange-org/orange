import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 480px;
  height: 320px;
  background-image: radial-gradient(
    circle at top left,
    white,
    RGB(247, 247, 247) 85%
  );
`;

export const SplashScreen: React.FC = () => {
  return <Container>I&apos;m the splash!</Container>;
};
