export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: undefined;
};

export type BestBlockHashRpcRequest = {
  method: "getbestblockhash";
  params?: undefined;
};

export type BlockchainInfoRpcRequest = {
  method: "getblockchaininfo";
  params?: undefined;
};

export type BlockRpcRequest = {
  method: "getblock";
  params: [string, number?];
};

export type RpcRequest = { requestId: string } & (
  | NetworkInfoRpcRequest
  | BestBlockHashRpcRequest
  | BlockchainInfoRpcRequest
  | BlockRpcRequest
);

export type RpcRequestWithNonce = { nonce: __NONCE__ } & RpcRequest;
