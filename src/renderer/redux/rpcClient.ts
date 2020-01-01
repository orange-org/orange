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

export const rpcClient = async (
  nonce: __NONCE__,
  rpcRequest: Omit<RpcRequest, "requestId">,
) => {
  return new Promise<RpcResponse>((resolve, reject) => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        if (response.message.ok) {
          resolve(response.message);
        } else {
          reject(response.message);
        }

        window.removeEventListener("message", windowMessageEventHandler);
      }
    };
    window.addEventListener("message", windowMessageEventHandler);

    callMain<RpcRequest>({
      nonce,
      type: "rpc-request",
      message: { ...rpcRequest, requestId },
    });
  });
};
