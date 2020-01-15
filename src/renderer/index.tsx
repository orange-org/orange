import React from "react";
import { useSelector } from "react-redux";
import { RpcConsole } from "_r/pages/RpcConsole/RpcConsole";
import { ShutdownDialog } from "_r/pages/ShutdownDialog/ShutdownDialog";
import { SplashScreen } from "_r/pages/SplashScreen";
import { StatusBar } from "_r/pages/StatusBar/StatusBar";
import { Warnings } from "_r/pages/Warnings";
import * as selectors from "_r/redux/selectors";
import { RpcPollEssentialData } from "./RpcPollEssentialData";

const IndexFc: React.FC = () => {
  const showSplashScreen = useSelector(selectors.showSplashScreen);

  return (
    <>
      {(showSplashScreen && <SplashScreen />) || (
        <>
          <RpcPollEssentialData />
          <Warnings />
          <RpcConsole />
          <StatusBar />
        </>
      )}
      <ShutdownDialog />
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
