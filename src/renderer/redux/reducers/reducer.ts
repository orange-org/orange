import { merge } from "lodash";
import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import { Block, RawTransaction } from "_t/RpcResponses";
import { NullableProperties, StateConfig } from "_t/typeHelpers";

export type State = StateConfig<{
  bestBlock: Block;
  selectedExplorerBlock: Block;
  explorerBlockList: Block[];
  selectedExplorerTransaction: RawTransaction;
  selectedExplorerTransactionInputValues: RawTransaction["vout"][number]["value"][];
  newRpcConfigurationsSaved: boolean;
  hasRpcIssue: boolean;
}> & {
  mainProcessData: NullableProperties<{
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
  hasRpcIssue: null,
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
  .handleAction(actions.setHasRpcIssue, (state, action) => {
    return {
      ...state,
      hasRpcIssue: action.payload,
    };
  });
