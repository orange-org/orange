import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";
import { poll } from "_r/utils/poll";
import { BitcoinCoreConnectionSettings } from "../components/BitcoinCoreConnectionSettings/BitcoinCoreConnectionSettings";
// import { useConnectionStatus } from "./useConnectionStatus";

export const BitcoinCoreConnectionIssueDialog = () => {
  const [keepOpen, setKeepOpen] = useState(false);
  const a = useAtomicCss();
  const isConnected = true;
  // const dispatch = useDispatch();
  // const { username, password, serverUrl } = useSelector(
  //   state => state.mainProcessData,
  // );
  const isOpen = true;
  // const isOpen = hasBitcoinCoreConnectionIssue || keepOpen;
  useEffect(() => {
    poll(async () => {
      // if (response.error) {
      //   dispatch(setBitcoinCoreConnectionIssue(response.error));
      // } else if (response.result && usingSavedConfigurations) {
      //   dispatch(setBitcoinCoreConnectionIssue(null));
      // }
    }, 1000);
  });

  /**
   * When we encounter a connection issue, we want to keep the dialog open
   * even after the connection issue is solved so that we can show feedback
   * to the user, so we set `keepOpen` to `true` if it isn't already.
   *
   * When the user clicks "Close", `keepOpen` is set to `false`.
   */
  if (true && !keepOpen) {
    setKeepOpen(true);
  }

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
        {/* <ConnectionStatusReport /> */}
        <BitcoinCoreConnectionSettings />
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
          disabled
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
