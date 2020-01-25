import { generateUuid } from "_r/generateUuid";
import { callMain } from "_r/redux/callMain";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponseMtR } from "_t/IpcMessages";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { RpcResponse } from "_t/bitcoindRpcResponses";

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
type UnsentRpcRequest = Omit<RpcRequest, "requestId">;
class RpcClientCache {
  results: { [stringifiedRpcRequest: string]: RpcResponse } = {};

  add = (rpcRequest: UnsentRpcRequest, result: RpcResponse, ttl: number) => {
    const stringifiedRpcRequest = JSON.stringify(rpcRequest);

    this.results[stringifiedRpcRequest] = result;

    setTimeout(() => {
      delete this.results[stringifiedRpcRequest];
    }, ttl);
  };

  get = (rpcRequest: UnsentRpcRequest) =>
    this.results[JSON.stringify(rpcRequest)];
}
const rpcClientCache = new RpcClientCache();
export const rpcClient = <TRpcRequest extends UnsentRpcRequest>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
  cacheTtl?: number,
): Promise<RpcClientReturnType<TRpcRequest>> => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (cacheTtl) {
      const cacheResults = rpcClientCache.get(rpcRequest);

      if (cacheResults) {
        return resolve(cacheResults as RpcClientReturnType<TRpcRequest>);
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
