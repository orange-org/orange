import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";

export type SynchronizingBlockHeadersProgressState = number | undefined;

export const synchronizingBlockHeadersProgress = createReducer<
  SynchronizingBlockHeadersProgressState
>(undefined).handleAction(actions.setBlockchainInfo, (state, action) => {
  return !state || !action.payload.headers
    ? undefined
    : state + action.payload.headers;
});
