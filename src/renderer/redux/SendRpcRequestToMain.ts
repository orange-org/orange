import { RpcRequestWithNonce } from "typings/bitcoindRpcRequests";
import { MessageToMain } from "typings/IpcMessages";

export const sendRpcRequestToMain = (data: RpcRequestWithNonce) => {
  const { nonce, ...message } = data;
  const messageFromRenderer: MessageToMain = {
    type: "rpc-request",
    source: "@orange/renderer",
    nonce,
    message,
  };

  window.postMessage(messageFromRenderer, "*");
};
