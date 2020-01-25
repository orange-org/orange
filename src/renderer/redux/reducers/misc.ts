import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import { Block } from "_t/bitcoindRpcResponses";
import { StateConfig } from "_t/typeHelpers";

export type MiscState = StateConfig<{
  bestBlock: Block;
}>;

export const initialState: MiscState = {
  bestBlock: null,
};

export const misc = {
  bestBlock: createReducer(initialState.bestBlock).handleAction(
    actions.setBestBlock,
    (_state, action) => action.payload,
  ),
};
