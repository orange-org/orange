import { lighten, Tooltip, Typography, useTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { FiberManualRecord } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "_r/App/hooks/useInterval";
import { Selectors } from "_r/redux/Selectors";
import { Thunks } from "_r/redux/Thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import { Poll } from "_r/utils/Poll";

type Status = "syncing" | "waiting" | "connected";

const useRpcDataRequest = () => {
  const dispatch = useDispatch();

  return useEffect(() => {
    const poll = new Poll(async () => {
      dispatch(Thunks.requestBlockchainInfo(__NONCE__, 4000));
      dispatch(Thunks.requestPeerInfo(__NONCE__, 4000));
    }, 5000);

    poll.start();

    return poll.stop;
  });
};

const useStatusColor = (status: Status) => {
  const theme = useTheme();
  const colors = {
    lightOrange: lighten(theme.palette.secondary.main, 0.3),
    orange: theme.palette.secondary.main,
    grey: grey[500],
  };
  const [color, setColor] = useState<keyof typeof colors>("grey");

  useInterval(() => {
    if (status === "connected") {
      setColor("orange");
    } else if (status === "syncing") {
      setColor(color !== "lightOrange" ? "lightOrange" : "orange");
    } else if (status === "waiting") {
      setColor("grey");
    }
  }, 900);

  return colors[color];
};

export const useStatus = (): Status => {
  const hasPeers = useSelector(Selectors.hasPeers);
  const isSyncing = useSelector(Selectors.isSyncing);

  if (!hasPeers) {
    return "waiting";
  }

  if (isSyncing) {
    return "syncing";
  }

  return "connected";
};

const useVerificationPercentage = () => {
  const verificationProgress = useSelector(
    state => state.blockchainInfo?.verificationprogress,
  );

  return Number(verificationProgress || 0.0).toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  });
};

const useStatusText = (status: Status) => {
  const verificationPercentage = useVerificationPercentage();

  if (status === "waiting") {
    return "Looking for network connection...";
  }
  if (status === "syncing") {
    return `Synchronizing (${verificationPercentage} completed)...`;
  }

  return "Connected";
};

export const StatusIndicator = () => {
  const status = useStatus();
  const color = useStatusColor(status);
  const statusText = useStatusText(status);
  const a = useAtomicCss();

  useRpcDataRequest();

  return (
    <Tooltip
      arrow
      title={
        <div className={a("padding1")}>
          <Typography>{statusText}</Typography>
        </div>
      }
    >
      <FiberManualRecord fontSize="small" style={{ color }} />
    </Tooltip>
  );
};
