import { generateUuid } from "_r/generateUuid";
import { callMain } from "_r/redux/callMain";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponseMtR } from "_t/IpcMessages";
import { ExtractedRpcResponse } from "_t/typeHelpers";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is RpcResponseMtR => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

type RpcClientReturnType<T extends Omit<RpcRequest, "requestId">> = Extract<
  ExtractedRpcResponse<T>,
  { error: undefined }
>;
export const rpcClient = <TRpcRequest extends Omit<RpcRequest, "requestId">>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
): Promise<RpcClientReturnType<TRpcRequest>> => {
  return new Promise((resolve, reject) => {
    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        window.removeEventListener("message", windowMessageEventHandler);

        if (response.message.error) {
          reject(response.message.error);
        } else {
          resolve(response.message as RpcClientReturnType<TRpcRequest>);
        }
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
