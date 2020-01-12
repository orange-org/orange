import React from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "_r/pages/StatusBar";
import { RpcConsole } from "_r/pages/RpcConsole";
import { SplashScreen } from "_r/pages/SplashScreen";
import { Warnings } from "_r/pages/Warnings";
import * as selectors from "_r/redux/selectors";

const IndexFc: React.FC = () => {
  const showSplashScreen = useSelector(selectors.showSplashScreen);

  return (
    <>
      {(showSplashScreen && <SplashScreen />) || (
        <>
          <Warnings />
          <RpcConsole />
          <StatusBar />
        </>
      )}
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
