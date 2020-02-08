import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import { Block } from "_t/bitcoindRpcResponses";
import { StateConfig } from "_t/typeHelpers";

export type MiscState = StateConfig<{
  bestBlock: Block;
  selectedExplorerBlock: Block;
  explorerBlockList: Block[];
}>;

export const initialState: MiscState = {
  bestBlock: null,
  selectedExplorerBlock: null,
  explorerBlockList: null,
};

export const misc = createReducer(initialState)
  .handleAction(actions.setExplorerBlockList, (state, action) => ({
    ...state,
    explorerBlockList: action.payload,
  }))
  .handleAction(actions.setSelectedExplorerBlock, (state, action) => {
    return {
      ...state,
      selectedExplorerBlock: action.payload,
    };
  });
