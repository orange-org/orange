import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import { setHasRpcIssue } from "_r/redux/actions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { testIds } from "_tu/testIds";
import { useAtomicCss } from "_r/useAtomicCss";
import { useConnectionStatus } from "../useConnectionStatus";

export const AwaitBtcd = () => {
  const hasRpcIssue = useSelector(state => state.hasRpcIssue);
  const dispatch = useDispatch();
  const isOpen = !!hasRpcIssue;
  const a = useAtomicCss();

  const { isConnected } = useConnectionStatus();

  useEffect(() => {
    if (isConnected) {
      dispatch(setHasRpcIssue(false));
    }
  }, [dispatch, isConnected]);

  return (
    <Dialog
      open={isOpen}
      data-testid={testIds.awaitBtcdDialog}
      fullWidth
      maxWidth="sm"
    >
      <div className={a("padding6")}>
        <Typography variant="h2" className={a("marginTop05")}>
          Starting up...
        </Typography>
        <LinearProgress color="secondary" className={a("marginTop05")} />
        <div className={a("marginTop05")} />
      </div>
    </Dialog>
  );
};
