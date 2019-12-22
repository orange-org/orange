import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as selectors from "./selectors";
import { SplashScreen } from "./SplashScreen";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
`;

const useShouldShowSplashScreen = () => {
  const shouldShowSplashScreenSelectorResult = useSelector(
    selectors.shouldShowSplashScreen,
  );
  const [shouldWaitForSplashScreen, setShouldWaitForSplashScreen] = useState(
    true,
  );

  useEffect(() => {
    setTimeout(() => {
      setShouldWaitForSplashScreen(false);
    }, 6000);
  }, []);

  return shouldShowSplashScreenSelectorResult || shouldWaitForSplashScreen;
};

export const Index: React.FC = () => {
  const systemPreferences = useSelector(selectors.getSystemPreferences);
  const shouldShowSplashScreen = useShouldShowSplashScreen();

  return (
    <Container backgroundColor={systemPreferences.colorWindowBackground}>
      {shouldShowSplashScreen && <SplashScreen />}
    </Container>
  );
};
