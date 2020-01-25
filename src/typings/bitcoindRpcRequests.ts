export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: null;
};

export type BestBlockHashRpcRequest = {
  method: "getbestblockhash";
  params?: null;
};

export type BlockchainInfoRpcRequest = {
  method: "getblockchaininfo";
  params?: null;
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
  params?: null;
};

export type MempoolInfoRpcRequest = {
  method: "getmempoolinfo";
  params?: null;
};

export type SetNetworkActiveRpcRequest = {
  method: "setnetworkactive";
  params: { state: boolean };
};

export type RpcInfoRpcRequest = {
  method: "getrpcinfo";
  params?: null;
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
  | RpcInfoRpcRequest
);

export type RpcRequestWithNonce = { nonce: NONCE } & RpcRequest;
