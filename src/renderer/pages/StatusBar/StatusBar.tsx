import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./StatusBarStyles";
import * as statusBarHooks from "./StatusBarHooks";
import { Details, Record } from "./StatusBarComponents";

export const StatusBar: React.FC = () => {
  const c = useStyles();
  const progressBarState = statusBarHooks.useProgressBarState();
  const networkState = statusBarHooks.useNetworkState();
  const detailsDialogState = statusBarHooks.useDetailsDialogState();
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  return (
    <div className={c.root}>
      <Dialog open={isDetailsDialogOpen}>
        <DialogContent>
          <Typography>
            Orange is currently syncing. It will download headers and blocks
            from peers and validate them until reaching the tip of the block
            chain.
          </Typography>

          <Details>
            <Record
              name="Number of blocks left"
              value={detailsDialogState.numberOfBlocksLeft}
            />
            <Record
              name="Last block time"
              value={detailsDialogState.lastBlockTime}
            />
            <Record
              name="Progress"
              value={`${progressBarState.progress.toFixed(2)}%`}
            />
            <Record
              name="Progress increase per hour"
              value={detailsDialogState.progressPerHour || "Calculating..."}
            />
            <Record
              name="Estimated time left until synced"
              value={detailsDialogState.remainingMilliseconds || "Unknown..."}
            />
          </Details>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsDetailsDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <div
        className={c.progressBarContainer}
        onClick={() => setIsDetailsDialogOpen(!isDetailsDialogOpen)}
      >
        <Typography className={c.progressBarMessageContainer} variant="body2">
          {progressBarState.message}
        </Typography>
        <LinearProgress
          classes={{
            root: c.progressBarRoot,
            bar: c.progressBarBar,
          }}
          variant="determinate"
          // value={42}
          value={progressBarState.progress}
        />
      </div>

      <div className={c.networkStateContainer}>
        {networkState.networkStateIcon}
      </div>
    </div>
  );
};
