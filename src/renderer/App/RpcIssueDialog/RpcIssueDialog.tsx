import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RpcSettingsInDialog } from "./RpcSettingsInDialog";
import { ConnectionStatusReport } from "./ConnectionStatusReport";

export const RpcIssueDialog = () => {
  const [keepOpen, setKeepOpen] = useState(false);
  const [enterServerDetails, setEnterServerDetails] = useState(false);
  const hasRpcIssue = useSelector(state => state.hasRpcIssue);
  const isOpen = true;
  // const isOpen = hasRpcIssue || keepOpen;

  /**
   * When we encounter a connection issue, we want to keep the dialog open
   * even after the connection issue is solved so that we can show feedback
   * to the user, so we set `keepOpen` to `true` if it isn't already.
   *
   * When the user clicks "Close", `keepOpen` is set to `false`.
   */
  if (hasRpcIssue && !keepOpen) {
    setKeepOpen(true);
  }

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        Bitcoin Core connection {enterServerDetails ? "settings" : "issue"}
      </DialogTitle>

      {enterServerDetails ? (
        <RpcSettingsInDialog
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
