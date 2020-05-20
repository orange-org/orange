import { RpcConfigurations } from "./IpcMessages";

export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: null;
  walletName?: undefined;
};

export type BestBlockHashRpcRequest = {
  method: "getbestblockhash";
  params?: null;
  walletName?: undefined;
};

export type BlockchainInfoRpcRequest = {
  method: "getblockchaininfo";
  params?: null;
  walletName?: undefined;
};

export type BlockRpcRequest = {
  method: "getblock";
  params: [string, number?];
  walletName?: undefined;
};

export type UptimeRpcRequest = {
  method: "uptime";
  params?: [];
  walletName?: undefined;
};

export type PeerInfoRpcRequest = {
  method: "getpeerinfo";
  params?: null;
  walletName?: undefined;
};

export type MempoolInfoRpcRequest = {
  method: "getmempoolinfo";
  params?: null;
  walletName?: undefined;
};

export type SetNetworkActiveRpcRequest = {
  method: "setnetworkactive";
  params: { state: boolean };
  walletName?: undefined;
};

export type RpcInfoRpcRequest = {
  method: "getrpcinfo";
  params?: null;
  walletName?: undefined;
};

export type ChainTipsRpcRequest = {
  method: "getchaintips";
  params?: null;
  walletName?: undefined;
};

export type BlockHeaderRpcRequest = {
  method: "getblockheader";
  params: [string];
  walletName?: undefined;
};

export type BlockHashRpcRequest = {
  method: "getblockhash";
  params: [number];
  walletName?: undefined;
};

export type RawTransactionRpcRequest = {
  method: "getrawtransaction";
  params: [string, boolean?];
  walletName?: undefined;
};

export type CreateWalletRpcRequest = {
  method: "createwallet";
  params: [string, boolean?, boolean?, string?, boolean?];
  walletName?: undefined;
};

export type ListWalletsRpcRequest = {
  method: "listwallets";
  params?: null;
  walletName?: undefined;
};

export type SetHdSeed = {
  method: "sethdseed";
  params?: [boolean?, string?];
  walletName: string;
};

export type RpcRequest = {
  connectionConfigurations?: RpcConfigurations | null;
} & (
  | NetworkInfoRpcRequest
  | BestBlockHashRpcRequest
  | BlockchainInfoRpcRequest
  | BlockRpcRequest
  | UptimeRpcRequest
  | PeerInfoRpcRequest
  | MempoolInfoRpcRequest
  | SetNetworkActiveRpcRequest
  | RpcInfoRpcRequest
  | ChainTipsRpcRequest
  | BlockHeaderRpcRequest
  | BlockHashRpcRequest
  | RawTransactionRpcRequest
  | CreateWalletRpcRequest
  | ListWalletsRpcRequest
  | SetHdSeed
);

export type RpcRequestWithNonce = { nonce: NONCE } & RpcRequest;
