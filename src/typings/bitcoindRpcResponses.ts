/* eslint-disable camelcase */
import {
  NetworkInfoRpcRequest,
  BlockchainInfoRpcRequest,
  BlockRpcRequest,
  UptimeRpcRequest,
  PeerInfoRpcRequest,
  MempoolInfoRpcRequest,
  RpcInfoRpcRequest,
  ChainTipsRpcRequest,
  BlockHeaderRpcRequest,
  BlockHashRpcRequest,
  RawTransactionRpcRequest,
} from "_t/bitcoindRpcRequests";

export type RpcError = {
  code: number;
  message: string;
  payload?: any;
};

type CreateRpcResponse<Method, Result> =
  | {
      method: Method;
      result: Result;
      error: null;
    }
  | {
      method: Method;
      result: null;
      error: RpcError;
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
  pruneheight?: number;
  automatic_pruning?: boolean;
  prune_target_size?: number;
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

export type BlockchainInfoRpcResponse = CreateRpcResponse<
  BlockchainInfoRpcRequest["method"],
  BlockchainInfo
>;

export type Block = Readonly<{
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
  previousblockhash?: string;
  nextblockhash?: string;
}>;

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

export type RpcInfo = {
  active_commands: {
    method: string;
    duration: number;
  }[];
  logpath: string;
};

export type RpcInfoRpcResponse = CreateRpcResponse<
  RpcInfoRpcRequest["method"],
  RpcInfo
>;

export type ChainTips = {
  height: number;
  hash: string;
  branchlen: number;
  status:
    | "invalid"
    | "headers-only"
    | "valid-headers"
    | "valid-fork"
    | "active";
}[];

export type ChainTipsRpcResponse = CreateRpcResponse<
  ChainTipsRpcRequest["method"],
  ChainTips
>;

export type BlockHeader = {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
};

export type BlockHeaderRpcResponse = CreateRpcResponse<
  BlockHeaderRpcRequest["method"],
  BlockHeader
>;

export type BlockHash = string;

export type BlockHashRpcResponse = CreateRpcResponse<
  BlockHashRpcRequest["method"],
  BlockHash
>;

export type RawTransaction = {
  in_active_chain: boolean; // Whether specified block is in the active chain or not (only present with explicit "blockhash" argument)
  hex: string; // The serialized, hex-encoded data for 'txid'
  txid: string; // The transaction id (same as provided)
  hash: string; // The transaction hash (differs from txid for witness transactions)
  size: number; // The serialized transaction size
  vsize: number; // The virtual transaction size (differs from size for witness transactions)
  weight: number; // The transaction's weight (between vsize*4-3 and vsize*4)
  version: number; // The version
  locktime: number; // The lock time
  vin: {
    txid: string; // The transaction id
    vout: number;
    scriptSig: {
      // The script
      asm: string; // asm
      hex: string; // hex
    };
    sequence: number; // The script sequence number
    txinwitness: string[]; // hex-encoded witness data (if any)
  }[];
  vout: {
    value: number; // The value in BTC
    n: number; // index
    scriptPubKey: {
      asm: string; // the asm
      hex: string; // the hex
      reqSigs?: number; // The required sigs
      type: string; // The type, eg 'pubkeyhash'
      addresses?: string[]; // bitcoin addresses
    };
  }[];
  blockhash: string; // the block hash
  confirmations: number; // The confirmations
  blocktime: number; // The block time expressed in UNIX epoch time
  time: number; // Same as "blocktime"
};

export type RawTransactionRpcResponse = CreateRpcResponse<
  RawTransactionRpcRequest["method"],
  RawTransaction
>;

export type RpcResponse = {
  requestId: string;
} & (
  | NetworkInfoRpcResponse
  | BlockchainInfoRpcResponse
  | BlockRpcResponse
  | UptimeRpcResponse
  | PeerInfoRpcResponse
  | MempoolInfoRpcResponse
  | RpcInfoRpcResponse
  | ChainTipsRpcResponse
  | BlockHeaderRpcResponse
  | BlockHashRpcResponse
  | RawTransactionRpcResponse
);

export type RawRpcResponse = { result: any; error: RpcError | null };
