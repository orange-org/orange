import { CircularProgress, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { CheckCircle } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as selectors from "_r/redux/selectors";
import { useAtomicCss } from "_r/useAtomicCss";
import { rpcService } from "_r/rpcClient/rpcService";

export const BitcoinCoreConnectionStatus = () => {
  const a = useAtomicCss();
  const bitcoinCoreConnectionIssue = useSelector(
    selectors.determineBitcoinConnectionIssue,
  );

  useEffect(() => {
    async function effect() {
      /**
       * We send this request to nudge the status of the server. The Redux store
       * should get updated if there are any issues with the request.
       *
       * The rest of our code in this component works off of the Redux store.
       */
      await rpcService.requestUptime(__NONCE__);
    }

    effect();
  });

  // eslint-disable-next-line no-nested-ternary
  const status = !bitcoinCoreConnectionIssue
    ? "connected"
    : bitcoinCoreConnectionIssue === "isServerWarmingUp"
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
