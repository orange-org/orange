import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as selectors from "renderer/redux/selectors";
import { SplashScreen } from "renderer/pages/SplashScreen";
import { RpcConsole } from "renderer/pages/RpcConsole";
import { Paper } from "@material-ui/core";

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: ${(props: { backgroundColor: string }) =>
//     props.backgroundColor};
//   overflow: hidden;
// `;

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

  return (
    <>
      <RpcConsole />
      {/* {showSplashScreen && <SplashScreen />}
      {showRpcConsole && !showSplashScreen && <RpcConsole />} */}
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
