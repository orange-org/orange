import { UnsentRpcRequest } from "_t/bitcoindRpcRequests";
import { RpcResponse } from "_t/bitcoindRpcResponses";

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

export const rpcClientCache = new RpcClientCache();
