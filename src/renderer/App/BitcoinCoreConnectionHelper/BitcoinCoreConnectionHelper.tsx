import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productName } from "_r/../../package.json";
import * as selectors from "_r/redux/selectors";
import { AtomicCssKeysArray, useAtomicCss } from "_r/useAtomicCss";
import { State } from "_r/redux/reducers/reducer";
import { BitcoinCoreConnectionStatus } from "_r/App/components/BitcoinCoreConnectionStatus/BitcoinCoreConnectionStatus";
import { ServerIsUnreachable } from "./ServerIsUnreachable";

export const BitcoinCoreConnectionHelper = () => {
  const hasBitcoinCoreConnectionIssue = useSelector(
    selectors.hasBitcoinCoreConnectionIssue,
  );
  const bitcoinCoreConnectionIssue = useSelector(
    selectors.determineBitcoinConnectionIssue,
  );
  const [keepOpen, setKeepOpen] = useState(false);
  const a = useAtomicCss();
  const helperTextClasses: AtomicCssKeysArray = [
    "colorPrimaryFade50%",
    "fontSize0.8Rem",
    "marginTop01",
  ];
  const isOpen = hasBitcoinCoreConnectionIssue || keepOpen;

  /**
   * When we encounter a connection issue, we want to keep the dialog open
   * even after the connection issue is solved so that we can show feedback
   * to the user, so we set `keepOpen` to `true` if it isn't already.
   *
   * When the user clicks "Close", `keepOpen` is set to `false`.
   */
  if (hasBitcoinCoreConnectionIssue && !keepOpen) {
    setKeepOpen(true);
  }
  const isUnauthorized = bitcoinCoreConnectionIssue === "isUnauthorized";
  const isServerWarmingUp = bitcoinCoreConnectionIssue === "isServerWarmingUp";
  const isConnected = !bitcoinCoreConnectionIssue;

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        {productName} could{" "}
        <span style={{ textDecoration: isConnected ? "line-through" : "none" }}>
          not
        </span>{" "}
        reach Bitcoin Core
      </DialogTitle>
      <DialogContent>
        {(!isUnauthorized && (
          <>
            <Typography variant="h4">
              Is Bitcoin Core running?{" "}
              {(isServerWarmingUp || isConnected) && "Yes, it looks like it!"}
            </Typography>

            <div className={a("marginTop05")}>
              <BitcoinCoreConnectionStatus />
            </div>

            <Typography className={a(...helperTextClasses)}>
              The status should automatically change to &quot;connected&quot;
              when you start Bitcoin Core and Orange is able to communicate with
              it. If it doesn&apos;t, try entering the server details manually.
            </Typography>
          </>
        )) || (
          <Typography>
            {productName} was not authorized to connect to Bitcoin Core. Please
            enter the correct username and password in the server details.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
};
