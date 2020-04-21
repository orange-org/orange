import { CircularProgress, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { CheckCircle } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { rpcService } from "_r/rpcClient/rpcService";
import { BitcoinCoreConnectionIssue } from "_r/utils/bitcoinCoreConnectionIssueHelpers";

export const BitcoinCoreConnectionStatus: React.FC<{
  issue: BitcoinCoreConnectionIssue | null;
}> = props => {
  const a = useAtomicCss();
  // eslint-disable-next-line no-nested-ternary
  const status = !props.issue
    ? "connected"
    : props.issue === "serverWarmingUp"
    ? "waiting for server to warm up..."
    : "retrying...";

  return (
    <div className={a("displayFlex", "alignItemsCenter")}>
      <Typography variant="h5">Connection status: {status}</Typography>

      <div className={a("marginLeft02", "displayFlex", "alignItemsCenter")}>
        {status === "connected" ? (
          <CheckCircle fontSize="small" style={{ color: green[500] }} />
        ) : (
          <CircularProgress color="secondary" size={15} />
        )}
      </div>
    </div>
  );
};
