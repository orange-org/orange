import React from "react";
import { sendRpcRequestToMain } from "renderer/SendRpcRequestToMain";

export const RpcConsole: React.FC = () => {
  return (
    <div>
      <p>RPC CONSOLE!!</p>
      <button
        type="button"
        onClick={() =>
          sendRpcRequestToMain({
            method: "getnetworkinfo",
            nonce: __NONCE__,
          })
        }
      >
        CLICK ME!
      </button>
    </div>
  );
};
