import { useEffect, useState } from "react";
import { ipcService } from "_r/IpcService/IpcService";
import { Poll } from "_r/utils/Poll";

export const useConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "notReady" | "ready"
  >("notReady");

  useEffect(() => {
    const poll = new Poll(async () => {
      const response = await ipcService.rpcRequest(__NONCE__, {
        method: "uptime",
      });

      if (!response.error) {
        setConnectionStatus("ready");
      }
    }, 1000);

    poll.start();

    return poll.stop;
  }, []);

  return connectionStatus;
};
