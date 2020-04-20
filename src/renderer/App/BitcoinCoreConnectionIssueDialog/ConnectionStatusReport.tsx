import { DialogContent, Typography } from "@material-ui/core";
import React from "react";
import { productName } from "_r/../../package.json";
import { BitcoinCoreConnectionStatus } from "_r/App/components/BitcoinCoreConnectionStatus/BitcoinCoreConnectionStatus";
import { useAtomicCss } from "_r/useAtomicCss";
import { useConnectionStatus } from "./useConnectionStatus";

export const ConnectionStatusReport = () => {
  const a = useAtomicCss();
  const {
    isConnected,
    isServerWarmingUp,
    isUnauthorized,
  } = useConnectionStatus();

  return (
    <>
      {(!isUnauthorized && (
        <>
          <Typography variant="h4">
            Is Bitcoin Core running?{" "}
            {(isServerWarmingUp || isConnected) && "Yes, it looks like it!"}
          </Typography>

          <div className={a("marginTop05")}>
            <BitcoinCoreConnectionStatus />
          </div>

          <Typography className={a("helperText")}>
            The status should automatically change to &quot;connected&quot; when
            you start Bitcoin Core and Orange is able to communicate with it. If
            it doesn&apos;t, try entering the server details manually.
          </Typography>
        </>
      )) || (
        <Typography>
          {productName} was not authorized to connect to Bitcoin Core. Please
          enter the correct username and password in the server details.
        </Typography>
      )}

      {/* <DialogActions>
        <Button
          variant="outlined"
          className={a("marginTop05", "marginLeftAuto")}
        >
          Enter server details
        </Button>

        <Button
          color="primary"
          onClick={() => setKeepOpen(false)}
          disabled={hasBitcoinCoreConnectionIssue}
          variant="contained"
          disableElevation
          className={a("marginTop05", "marginLeftAuto")}
        >
          Close
        </Button>
      </DialogActions> */}
    </>
  );
};
