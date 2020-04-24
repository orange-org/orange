import { useEffect, useState } from "react";
import { ipcService } from "_r/ipc/ipcService";
import { RpcIssue, determineRpcIssue } from "_r/utils/rpcIssueHelpers";
import { poll } from "_r/utils/poll";
import { isValidUrl } from "_r/utils/smallUtils";
import { RpcConfigurations } from "_t/IpcMessages";

export const useConnectionStatus = (rpcConfigurations?: RpcConfigurations) => {
  const [connectionIssue, setConnectionIssue] = useState<
    RpcIssue | "newConfig" | null
  >(null);
  const { username, password, serverUrl, cookieFile } =
    rpcConfigurations || ({} as any);

  // Every time we pass new connectionConfigurations we run the effect below
  useEffect(() => {
    let isMounted = true;
    // We start by indicating that we've received new config.
    setConnectionIssue("newConfig");

    // We then declare our polling function
    const polling = poll(async () => {
      if (rpcConfigurations && !isValidUrl(rpcConfigurations.serverUrl)) {
        setConnectionIssue("serverUnreachable");
      } else {
        const response = await ipcService.rpcRequest(__NONCE__, {
          method: "uptime",
          connectionConfigurations: rpcConfigurations,
        });

        if (response.error && isMounted) {
          setConnectionIssue(determineRpcIssue(response.error));
        } else if (isMounted) {
          setConnectionIssue(null);
        }
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

    return () => {
      polling.stop();
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, serverUrl, cookieFile]);

  const isUnauthorized = connectionIssue === "unauthorized";
  const isServerWarmingUp = connectionIssue === "serverWarmingUp";
  const isConnected = connectionIssue === null;

  return { isUnauthorized, isServerWarmingUp, isConnected, connectionIssue };
};
