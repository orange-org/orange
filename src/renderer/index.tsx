import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RpcConsole } from "renderer/pages/RpcConsole";
import { SplashScreen } from "renderer/pages/SplashScreen";
import { Warnings } from "renderer/pages/Warnings";
import * as selectors from "renderer/redux/selectors";

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
