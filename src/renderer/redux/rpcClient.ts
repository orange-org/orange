import { callMain } from "renderer/redux/callMain";
import { generateUuid } from "renderer/generateUuid";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { RpcResponse } from "typings/bitcoindRpcResponses";
import { MessageToRenderer } from "typings/types";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is MessageToRenderer<RpcResponse> => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

export const rpcClient = (
  nonce: NONCE,
  rpcRequest: Omit<RpcRequest, "requestId">,
): Promise<RpcResponse> => {
  return new Promise((resolve, reject) => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        window.removeEventListener("message", windowMessageEventHandler);

        if (response.message.ok) {
          resolve(response.message);
        } else {
          reject(response.message);
        }
      }
    };
    window.addEventListener("message", windowMessageEventHandler);

    callMain<RpcRequest>({
      nonce,
      type: "rpc-request",
      message: { ...(rpcRequest as RpcRequest), requestId },
    });
  });
};
