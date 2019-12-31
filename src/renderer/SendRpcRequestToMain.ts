import { RpcRequestWithNonce } from "typings/types";

export const sendRpcRequestToMain = (data: RpcRequestWithNonce) => {
  window.postMessage(
    { type: "bitcoind-rpc-request", source: "@orange/renderer", ...data },
    "*",
  );
};
