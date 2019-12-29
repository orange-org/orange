import React from "react";
import { sendRpcRequestToMain } from "renderer/SendRpcRequestToMain";

export const RpcConsole: React.FC = () => {
  return (
    <>
      <p>RPC CONSOLE!!</p>
      <button
        type="button"
        onClick={() =>
          sendRpcRequestToMain({
            nonce: __NONCE__,
            method: "getnetworkinfo",
          })
        }
      >
        CLICK ME!
      </button>
    </>
  );
};
