import { generateUuid } from "_r/generateUuid";
import { callMain } from "_r/redux/callMain";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponse } from "_t/bitcoindRpcResponses";
import { RpcResponseMtR } from "_t/IpcMessages";
import { OmitDistributed } from "_t/typeHelpers";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is RpcResponseMtR => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

export const rpcClient = (
  nonce: NONCE,
  rpcRequest: OmitDistributed<RpcRequest, "requestId">,
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

    callMain({
      nonce,
      type: "rpc-request",
      message: { ...rpcRequest, requestId },
    });
  });
};
