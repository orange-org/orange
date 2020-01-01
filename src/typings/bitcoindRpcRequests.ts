export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: undefined;
};

export type RpcRequest = { requestId: string } & NetworkInfoRpcRequest;

export type RpcRequestWithNonce = { nonce: __NONCE__ } & RpcRequest;
