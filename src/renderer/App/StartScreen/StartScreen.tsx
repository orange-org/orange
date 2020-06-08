import React, { useEffect } from "react";
import { ipcService } from "_r/IpcService/IpcService";
import { SplashScreen } from "../../components/SplashScreen";
import { useConnectionStatus } from "./useConnectionStatus";

export const StartScreen = () => {
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (connectionStatus === "ready") {
      ipcService.setIsReady(__NONCE__);
    }
  }, [connectionStatus]);

  return <SplashScreen action="Starting" />;
};
