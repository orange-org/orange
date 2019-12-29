import React from "react";
import { sendRpcRequestToMain } from "renderer/SendRpcRequestToMain";
import { useShortPolling } from "renderer/hooks";

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
      <button type="button" onClick={() => null}>
        CLICK ME!
      </button>
    </>
  );
};
