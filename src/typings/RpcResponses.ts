/* eslint-disable camelcase */
import { Constants } from "_c/constants";
import {
  BlockchainInfoRpcRequest,
  BlockHashRpcRequest,
  BlockHeaderRpcRequest,
  BlockRpcRequest,
  ChainTipsRpcRequest,
  MempoolInfoRpcRequest,
  NetworkInfoRpcRequest,
  PeerInfoRpcRequest,
  RawTransactionRpcRequest,
  RpcInfoRpcRequest,
  UptimeRpcRequest,
  ListWalletsRpcRequest,
  ListTransactionsRpcRequest,
  ListWalletDirRpcRequest,
  WalletPassPhraseRpcRequest,
  WalletLockRpcRequest,
  GetNewAddressRpcRequest,
  LoadWalletRpcRequest,
  GetBalanceRpcRequest,
} from "_t/RpcRequests";
import { ObjectValues } from "./typeHelpers";

export type RpcError = {
  code: ObjectValues<
    typeof Constants.nodeError & typeof Constants.coreRpcError
  >;
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
  chain: "main" | "test" | "regtest";
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
  in_active_chain?: boolean; // Whether specified block is in the active chain or not (only present with explicit "blockhash" argument)
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

export type WalletList = string[];

export type ListWalletsRpcResponse = CreateRpcResponse<
  ListWalletsRpcRequest["method"],
  WalletList
>;

export type WalletTransaction = {
  // (string) The bitcoin address of the transaction.
  address: string;

  // (string) The transaction category.
  category:
    | "send" // Transactions sent.
    | "receive" // Non-coinbase transactions received.
    | "generate" // Coinbase transactions received with more than 100 confirmations.
    | "immature" // Coinbase transactions received with 100 or fewer confirmations.
    | "orphan"; // Orphaned coinbase transactions received.

  // (numeric) The amount in BTC. This is negative for the 'send' category, and is positive
  // for all other categories
  amount: number;

  // (string) A comment for the address/transaction, if any
  label: string;

  // (numeric) the vout value
  vout: number;

  // (numeric) The amount of the fee in BTC. This is negative and only available for the
  // 'send' category of transactions.
  fee: number;

  // (numeric) The number of confirmations for the transaction. Negative confirmations indicate the
  // transaction conflicts with the block chain
  confirmations: number;

  // (bool) Whether we consider the outputs of this unconfirmed transaction safe to spend.
  trusted: boolean;

  // (string) The block hash containing the transaction.
  blockhash: string;

  // (numeric) The index of the transaction in the block that includes it.
  blockindex: number;

  // (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
  blocktime: number;

  // (string) The transaction id.
  txid: string;

  // (numeric) The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
  time: number;

  // (numeric) The time received in seconds since epoch (midnight Jan 1 1970 GMT).
  timereceived: number;

  // (string) If a comment is associated with the transaction.
  comment: string;

  // (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
  // may be unknown for unconfirmed transactions not in the mempool
  "bip125-replaceable": "yes" | "no" | "unknown";

  // (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
  // 'send' category of transactions.
  abandoned: boolean;
};

export type WalletTransactionList = WalletTransaction[];

export type WalletTransactionListRpcResponse = CreateRpcResponse<
  ListTransactionsRpcRequest["method"],
  WalletTransactionList
>;

export type ListWalletDir = { wallets: { name: string }[] };

export type ListWalletDirRpcResponse = CreateRpcResponse<
  ListWalletDirRpcRequest["method"],
  ListWalletDir
>;

export type WalletPassPhraseRpcResponse = CreateRpcResponse<
  WalletPassPhraseRpcRequest["method"],
  ""
>;

export type WalletLockRpcResponse = CreateRpcResponse<
  WalletLockRpcRequest["method"],
  ""
>;

export type GetNewAddressRpcResponse = CreateRpcResponse<
  GetNewAddressRpcRequest["method"],
  string
>;

export type LoadWalletRpcResponse = CreateRpcResponse<
  LoadWalletRpcRequest["method"],
  ""
>;

export type GetBalanceRpcResponse = CreateRpcResponse<
  GetBalanceRpcRequest["method"],
  number
>;

export type RpcResponse =
  | NetworkInfoRpcResponse
  | GetBalanceRpcResponse
  | GetNewAddressRpcResponse
  | WalletLockRpcResponse
  | LoadWalletRpcResponse
  | WalletPassPhraseRpcResponse
  | BlockchainInfoRpcResponse
  | BlockRpcResponse
  | UptimeRpcResponse
  | PeerInfoRpcResponse
  | MempoolInfoRpcResponse
  | RpcInfoRpcResponse
  | ChainTipsRpcResponse
  | BlockHeaderRpcResponse
  | BlockHashRpcResponse
  | ListWalletsRpcResponse
  | ListWalletDirRpcResponse
  | WalletTransactionListRpcResponse
  | RawTransactionRpcResponse;

export type RawRpcResponse = {
  result: RpcResponse["result"];
  error: RpcError | null;
};
