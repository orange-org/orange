/* eslint-disable camelcase */
import {
  NetworkInfoRpcRequest,
  BlockchainInfoRpcRequest,
  BlockRpcRequest,
  UptimeRpcRequest,
  PeerInfoRpcRequest,
  MempoolInfoRpcRequest,
} from "typings/bitcoindRpcRequests";

type CreateRpcResponse<Method, Result> = {
  method: Method;
  payload: {
    result: Result;
  };
};

type LocalServicesNames = "WITNESS" | "NETWORK_LIMITED" | "NETWORK";

type Network = {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
};

export type NetworkInfo = {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localservicesnames: LocalServicesNames[];
  localrelay: boolean;
  timeoffset: number;
  networkactive: boolean;
  connections: number;
  networks: [Network, Network, Network];
  relayfee: number;
  incrementalfee: number;
  localaddresses: [];
  warnings: string;
};

export type NetworkInfoRpcResponse = CreateRpcResponse<
  NetworkInfoRpcRequest["method"],
  NetworkInfo
>;

export type BlockchainInfo = {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  pruneheight: number;
  automatic_pruning: boolean;
  prune_target_size: number;
  softforks: {
    bip34: {
      type: string;
      active: boolean;
      height: number;
    };
    bip66: {
      type: string;
      active: boolean;
      height: number;
    };
    bip65: {
      type: string;
      active: boolean;
      height: number;
    };
    csv: {
      type: string;
      active: boolean;
      height: number;
    };
    segwit: {
      type: string;
      active: boolean;
      height: number;
    };
  };
  warnings: string;
};

export type BestBlockHashRpcResponse = CreateRpcResponse<
  BlockchainInfoRpcRequest["method"],
  BlockchainInfo
>;

export type Block = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: string[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
};

export type BlockRpcResponse = CreateRpcResponse<
  BlockRpcRequest["method"],
  Block
>;

export type Uptime = number; // In seconds

export type UptimeRpcResponse = CreateRpcResponse<
  UptimeRpcRequest["method"],
  number
>;

export type PeerInfo = {
  id: number;
  addr: string;
  addrlocal: string;
  addrbind: string;
  services: string;
  servicesnames: LocalServicesNames[];
  relaytxes: boolean;
  lastsend: number;
  lastrecv: number;
  bytessent: number;
  bytesrecv: number;
  conntime: number;
  timeoffset: number;
  pingtime: number;
  minping: number;
  version: number;
  subver: string;
  inbound: boolean;
  addnode: boolean;
  startingheight: number;
  banscore: number;
  synced_headers: number;
  synced_blocks: number;
  inflight: [];
  whitelisted: boolean;
  permissions: [];
  minfeefilter: number;
  bytessent_per_msg: {
    feefilter: number;
    getaddr: number;
    ping: number;
    pong: number;
    sendcmpct: number;
    sendheaders: number;
    verack: number;
    version: number;
  };
  bytesrecv_per_msg: {
    addr: number;
    feefilter: number;
    getheaders: number;
    inv: number;
    ping: number;
    pong: number;
    sendcmpct: number;
    sendheaders: number;
    verack: number;
    version: number;
  };
}[];

export type PeerInfoRpcResponse = CreateRpcResponse<
  PeerInfoRpcRequest["method"],
  PeerInfo
>;

export type MempoolInfo = {
  loaded: boolean;
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mempoolminfee: number;
  minrelaytxfee: number;
};

export type MempoolInfoRpcResponse = CreateRpcResponse<
  MempoolInfoRpcRequest["method"],
  MempoolInfo
>;

export type RpcResponse = {
  ok: boolean;
  requestId: string;
} & (
  | NetworkInfoRpcResponse
  | BestBlockHashRpcResponse
  | BlockRpcResponse
  | UptimeRpcResponse
  | PeerInfoRpcResponse
  | MempoolInfoRpcResponse
);

export type RawRpcResponse = { result: any };
