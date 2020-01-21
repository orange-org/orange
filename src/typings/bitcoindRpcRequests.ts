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

export type UptimeRpcRequest = {
  method: "uptime";
  params?: [];
};

export type PeerInfoRpcRequest = {
  method: "getpeerinfo";
  params?: undefined;
};

export type MempoolInfoRpcRequest = {
  method: "getmempoolinfo";
  params?: undefined;
};

export type SetNetworkActiveRpcRequest = {
  method: "setnetworkactive";
  params: { state: boolean };
};

// There's no such thing as `error` RPC request.
// This is here to satisfy TypeScript
export type ErrorRpcRequest = {
  method: "error";
  params?: undefined;
};

export type RpcRequest = { requestId: string } & (
  | NetworkInfoRpcRequest
  | BestBlockHashRpcRequest
  | BlockchainInfoRpcRequest
  | BlockRpcRequest
  | UptimeRpcRequest
  | PeerInfoRpcRequest
  | MempoolInfoRpcRequest
  | SetNetworkActiveRpcRequest
  | ErrorRpcRequest
);

export type RpcRequestWithNonce = { nonce: NONCE } & RpcRequest;
