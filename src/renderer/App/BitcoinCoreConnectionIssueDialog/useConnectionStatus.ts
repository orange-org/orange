import { useEffect, useState } from "react";
import { makeRpcRequest } from "_r/rpcClient/makeRpcRequest";
import {
  BitcoinCoreConnectionIssue,
  determineBitcoinCoreConnectionIssue,
} from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { poll } from "_r/utils/poll";

export const useConnectionStatus = () => {
  const [
    connectionIssue,
    setConnectionIssue,
  ] = useState<BitcoinCoreConnectionIssue | null>(null);

  useEffect(() => {
    const stopPolling = poll(async () => {
      const response = await makeRpcRequest(__NONCE__, { method: "uptime" });

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
