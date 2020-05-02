import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RpcSettingsInDialog } from "./RpcSettingsInDialog";
import { ConnectionStatusReport } from "./ConnectionStatusReport";

export const RpcIssueDialog = () => {
  const [keepOpen, setKeepOpen] = useState(false);
  const [enterServerDetails, setEnterServerDetails] = useState(false);
  const hasRpcIssue = useSelector(state => state.hasRpcIssue);
  const isOpen = hasRpcIssue || keepOpen;

  useEffect(() => {
    if (hasRpcIssue) {
      setKeepOpen(true);
    }
  }, [hasRpcIssue]);

  return (
    <Dialog
      open={isOpen}
      data-testid={`rpcIssueDialog-${isOpen ? "open" : "closed"}`}
    >
      <DialogTitle>
        Bitcoin Core connection {enterServerDetails ? "settings" : "issue"}
      </DialogTitle>

      {enterServerDetails ? (
        <RpcSettingsInDialog
          navigateBackToConnectionStatusReport={() =>
            setEnterServerDetails(false)
          }
        />
      ) : (
        <ConnectionStatusReport
          disableClosing={hasRpcIssue === true}
          onClickClose={() => setKeepOpen(false)}
          onClickEnterServerDetails={() => setEnterServerDetails(true)}
        />
      )}
    </Dialog>
  );
};
