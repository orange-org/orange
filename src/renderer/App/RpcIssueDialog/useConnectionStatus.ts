import { useEffect, useState } from "react";
import { ipcService } from "_r/IpcService/IpcService";
import { Poll } from "_r/utils/Poll";
import { Utils } from "_r/utils/Utils";
import { RpcConfigurations } from "_t/IpcMessages";
import { TRpcIssue, RpcIssue } from "_r/RpcClient/RpcIssue";

export const useConnectionStatus = (
  rpcConfigurations?: RpcConfigurations | null,
) => {
  const [connectionIssue, setConnectionIssue] = useState<
    TRpcIssue | "newConfig" | null
  >("newConfig");
  const { username, password, serverUrl, cookiePath } =
    rpcConfigurations || ({} as any);

  // Every time we pass new connectionConfigurations we run the effect below
  useEffect(() => {
    let isMounted = true;
    // We start by indicating that we've received new config.
    setConnectionIssue("newConfig");

    // We then declare our polling function
    const poll = new Poll(async () => {
      if (rpcConfigurations && !Utils.isValidUrl(rpcConfigurations.serverUrl)) {
        setConnectionIssue("serverUnreachable");
      } else {
        const response = await ipcService.rpcRequest(__NONCE__, {
          method: "uptime",
          connectionConfigurations: rpcConfigurations,
        });

        if (response.error && isMounted) {
          setConnectionIssue(RpcIssue.determineRpcIssue(response.error));
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
    const timeoutId = setTimeout(() => {
      poll.start();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      poll.stop();
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, serverUrl, cookiePath]);

  const isUnauthorized = connectionIssue === "unauthorized";
  const isServerWarmingUp = connectionIssue === "serverWarmingUp";
  const isConnected = connectionIssue === null;

  return { isUnauthorized, isServerWarmingUp, isConnected, connectionIssue };
};
