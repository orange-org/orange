import { createAction } from "typesafe-actions";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  RawTransaction,
  RpcInfo,
  Uptime,
  WalletTransactionList,
  WalletList,
} from "_t/RpcResponses";

export class Actions {
  static setTransactionList = createAction("SET_TRANSACTION_LIST")<
    WalletTransactionList
  >();

  static setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

  static setBlockchainInfo = createAction("SET_BLOCKCHAIN_INFO")<
    BlockchainInfo
  >();

  static setBlock = createAction("SET_BLOCK")<Block>();

  static setBestBlock = createAction("SET_BEST_BLOCK")<Block>();

  static setUptime = createAction("SET_UPTIME")<Uptime>();

  static setPeerInfo = createAction("SET_PEER_INFO")<PeerInfo>();

  static setMempoolInfo = createAction("SET_MEMPOOL_INFO")<MempoolInfo>();

  static setRpcInfo = createAction("SET_RPC_INFO")<RpcInfo>();

  static setSelectedExplorerBlock = createAction("SET_SELECTED_EXPLORER_BLOCK")<
    Block
  >();

  static setExplorerBlockList = createAction("SET_EXPLORER_BLOCK_LIST")<
    Block[]
  >();

  static setSelectedExplorerTransaction = createAction(
    "SET_SELECTED_EXPLORER_TRANSACTION",
  )<RawTransaction>();

  static setSelectedExplorerTransactionInputValues = createAction(
    "SET_SELECTED_EXPLORER_TRANSACTION_INPUT_VALUES",
  )<RawTransaction["vout"][number]["value"][]>();

  static requestSearchBoxFocus = createAction("REQUEST_SEARCH_BOX_FOCUS")<
    boolean
  >();

  static setWalletList = createAction("SET_LOADED_WALLET_LIST")<WalletList>();
}
