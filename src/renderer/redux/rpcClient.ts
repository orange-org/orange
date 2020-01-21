import { generateUuid } from "_r/generateUuid";
import { callMain } from "_r/redux/callMain";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponse } from "_t/bitcoindRpcResponses";
import { RpcResponseMtR } from "_t/IpcMessages";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is RpcResponseMtR => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

export const rpcClient = <TRpcRequest extends Omit<RpcRequest, "requestId">>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
): Promise<Extract<RpcResponse, { method: TRpcRequest["method"] }>> => {
  return new Promise(resolve => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        window.removeEventListener("message", windowMessageEventHandler);

        resolve(
          response.message as Extract<
            RpcResponse,
            { method: TRpcRequest["method"] }
          >,
        );
      }
    };
    window.addEventListener("message", windowMessageEventHandler);

    callMain({
      nonce,
      type: "rpc-request",
      message: { ...rpcRequest, requestId } as RpcRequest,
    });
  });
};
