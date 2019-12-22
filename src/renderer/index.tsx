import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as selectors from "./selectors";
import { SplashScreen } from "./SplashScreen";

function useShouldShowSplashScreen() {
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
}

export const Index: React.FC = () => {
  const systemPreferences = useSelector(selectors.getSystemPreferences);
  const shouldShowSplashScreen = useShouldShowSplashScreen();

  return (
    <div
      style={{
        background: systemPreferences.colorWindowBackground,
      }}
    >
      {shouldShowSplashScreen && <SplashScreen />}
    </div>
  );
};
