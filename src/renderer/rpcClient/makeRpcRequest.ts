import { callMain } from "_r/ipc/callMain";
import { generateUuid } from "_r/utils/smallUtils";
import { RpcResponseMtR } from "_t/IpcMessages";
import { RpcRequest, UnsentRpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is RpcResponseMtR => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

export type MakeRpcRequestReturnType<T extends UnsentRpcRequest> = Extract<
  RpcResponse,
  Extract<RpcResponse, { method: T["method"] }>
>;

export const makeRpcRequest = <TRpcRequest extends UnsentRpcRequest>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
): Promise<MakeRpcRequestReturnType<TRpcRequest>> => {
  return new Promise(resolve => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        window.removeEventListener("message", windowMessageEventHandler);
        resolve(response.message as MakeRpcRequestReturnType<TRpcRequest>);
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
