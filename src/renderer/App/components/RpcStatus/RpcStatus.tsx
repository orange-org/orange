/* eslint-disable no-nested-ternary */
import { CircularProgress, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { CheckCircleOutline } from "@material-ui/icons";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { TRpcIssue } from "_r/RpcService/RpcIssue";

export const RpcStatus: React.FC<{
  issue: TRpcIssue | "newConfig" | null;
}> = props => {
  const a = useAtomicCss();
  const status = !props.issue
    ? "connected"
    : props.issue === "serverWarmingUp"
    ? /* istanbul ignore next */ "waiting for server to warm up..."
    : props.issue === "newConfig"
    ? "checking new configurations..."
    : "unable to connect. Retrying...";

  return (
    <div className={a("displayFlex", "alignItemsCenter")}>
      <Typography variant="h5">Connection status: {status}</Typography>

      <div className={a("marginLeft02", "displayFlex", "alignItemsCenter")}>
        {status === "connected" ? (
          <CheckCircleOutline fontSize="small" style={{ color: green[500] }} />
        ) : (
          <CircularProgress color="secondary" size={15} />
        )}
      </div>
    </div>
  );
};
