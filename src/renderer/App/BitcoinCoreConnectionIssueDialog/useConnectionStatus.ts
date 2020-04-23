import { useEffect, useState } from "react";
import { callMain } from "_r/ipc/callMain";
import {
  BitcoinCoreConnectionIssue,
  determineBitcoinCoreConnectionIssue,
} from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { poll } from "_r/utils/poll";
import { RpcRequest } from "_t/RpcRequests";

export const useConnectionStatus = (
  connectionConfigurations?: RpcRequest["connectionConfigurations"],
) => {
  const [connectionIssue, setConnectionIssue] = useState<
    BitcoinCoreConnectionIssue | "newConfig" | null
  >(null);
  const { username, password, serverUrl, cookieFile } =
    connectionConfigurations || ({} as any);

  // Every time we pass new connectionConfigurations we run the effect below
  useEffect(() => {
    // We start by indicating that we've received new config.
    setConnectionIssue("newConfig");

    // We then declare our polling function
    const polling = poll(async () => {
      const { payload: response } = await callMain({
        nonce: __NONCE__,
        type: "rpc-request",
        payload: {
          method: "uptime",
          connectionConfigurations,
        },
      });

      if (response.error) {
        setConnectionIssue(determineBitcoinCoreConnectionIssue(response.error));
      } else {
        setConnectionIssue(null);
      }
    }, 1000);

    // We don't want to start polling right away because we might be sending
    // a quick series of connectionConfigurations. We want to wait 1000ms
    // before we start polling. If the connectionConfigurations change before
    // this timeout, the `polling.stop` function instead will be called, as you
    // can see in the return value a few lines below.
    setTimeout(() => {
      polling.start();
    }, 1000);

    return polling.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, serverUrl, cookieFile]);

  const isUnauthorized = connectionIssue === "unauthorized";
  const isServerWarmingUp = connectionIssue === "serverWarmingUp";
  const isConnected = connectionIssue === null;

  return { isUnauthorized, isServerWarmingUp, isConnected, connectionIssue };
};
