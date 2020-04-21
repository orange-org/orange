import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { BitcoinCoreConnectionSettings } from "../components/BitcoinCoreConnectionSettings/BitcoinCoreConnectionSettings";
import { ConnectionStatusReport } from "./ConnectionStatusReport";
// import { useConnectionStatus } from "./useConnectionStatus";

export const BitcoinCoreConnectionIssueDialog = () => {
  const buttonProps = useRef<any>(null);
  const [keepOpen, setKeepOpen] = useState(false);
  const [enterServerDetails, setEnterServerDetails] = useState(false);
  const hasBitcoinCoreConnectionIssue = useSelector(
    state => state.hasBitcoinCoreConnectionIssue,
  );
  const a = useAtomicCss();
  const isConnected = !hasBitcoinCoreConnectionIssue;
  const isOpen = true;
  // const isOpen = hasBitcoinCoreConnectionIssue || keepOpen;

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

  const Comp = BitcoinCoreConnectionSettings;
  // const Comp = enterServerDetails
  //   ? BitcoinCoreConnectionSettings
  //   : ConnectionStatusReport;

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        {productName} could{" "}
        <span style={{ textDecoration: isConnected ? "line-through" : "none" }}>
          not
        </span>{" "}
        reach Bitcoin Core
      </DialogTitle>

      <Comp
        render={(Content, Buttonz) => (
          <>
            <DialogContent>
              <Content />
            </DialogContent>

            <DialogActions>
              <Buttonz
                variant="outlined"
                // onClick={() => setEnterServerDetails(true)}
                className={a("marginTop05", "marginLeftAuto")}
              >
                Enter server details
              </Buttonz>

              {/* <Button
  color="primary"
  onClick={() => setKeepOpen(false)}
  disabled
  variant="contained"
  disableElevation
  className={a("marginTop05", "marginLeftAuto")}
>
  Close
</Button> */}
            </DialogActions>
          </>
        )}
      />
    </Dialog>
  );
};
