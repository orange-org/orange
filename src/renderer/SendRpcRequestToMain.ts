import {
  RpcRequest,
  MessageFromRenderer,
  RpcRequestWithNonce,
} from "typings/types";

export const sendRpcRequestToMain = (data: RpcRequestWithNonce) => {
  window.postMessage({ source: "@orange/renderer", ...data }, "*");
};
