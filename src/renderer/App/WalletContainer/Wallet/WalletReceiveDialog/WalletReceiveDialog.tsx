import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";

const useIsMatch = () => {
  const match = useRouteMatch("/wallet/:walletName/receive");
  return !!match;
};

const useGoBack = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return goBack;
};

export const WalletReceive = () => {
  const a = useAtomicCss();
  const isMatch = useIsMatch();
  const goBack = useGoBack();

  return (
    <Dialog open={isMatch}>
      <DialogTitle>Receive to</DialogTitle>

      <DialogContent>
        <Typography className={a("monospacedTypographyBox")}>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={goBack} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
