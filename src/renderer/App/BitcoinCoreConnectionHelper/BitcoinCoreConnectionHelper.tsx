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
import { ServerIsUnreachable } from "./ServerIsUnreachable";

export const BitcoinCoreConnectionHelper = () => {
  const hasBitcoinCoreConnectionIssue = useSelector(
    selectors.hasBitcoinCoreConnectionIssue,
  );
  const [keepOpen, setKeepOpen] = useState(false);
  const bitcoinCoreConnectionIssue = useSelector(
    state => state.bitcoinCoreConnectionIssues,
  );
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

  const renderContentBasedOnIssue = () => {
    return (
      ([
        [
          "isServerUnreachable",
          <ServerIsUnreachable onClose={() => setKeepOpen(false)} />,
        ],
        [
          "isServerWarmingUp",
          <ServerIsUnreachable onClose={() => setKeepOpen(false)} />,
        ],
        [
          "isCookieUnavailable",
          <ServerIsUnreachable onClose={() => setKeepOpen(false)} />,
        ],
        [
          "isUnauthorized",
          <ServerIsUnreachable onClose={() => setKeepOpen(false)} />,
        ],
        // ["isServerReady", <ServerIsNotReady />],
        // ["isCookieAvailable", <CookieUnavailable />],
        // ["isAuthenticated", <Unauthorized />],
      ] as const).find(
        ([issueName]) => bitcoinCoreConnectionIssue[issueName],
      )?.[1] || <ServerIsUnreachable onClose={() => setKeepOpen(false)} />
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>{renderContentBasedOnIssue()}</DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          className={a("marginTop05", "marginLeftAuto")}
        >
          Enter the server details manually
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
