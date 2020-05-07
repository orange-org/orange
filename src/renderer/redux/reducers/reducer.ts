import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  RawTransaction,
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
}>;

export const initialState: State = {
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
};

export const reducer = createReducer(initialState)
  .handleAction(actions.setExplorerBlockList, (state, action) => ({
    ...state,
    explorerBlockList: action.payload,
  }))
  .handleAction(actions.setSelectedExplorerBlock, (state, action) => ({
    ...state,
    selectedExplorerBlock: action.payload,
  }))
  .handleAction(actions.setSelectedExplorerTransaction, (state, action) => ({
    ...state,
    selectedExplorerTransaction: action.payload,
  }))
  .handleAction(
    actions.setSelectedExplorerTransactionInputValues,
    (state, action) => ({
      ...state,
      selectedExplorerTransactionInputValues: action.payload,
    }),
  )
  .handleAction(actions.setBlockchainInfo, (state, action) => ({
    ...state,
    blockchainInfo: action.payload,
  }))
  .handleAction(actions.requestSearchBoxFocus, (state, action) => ({
    ...state,
    requestSearchBoxFocus: action.payload,
  }))
  .handleAction(actions.setMempoolInfo, (state, action) => ({
    ...state,
    mempoolInfo: action.payload,
  }))
  .handleAction(actions.setHasRpcIssue, (state, action) => ({
    ...state,
    hasRpcIssue: action.payload,
  }));
