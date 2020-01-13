import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./StatusBarStyles";
import { useProgressBarState, useNetworkState } from "./StatusBarHooks";
import { Details, Record } from "./StatusBarComponents";

export const StatusBar: React.FC = () => {
  const c = useStyles();
  const progressBarState = useProgressBarState();
  const networkState = useNetworkState();

  return (
    <div className={c.root}>
      <Dialog
        open
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography>
            Orange is currently syncing. It will download headers and blocks
            from peers and validate them until reaching the tip of the block
            chain.
          </Typography>

          <Details>
            <Record
              name="Number of blocks left"
              value="Unknown. Syncing headers (1234325, 100%)..."
            />
            <Record name="Last block time" value="Thu Oct 17 18:16:53 2013" />
            <Record name="Progress" value="1.25%" />
            <Record name="Progress increase per hour" value="Calculating..." />
            <Record
              name="Estimated time left until synced"
              value="Unknown..."
            />
          </Details>
        </DialogContent>

        <DialogActions>
          <Button color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      <div className={c.progressBarContainer}>
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
