import { createAction } from "typesafe-actions";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  RpcInfo,
  Uptime,
  RawTransaction,
  RpcError,
} from "_t/RpcResponses";
import { DeepPartial } from "redux";
import { State } from "./reducers/reducer";

export const setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

export const setBlockchainInfo = createAction("SET_BLOCKCHAIN_INFO")<
  BlockchainInfo
>();

export const setBlock = createAction("SET_BLOCK")<Block>();

export const setBestBlock = createAction("SET_BEST_BLOCK")<Block>();

export const setUptime = createAction("SET_UPTIME")<Uptime>();

export const setPeerInfo = createAction("SET_PEER_INFO")<PeerInfo>();

export const setMempoolInfo = createAction("SET_MEMPOOL_INFO")<MempoolInfo>();

export const setRpcInfo = createAction("SET_RPC_INFO")<RpcInfo>();

export const setSelectedExplorerBlock = createAction(
  "SET_SELECTED_EXPLORER_BLOCK",
)<Block>();

export const setExplorerBlockList = createAction("SET_EXPLORER_BLOCK_LIST")<
  Block[]
>();

export const setSelectedExplorerTransaction = createAction(
  "SET_SELECTED_EXPLORER_TRANSACTION",
)<RawTransaction>();

export const setSelectedExplorerTransactionInputValues = createAction(
  "SET_SELECTED_EXPLORER_TRANSACTION_INPUT_VALUES",
)<RawTransaction["vout"][number]["value"][]>();

export const setMainProcessDataInReduxStore = createAction(
  "SET_MAIN_PROCESS_DATA_IN_REDUX_STORE",
)<DeepPartial<State["mainProcessData"]>>();

export const setHasBitcoinCoreConnectionIssue = createAction(
  "SET_HAS_BITCOIN_CORE_CONNECTION_ISSUE",
)<boolean>();
