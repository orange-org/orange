import { Dialog, LinearProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "_r/redux/Actions";
import { useAtomicCss } from "_r/useAtomicCss";
import { testIds } from "_r/testIds";
import { useConnectionStatus } from "../useConnectionStatus";

export const AwaitBtcd = () => {
  const hasRpcIssue = useSelector(state => state.hasRpcIssue);
  const dispatch = useDispatch();
  const isOpen = !!hasRpcIssue;
  const a = useAtomicCss();

  const { isConnected } = useConnectionStatus();

  useEffect(() => {
    if (isConnected) {
      dispatch(Actions.setHasRpcIssue(false));
    }
  }, [dispatch, isConnected]);

  return (
    <Dialog
      open={isOpen}
      /**
       * Not sure why when `isOpen` is `false`, the dialog would remain in the DOM, which
       * is making it hard in the tests to detect when the dialog has been closed.
       *
       * It works correctly in the production environment, just not in the tests.
       *
       * So the following logic helps us fix this in the tests.
       */
      data-testid={`${testIds.awaitBtcdDialog}${isOpen ? "" : "-closed"}`}
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
