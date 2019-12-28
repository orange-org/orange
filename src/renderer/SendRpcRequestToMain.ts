import { RpcRequest } from "typings/types";

export const sendRpcRequestToMain = (data: Omit<RpcRequest, "source">) => {
  window.postMessage({ source: "@orange/renderer", ...data }, "*");
};
