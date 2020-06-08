import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { productName } from "_r/../../package.json";
import { ipcService } from "_r/IpcService/IpcService";
import { useAtomicCss } from "_r/useAtomicCss";
import { useConnectionStatus } from "./useConnectionStatus";

const useStyles = makeStyles({
  background: {
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 86%, rgba(255,238,225,1) 100%, rgba(255,111,0,1) 100%)",
  },
});

export const StartScreen = () => {
  const a = useAtomicCss();
  const styles = useStyles();
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (connectionStatus === "ready") {
      ipcService.setIsReady(__NONCE__);
    }
  }, [connectionStatus]);

  return (
    <div
      className={clsx(
        styles.background,
        a(
          "padding6",
          "displayFlex",
          "flexDirectionColumn",
          "justifyContentCenter",
          "height100%",
        ),
      )}
    >
      <Typography variant="h1" className={a("marginTopNegative02")}>
        Starting {productName}...
      </Typography>
      <LinearProgress className={a("marginTop05")} color="secondary" />
    </div>
  );
};
