import { RpcRequestWithNonce, RpcRequest } from "typings/bitcoindRpcRequests";
import { MessageFromRenderer } from "typings/types";

export const sendRpcRequestToMain = (data: RpcRequestWithNonce) => {
  const message: MessageFromRenderer<RpcRequest> = {
    type: "bitcoind-rpc-request",
    source: "@orange/renderer",
    nonce: data.nonce,
    message: data,
  };

  window.postMessage(message, "*");
};
