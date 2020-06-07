import { useEffect, useState } from "react";
import { ipcService } from "_r/IpcService/IpcService";
import { Poll } from "_r/utils/Poll";
import { TRpcIssue, RpcIssue } from "_r/RpcService/RpcIssue";

export const useConnectionStatus = () => {
  const [connectionIssue, setConnectionIssue] = useState<
    TRpcIssue | "connected" | null
  >(null);

  useEffect(() => {
    setConnectionIssue(null);

    const poll = new Poll(async () => {
      const response = await ipcService.rpcRequest(__NONCE__, {
        method: "uptime",
      });

      if (response.error) {
        setConnectionIssue(RpcIssue.determineRpcIssue(response.error));
      } else {
        setConnectionIssue("connected");
      }
    }, 1000);

    poll.start();

    return poll.stop;
  }, []);

  const isServerWarmingUp = connectionIssue === "serverWarmingUp";
  const isConnected = connectionIssue === "connected";

  return { isServerWarmingUp, isConnected, connectionIssue };
};
