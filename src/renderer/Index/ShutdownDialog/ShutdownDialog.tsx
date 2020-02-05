import { Dialog, Typography } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import { useStyles } from "./ShutdownDialogStyles";

export const ShutdownDialog: React.FC<{ open: boolean }> = props => {
  const s = useStyles();

  return (
    <Dialog open={props.open}>
      <div className={s.root}>
        <div>
          <PowerSettingsNewIcon fontSize="large" />
        </div>
        <div className={s.shutdownWarningText}>
          <Typography variant="h6">Orange is shutting down</Typography>

          <Typography>
            Do not shut down the computer until this window disappears.
          </Typography>
        </div>
      </div>
    </Dialog>
  );
};
