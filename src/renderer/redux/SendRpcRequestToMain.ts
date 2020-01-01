import { RpcRequestWithNonce, RpcRequest } from "typings/bitcoindRpcRequests";
import { MessageFromRenderer } from "typings/types";

export const sendRpcRequestToMain = (data: RpcRequestWithNonce) => {
  const { nonce, ...message } = data;
  const messageFromRenderer: MessageFromRenderer<RpcRequest> = {
    type: "rpc-request",
    source: "@orange/renderer",
    nonce,
    message,
  };

  window.postMessage(messageFromRenderer, "*");
};
