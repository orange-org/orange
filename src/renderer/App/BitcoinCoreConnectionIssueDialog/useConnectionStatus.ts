import { useEffect, useState } from "react";
import { makeRpcRequest } from "_r/rpcClient/makeRpcRequest";
import {
  BitcoinCoreConnectionIssue,
  determineBitcoinCoreConnectionIssue,
} from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { poll } from "_r/utils/poll";
import { RpcRequest } from "_t/RpcRequests";

export const useConnectionStatus = (
  connectionConfigurations?: RpcRequest["connectionConfigurations"],
) => {
  const [
    connectionIssue,
    setConnectionIssue,
  ] = useState<BitcoinCoreConnectionIssue | null>(null);

  console.log("=\nFILE: useConnectionStatus.ts\nLINE: 18\n=");

  useEffect(() => {
    const stopPolling = poll(async () => {
      const response = await makeRpcRequest(__NONCE__, {
        method: "uptime",
        connectionConfigurations,
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
