import React, { useState, useEffect } from "react";
import { RpcConsole } from "r/pages/RpcConsole";
import { SplashScreen } from "r/pages/SplashScreen";
import { Warnings } from "r/pages/Warnings";
import { ProgressBar } from "r/pages/ProgressBar";
import { useSelector } from "react-redux";
import * as selectors from "r/redux/selectors";

const useShowSplashScreen = () => {
  const showSplashScreenSelectorResult = useSelector(
    selectors.showSplashScreen,
  );
  const [waitForSplashScreen, setWaitForSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaitForSplashScreen(false);
    }, 3000);
  }, []);

  return showSplashScreenSelectorResult || waitForSplashScreen;
};

const IndexFc: React.FC = () => {
  const showSplashScreen = useShowSplashScreen();
  const showRpcConsole = useSelector(selectors.showRpcConsole);
  const showWarnings = useSelector(selectors.showWarnings);

  return (
    <>
      {showWarnings && <Warnings />}
      {showSplashScreen && <SplashScreen />}
      {showRpcConsole && !showSplashScreen && <RpcConsole />}
    </>
  );
};

export class Index extends React.Component {
  componentDidCatch(error: Error | null) {
    console.log("e", error);
  }

  render() {
    return <IndexFc />;
  }
}
