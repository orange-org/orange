import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as selectors from "./selectors";
import { SplashScreen } from "./SplashScreen";
import { RpcConsole } from "./RpcConsole";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  overflow: hidden;
`;

// fetch("http://localhost:18332/", {
//   method: "POST",
//   headers: {
//     Authorization: `Basic ${Buffer.from("XXX:YYY").toString("base64")}`,
//     "content-type": "text/plain",
//   },
//   body: JSON.stringify({
//     jsonrpc: "1.0",
//     id: "curltest",
//     method: "getnetworkinfo",
//     params: [],
//   }),
// })
//   .then(response => response.json())
//   .then(data => console.log(data.result));

const useShowSplashScreen = () => {
  const showSplashScreenSelectorResult = useSelector(
    selectors.showSplashScreen,
  );
  const [waitForSplashScreen, setWaitForSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaitForSplashScreen(false);
    }, 6000);
  }, []);

  return showSplashScreenSelectorResult || waitForSplashScreen;
};

export const Index: React.FC = () => {
  const systemPreferences = useSelector(selectors.getSystemPreferences);
  const showSplashScreen = useShowSplashScreen();
  const showRpcConsole = useSelector(selectors.showRpcConsole);

  return (
    <Container backgroundColor={systemPreferences.colorWindowBackground}>
      {showSplashScreen && <SplashScreen />}
      {showRpcConsole && !showSplashScreen && <RpcConsole />}
    </Container>
  );
};
