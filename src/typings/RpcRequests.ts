import { RpcConfigurations } from "./IpcMessages";

export type NetworkInfoRpcRequest = {
  method: "getnetworkinfo";
  params?: null;
  walletName?: null;
};

export type BestBlockHashRpcRequest = {
  method: "getbestblockhash";
  params?: null;
  walletName?: null;
};

export type BlockchainInfoRpcRequest = {
  method: "getblockchaininfo";
  params?: null;
  walletName?: null;
};

export type BlockRpcRequest = {
  method: "getblock";
  params: [string, number?];
  walletName?: null;
};

export type UptimeRpcRequest = {
  method: "uptime";
  params?: [];
  walletName?: null;
};

export type PeerInfoRpcRequest = {
  method: "getpeerinfo";
  params?: null;
  walletName?: null;
};

export type MempoolInfoRpcRequest = {
  method: "getmempoolinfo";
  params?: null;
  walletName?: null;
};

export type SetNetworkActiveRpcRequest = {
  method: "setnetworkactive";
  params: { state: boolean };
  walletName?: null;
};

export type RpcInfoRpcRequest = {
  method: "getrpcinfo";
  params?: null;
  walletName?: null;
};

export type ChainTipsRpcRequest = {
  method: "getchaintips";
  params?: null;
  walletName?: null;
};

export type BlockHeaderRpcRequest = {
  method: "getblockheader";
  params: [string];
  walletName?: null;
};

export type BlockHashRpcRequest = {
  method: "getblockhash";
  params: [number];
  walletName?: null;
};

export type RawTransactionRpcRequest = {
  method: "getrawtransaction";
  params: [string, number?];
  walletName?: null;
};

export type ListWalletsRpcRequest = {
  method: "listwallets";
  params?: null;
  walletName?: null;
};

export type ListWalletDirRpcRequest = {
  method: "listwalletdir";
  params?: null;
  walletName?: null;
};

export type SetHdSeed = {
  method: "sethdseed";
  params?: [boolean?, string?];
  walletName: string;
};

export type CreateWalletRpcRequest = {
  method: "createwallet";
  params: [string, boolean?, boolean?, string?, boolean?];
  walletName?: null;
};

export type ListTransactionsRpcRequest = {
  method: "listtransactions";
  params: ["*", number, number, boolean];
  walletName: string;
};

export type WalletPassPhraseRpcRequest = {
  method: "walletpassphrase";
  params: [string, number];
  walletName: string;
};

export type WalletLockRpcRequest = {
  method: "walletlock";
  params?: null;
  walletName: string;
};

export type RpcRequest =
  | NetworkInfoRpcRequest
  | WalletLockRpcRequest
  | BestBlockHashRpcRequest
  | BlockchainInfoRpcRequest
  | BlockRpcRequest
  | UptimeRpcRequest
  | PeerInfoRpcRequest
  | MempoolInfoRpcRequest
  | SetNetworkActiveRpcRequest
  | ListWalletDirRpcRequest
  | RpcInfoRpcRequest
  | ListTransactionsRpcRequest
  | ChainTipsRpcRequest
  | BlockHeaderRpcRequest
  | WalletPassPhraseRpcRequest
  | BlockHashRpcRequest
  | ListWalletsRpcRequest
  | SetHdSeed
  | CreateWalletRpcRequest
  | RawTransactionRpcRequest;

export type RpcRequestWithNonce = { nonce: NONCE } & RpcRequest;
