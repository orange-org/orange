import { useEffect, useState } from "react";
import {
  BitcoinCoreConnectionIssue,
  determineBitcoinCoreConnectionIssue,
} from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { poll } from "_r/utils/poll";
import { RpcRequest } from "_t/RpcRequests";
import { callMain } from "_r/ipc/callMain";

export const useConnectionStatus = (
  connectionConfigurations?: RpcRequest["connectionConfigurations"],
) => {
  const [
    connectionIssue,
    setConnectionIssue,
  ] = useState<BitcoinCoreConnectionIssue | null>(null);

  useEffect(() => {
    const stopPolling = poll(async () => {
      const { message: response } = await callMain({
        nonce: __NONCE__,
        type: "rpc-request",
        message: {
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

    return stopPolling;
  });

  const isUnauthorized = connectionIssue === "unauthorized";
  const isServerWarmingUp = connectionIssue === "serverWarmingUp";
  const isConnected = connectionIssue === null;

  return { isUnauthorized, isServerWarmingUp, isConnected, connectionIssue };
};
