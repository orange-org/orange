import { RpcRequest } from "_r/typings/RpcRequests";
import { RpcResponse } from "_r/typings/RpcResponses";

class RpcClientCache {
  private results: { [stringifiedRpcRequest: string]: RpcResponse } = {};

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
