import React from "react";
import { RpcConsole } from "_r/pages/RpcConsole/RpcConsole";
import { ShutdownDialog } from "_r/pages/ShutdownDialog/ShutdownDialog";
import { SplashScreen } from "_r/pages/SplashScreen";
import { StatusBar } from "_r/pages/StatusBar/StatusBar";
import { Warnings } from "_r/pages/Warnings";
import { RpcPollEssentialData } from "_r/RpcPollEssentialData";
import { useGlobalErrorHandling, useRpcServerStatus } from "./indexHooks";

export const Index: React.FC = () => {
  useGlobalErrorHandling();

  const { isShuttingDown, isWarmingUp, initMessage } = useRpcServerStatus();

  return (
    <>
      {(isWarmingUp && <SplashScreen initMessage={initMessage} />) || (
        <>
          <RpcPollEssentialData />
          <Warnings />
          <RpcConsole />
          <StatusBar />
        </>
      )}

      <ShutdownDialog open={isShuttingDown} />
    </>
  );
};
