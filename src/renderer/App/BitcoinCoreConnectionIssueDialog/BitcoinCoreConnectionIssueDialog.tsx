import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BitcoinCoreConnectionSettingsInDialog } from "./BitcoinCoreConnectionSettingsInDialog";
import { ConnectionStatusReport } from "./ConnectionStatusReport";

export const BitcoinCoreConnectionIssueDialog = () => {
  const [keepOpen, setKeepOpen] = useState(false);
  const [enterServerDetails, setEnterServerDetails] = useState(false);
  const hasBitcoinCoreConnectionIssue = useSelector(
    state => state.hasBitcoinCoreConnectionIssue,
  );
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

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        Bitcoin Core connection {enterServerDetails ? "settings" : "issue"}
      </DialogTitle>

      {enterServerDetails ? (
        <BitcoinCoreConnectionSettingsInDialog
          onClickCancel={() => setEnterServerDetails(false)}
        />
      ) : (
        <ConnectionStatusReport
          onClickEnterServerDetails={() => setEnterServerDetails(true)}
        />
      )}
    </Dialog>
  );
};
