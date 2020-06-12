import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useRouteMatch, useHistory } from "react-router-dom";

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
  const isMatch = useIsMatch();
  const goBack = useGoBack();

  return (
    <Dialog open={isMatch}>
      <DialogTitle>Receive to</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={goBack} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
