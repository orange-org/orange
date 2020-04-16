import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import { Block, RawTransaction } from "_t/bitcoindRpcResponses";
import { StateConfig } from "_t/typeHelpers";

export type State = StateConfig<{
  bestBlock: Block;
  selectedExplorerBlock: Block;
  explorerBlockList: Block[];
  selectedExplorerTransaction: RawTransaction;
  selectedExplorerTransactionInputValues: RawTransaction["vout"][number]["value"][];
  isBitcoinCoreCookieAvailable: boolean;
}>;

export const initialState: State = {
  bestBlock: null,
  selectedExplorerBlock: null,
  explorerBlockList: null,
  selectedExplorerTransaction: null,
  selectedExplorerTransactionInputValues: null,
  isBitcoinCoreCookieAvailable: null,
};

export const reducer = createReducer(initialState)
  .handleAction(actions.setExplorerBlockList, (state, action) => ({
    ...state,
    explorerBlockList: action.payload,
  }))
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
  .handleAction(actions.setCouldNotFindBitcoinCoreCookie, (state, action) => {
    return {
      ...state,
      couldNotFindBitcoinCoreCookie: action.payload,
    };
  });
