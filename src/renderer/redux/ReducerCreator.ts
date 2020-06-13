import { createReducer } from "typesafe-actions";
import { Actions } from "_r/redux/Actions";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  RawTransaction,
  PeerInfo,
  WalletTransactionList,
  WalletList,
} from "_t/RpcResponses";
import { StateConfig } from "_t/typeHelpers";

export type State = StateConfig<{
  bestBlock: Block;
  selectedExplorerBlock: Block;
  explorerBlockList: Block[];
  blockchainInfo: BlockchainInfo;
  mempoolInfo: MempoolInfo;
  selectedExplorerTransaction: RawTransaction;
  selectedExplorerTransactionInputValues: RawTransaction["vout"][number]["value"][];
  newRpcConfigurationsSaved: boolean;
  hasRpcIssue: boolean;
  requestSearchBoxFocus: boolean;
  peerInfo: PeerInfo;
  transactionList: WalletTransactionList;
  walletList: WalletList;
}>;

class ReducerCreator {
  private static initialState: State = {
    bestBlock: null,
    selectedExplorerBlock: null,
    blockchainInfo: null,
    mempoolInfo: null,
    explorerBlockList: null,
    selectedExplorerTransaction: null,
    selectedExplorerTransactionInputValues: null,
    newRpcConfigurationsSaved: null,
    requestSearchBoxFocus: null,
    hasRpcIssue: null,
    peerInfo: null,
    transactionList: null,
    walletList: null,
  };

  static create = () =>
    createReducer(ReducerCreator.initialState)
      .handleAction(Actions.setExplorerBlockList, (state, action) => ({
        ...state,
        explorerBlockList: action.payload,
      }))
      .handleAction(Actions.setSelectedExplorerBlock, (state, action) => ({
        ...state,
        selectedExplorerBlock: action.payload,
      }))
      .handleAction(
        Actions.setSelectedExplorerTransaction,
        (state, action) => ({
          ...state,
          selectedExplorerTransaction: action.payload,
        }),
      )
      .handleAction(
        Actions.setSelectedExplorerTransactionInputValues,
        (state, action) => ({
          ...state,
          selectedExplorerTransactionInputValues: action.payload,
        }),
      )
      .handleAction(Actions.setBlockchainInfo, (state, action) => ({
        ...state,
        blockchainInfo: action.payload,
      }))
      .handleAction(Actions.requestSearchBoxFocus, (state, action) => ({
        ...state,
        requestSearchBoxFocus: action.payload,
      }))
      .handleAction(Actions.setMempoolInfo, (state, action) => ({
        ...state,
        mempoolInfo: action.payload,
      }))
      .handleAction(Actions.setTransactionList, (state, action) => ({
        ...state,
        transactionList: action.payload,
      }))
      .handleAction(Actions.setPeerInfo, (state, action) => ({
        ...state,
        peerInfo: action.payload,
      }));
}

export const reducer = ReducerCreator.create();
