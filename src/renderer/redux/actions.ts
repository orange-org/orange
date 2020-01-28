import { createAction } from "typesafe-actions";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  RpcInfo,
  Uptime,
} from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { IsSyncingHeadersState } from "./reducers/isSyncingHeaders";

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

export const receiveHeaderSyncParameters = createAction(
  "RECEIVE_HEADER_SYNC_PARAMETERS",
)<{
  headerCount: BlockchainInfo["headers"] | Null;
  blockCount: BlockchainInfo["blocks"] | Null;
  isInitialBlockDownload: BlockchainInfo["initialblockdownload"] | Null;
  previousState: {
    headerCount: BlockchainInfo["headers"] | Null;
    blockCount: BlockchainInfo["blocks"] | Null;
    isSyncingHeaders: IsSyncingHeadersState;
  };
}>();
