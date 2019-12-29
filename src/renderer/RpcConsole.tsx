import React from "react";
import { sendRpcRequestToMain } from "renderer/SendRpcRequestToMain";
import { useShortPolling } from "renderer/hooks";
import Button from "@material-ui/core/Button";

export const RpcConsole: React.FC = () => {
  useShortPolling(
    () =>
      sendRpcRequestToMain({
        nonce: __NONCE__,
        method: "getnetworkinfo",
      }),
    1000,
  );

  return (
    <>
      <p>RPC CONSOLE!!</p>

      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  );
};
