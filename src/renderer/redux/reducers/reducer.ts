import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import { Block, RawTransaction } from "_t/RpcResponses";
import { StateConfig, NullableKeys } from "_t/typeHelpers";
import { merge } from "lodash";
import { reduceSetBitcoinCoreConnectionIssue } from "./reduceSetBitcoinCoreConnectionIssue";

export type State = StateConfig<{
  bestBlock: Block;
  selectedExplorerBlock: Block;
  explorerBlockList: Block[];
  selectedExplorerTransaction: RawTransaction;
  selectedExplorerTransactionInputValues: RawTransaction["vout"][number]["value"][];
  newRpcConfigurationsSaved: boolean;
  hasBitcoinCoreConnectionIssue: boolean;
}> & {
  mainProcessData: NullableKeys<{
    serverUrl: string;
    cookieFile: string;
    username: string;
    password: string;
  }>;
};

export const initialState: State = {
  bestBlock: null,
  selectedExplorerBlock: null,
  explorerBlockList: null,
  selectedExplorerTransaction: null,
  selectedExplorerTransactionInputValues: null,
  newRpcConfigurationsSaved: null,
  hasBitcoinCoreConnectionIssue: null,
  mainProcessData: {
    serverUrl: null,
    cookieFile: null,
    username: null,
    password: null,
  },
};

export const reducer = createReducer(initialState)
  .handleAction(actions.setExplorerBlockList, (state, action) => {
    return {
      ...state,
      explorerBlockList: action.payload,
    };
  })
  .handleAction(actions.setSelectedExplorerBlock, (state, action) => {
    return {
      ...state,
      selectedExplorerBlock: action.payload,
    };
  })
  .handleAction(actions.setSelectedExplorerTransaction, (state, action) => {
    return {
      ...state,
      selectedExplorerTransaction: action.payload,
    };
  })
  .handleAction(
    actions.setSelectedExplorerTransactionInputValues,
    (state, action) => {
      return {
        ...state,
        selectedExplorerTransactionInputValues: action.payload,
      };
    },
  )
  .handleAction(actions.setMainProcessDataInReduxStore, (state, action) => {
    return {
      ...state,
      mainProcessData: merge(state.mainProcessData, action.payload),
    };
  });
