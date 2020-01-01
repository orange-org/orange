export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: undefined;
};

export type BestBlockHashRpcRequest = {
  method: "getbestblockhash";
  params?: undefined;
};

export type RpcRequest = { requestId: string } & (
  | NetworkInfoRpcRequest
  | BestBlockHashRpcRequest
);

export type RpcRequestWithNonce = { nonce: __NONCE__ } & RpcRequest;
