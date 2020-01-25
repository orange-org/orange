import { generateUuid } from "_r/generateUuid";
import { callMain } from "_r/redux/callMain";
import { RpcRequest, UnsentRpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponseMtR } from "_t/IpcMessages";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { rpcClientCache } from "./rpcClientCache";

const isRpcResponse = (
  response: any,
  requestId: string,
): response is RpcResponseMtR => {
  return (
    response?.message?.requestId === requestId &&
    response?.source === "@orange/main"
  );
};

type RpcClientReturnType<T extends UnsentRpcRequest> = Extract<
  ExtractedRpcResponse<T>,
  { error: null }
>;

export const rpcClient = <TRpcRequest extends UnsentRpcRequest>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
  cacheTtl?: number,
): Promise<RpcClientReturnType<TRpcRequest>> => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (cacheTtl) {
      const cacheResult = rpcClientCache.get(rpcRequest);

      if (cacheResult) {
        return resolve(cacheResult as RpcClientReturnType<TRpcRequest>);
      }
    }

    const requestId = generateUuid();
    const windowMessageEventHandler = (event: MessageEvent) => {
      const { data: response } = event;

      if (isRpcResponse(response, requestId)) {
        window.removeEventListener("message", windowMessageEventHandler);

        if (response.message.error) {
          reject(response.message.error);
        } else {
          if (cacheTtl) {
            rpcClientCache.add(rpcRequest, response.message, cacheTtl);
          }

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
