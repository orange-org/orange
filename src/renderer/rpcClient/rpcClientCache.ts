import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";

class RpcClientCache {
  results: { [stringifiedRpcRequest: string]: RpcResponse } = {};

  add = (rpcRequest: RpcRequest, result: RpcResponse, duration: number) => {
    const stringifiedRpcRequest = JSON.stringify(rpcRequest);

    this.results[stringifiedRpcRequest] = result;

    setTimeout(() => {
      delete this.results[stringifiedRpcRequest];
    }, duration);
  };

  get = (rpcRequest: RpcRequest) => this.results[JSON.stringify(rpcRequest)];
}

export const rpcClientCache = new RpcClientCache();
