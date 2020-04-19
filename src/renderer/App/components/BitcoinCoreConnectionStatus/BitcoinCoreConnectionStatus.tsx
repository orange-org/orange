import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, CircularProgress } from "@material-ui/core";
import * as selectors from "_r/redux/selectors";
import { State } from "_r/redux/reducers/reducer";
import { useSelector } from "react-redux";
import { CheckCircle } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

export const BitcoinCoreConnectionStatus = () => {
  const a = useAtomicCss();
  const bitcoinCoreConnectionIssue = useSelector(
    selectors.determineBitcoinConnectionIssue,
  );
  type Issue = keyof State["bitcoinCoreConnectionIssues"];
  const issueDefinitions: {
    [key in Issue]: { status: string };
  } = {
    isServerUnreachable: {
      status: "retrying...",
    },
    isCookieUnavailable: {
      status: "retrying...",
    },
    isUnauthorized: {
      status: "retrying...",
    },
    isServerWarmingUp: {
      status: "waiting for server to warm up...",
    },
  };

  const issueDefinition = !bitcoinCoreConnectionIssue
    ? {
        status: "connected",
      }
    : issueDefinitions[bitcoinCoreConnectionIssue];

  return (
    <div className={a("displayFlex", "alignItemsCenter")}>
      <Typography variant="h5">
        Connection status: {issueDefinition.status}
      </Typography>

      <div className={a("marginLeft02", "displayFlex", "alignItemsCenter")}>
        {issueDefinition.status === "connected" ? (
          <CheckCircle fontSize="small" style={{ color: green[500] }} />
        ) : (
          <CircularProgress color="secondary" size={15} />
        )}
      </div>
    </div>
  );
};
