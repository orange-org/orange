import {
  Typography,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { productName } from "_r/../../package.json";
import { RpcStatus } from "_r/App/components/RpcStatus/RpcStatus";
import { useAtomicCss } from "_r/useAtomicCss";
import { setHasRpcIssue } from "_r/redux/actions";
import { useDispatch } from "react-redux";
import { useConnectionStatus } from "./useConnectionStatus";

export const ConnectionStatusReport: React.FC<{
  onClickEnterServerDetails: () => void;
  onClickClose: () => void;
  disableClosing: boolean;
}> = props => {
  const a = useAtomicCss();
  const {
    isUnauthorized,
    isServerWarmingUp,
    isConnected,
    connectionIssue,
  } = useConnectionStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      dispatch(setHasRpcIssue(false));
    }
  }, [dispatch, isConnected]);

  return (
    <>
      <DialogContent data-testid="connection-status-report">
        {(!isUnauthorized && (
          <>
            <Typography variant="h4">
              Is Bitcoin Core running?{" "}
              {(isServerWarmingUp || isConnected) && "Yes, it looks like it!"}
            </Typography>

            <div className={a("marginTop05")}>
              <RpcStatus issue={connectionIssue} />
            </div>

            <Typography className={a("helperText")}>
              The status should automatically change to &quot;connected&quot;
              when you start Bitcoin Core and Orange is able to communicate with
              it. If it doesn&apos;t, try entering the server details manually.
            </Typography>
          </>
        )) || (
          <Typography data-testid="unauthorized-message">
            {productName} was not authorized to connect to Bitcoin Core. Please
            enter the correct username and password in the server details.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          className={a("marginTop05", "marginLeftAuto")}
          onClick={props.onClickEnterServerDetails}
        >
          Enter server details
        </Button>

        <Button
          onClick={props.onClickClose}
          disabled={props.disableClosing}
          color="primary"
          variant="contained"
          disableElevation
          className={a("marginTop05", "marginLeftAuto")}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
};
